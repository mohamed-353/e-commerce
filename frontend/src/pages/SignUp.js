import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginIcon from "../assets/signIn.gif";
import summaryApi from "../common/index";
import uploadImage from "../helpers/uploadImage";
import imageCompression from "browser-image-compression";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return
    }

    const fileSizeLimit = 6 * 1024 * 1024;
    if (file.size > fileSizeLimit) {
      toast.error("Image size exceeds 6MB, please upload a smaller image");
      return;
    }

    let uploadToastId;
    try {
      const options = {
        maxSizeMB: 6,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      uploadToastId = toast.loading("Uploading image...");
      const uploadImageCloudinary = await uploadImage(compressedFile);
      toast.update(uploadToastId, {
        render: "Image uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setData((prev) => ({
        ...prev,
        profilePic: uploadImageCloudinary.url,
      }));

    } catch (error) {
      if (uploadToastId) {
        toast.update(uploadToastId, {
          render: "Image upload failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
      console.error("Image upload failed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    try {
      const response = await axios.post(summaryApi.signUp.url, data, {
        withCredentials: true,
      });
      const responseData = response.data;

      if (responseData.success) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Sign up failed, please try again.");
    } finally {
      setDisable(false);
    }
  };

  useEffect(() => {
    if (data.profilePic) {
      const preloadImage = (url) => {
        const img = new Image();
        img.src = url;
      };
      preloadImage(data.profilePic);
    }
  }, [data.profilePic]);

  return (
    <section id="signUp">
      <div className="mx-auto container p-6">
        <div className="bg-white p-4 py-6 w-full max-w-md mx-auto">
          <div className="relative overflow-hidden rounded-full border border-gray-300 bg-gray-200 w-32 h-32 mx-auto">
            <img
              src={data.profilePic || loginIcon}
              alt="Profile"
              className="absolute inset-0 object-cover w-full h-full"
              loading="lazy"
            />
            <label className="absolute inset-0 inset-y-16 bottom-0 flex items-center justify-center text-md font-bold bg-opacity-80 bg-slate-200 cursor-pointer select-none z-10">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>

          <form className="pt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-lg font-semibold">Name :</label>
              <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-9 px-4 text-lg outline-none bg-transparent placeholder:text-lg"
                />
              </div>
            </div>

            <div className="grid">
              <label className="text-lg font-semibold">Email :</label>
              <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-9 px-4 text-lg outline-none bg-transparent placeholder:text-lg"
                />
              </div>
            </div>

            <div className="grid">
              <label className="text-lg font-semibold">Password :</label>
              <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-9 px-4 text-lg outline-none bg-transparent placeholder:text-lg"
                />
                <div
                  className="cursor-pointer text-2xl ml-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="grid">
              <label className="text-lg font-semibold">Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-9 px-4 text-lg outline-none bg-transparent placeholder:text-lg"
                />
                <div
                  className="cursor-pointer text-2xl ml-2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              disabled={disable}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 mt-6 w-full max-w-xs mx-auto flex justify-center rounded-full hover:scale-105 transition-all text-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="p-6 text-lg">
            Already have an account?
            <Link to={"/login"} className="text-red-600 cursor-pointer hover:underline ml-1"> Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
