import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import summaryApi from "../common/index";
import Context from "../context/index";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchAddToCartCount } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);

    await axios
      .post(summaryApi.signIn.url, data, {
        withCredentials: true,
      })
      .then((response) => {
        const responseData = response.data;

        if (responseData.success) {
          toast.success("from login", responseData)
          navigate("/");
          fetchUserDetails();
          fetchAddToCartCount();
        } else {
          toast.error(responseData.message);
        }
        setDisable(false);
      });
  };

  return (
    <>
      <section id="login">
        <div className="mx-auto container p-6">
          <div className="bg-white p-4 py-6 w-full max-w-md mx-auto">

            {/* <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full">
              <img src={loginIcon} alt="login icon" className="w-full h-full object-cover" />
            </div> */}

            <form className="pt-8 flex flex-col gap-4" onSubmit={handleSubmit}>

              <div className="grid">
                <label className="text-xl font-bold">Email :</label>
                <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    className="w-full h-9 px-4 outline-none bg-transparent text-lg placeholder:text-lg"
                  />
                </div>
              </div>

              <div className="grid">
                <label className="text-xl font-bold">Password :</label>
                <div className="bg-slate-100 p-2 flex items-center border rounded-lg">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full h-9 px-4 outline-none bg-transparent text-lg placeholder:text-lg"
                  />
                  <div className="cursor-pointer text-2xl ml-2" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <Link to={"/forgot-password"} className="ml-auto pt-3 pr-4 cursor-pointer text-lg hover:underline hover:text-red-500">
                  Forgot password?
                </Link>
              </div>

              <button
                disabled={disable}
                className="bg-cyan-600 text-white px-8 py-3 mt-6 w-full max-w-xs mx-auto flex justify-center rounded-full hover:scale-105 hover:bg-cyan-700 transition-all text-lg">
                Login
              </button>

            </form>

            <p className="p-6 text-lg">
              Don't have an account?
              <Link to={"/sign-up"} className="text-red-600 cursor-pointer hover:underline ml-1"> Sign up</Link>
            </p>

          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
