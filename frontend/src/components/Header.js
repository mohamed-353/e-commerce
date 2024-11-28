import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/e-commerce-high-resolution-logo-black-transparent.png";
import { toast } from "react-toastify";
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import summaryApi from "../common";
import userRoles from "../common/userRoles";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context)

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [disableMenu, setDisableMenu] = useState(false);

  const navigate = useNavigate()


  const inputRef = useRef(null);

  const handleSearchButtonClick = () => {
    inputRef.current?.focus();
  };

  const handelNotLogin = async () => {
    toast.error("please Login...")
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post(summaryApi.userLogout.url,
        { user },
        { withCredentials: true, }
      );

      if (response.data.success) {
        dispatch(setUserDetails(null));
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error.response || error);
      toast.error("An error occurred during logout.");
    }
  };


  const handelSearch = async (e) => {
    const { value } = e.target;

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  }

  useEffect(() => {
    if (user?.role !== userRoles.ADMIN && user?.role !== userRoles.MANAGER) {
      setDisableMenu(true)
    } else {
      setDisableMenu(false)
    }
  }, [user, context.cartProductCount]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".menu-container")) {
        setMenuDisplay(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);


  return (
    <header className="h-20 shadow-md bg-white fixed w-full z-50">
      <div className="h-full container mx-auto flex items-center px-5 justify-between">
        <div>
          <Link to="/">
            <img src={logo} width={110} height={65} alt="logo" />
          </Link>
        </div>

        <div className="hidden md:flex items-center w-full justify-between max-w-md border rounded-full focus-within:shadow-md pl-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="search product here..."
            className="searchBar placeholder:text-lg w-full outline-none px-4 py-2"
            onChange={handelSearch}
          />
          <button
            onClick={handleSearchButtonClick}
            className="text-2xl min-w-[55px] h-10 bg-cyan-500 flex items-center justify-center rounded-t-full rounded-r-full text-white"
          >
            <GrSearch />
          </button>
        </div>

        <div className="flex items-center gap-7 select-none">
          <div className="relative flex justify-center">

            <div
              onClick={disableMenu ? () => { } : () => setMenuDisplay((prev) => !prev)}
              className={`${!disableMenu && "cursor-pointer"} relative flex justify-center`}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  className="w-16 h-16 rounded-full"
                  alt={user.name}
                />
              ) : (
                <FaRegUserCircle className="w-12 h-12" />
              )}

              {menuDisplay && (
                <div className="absolute bg-white bottom-0 top-16 h-fit p-2 rounded-lg shadow-lg z-10">
                  <nav>
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          </div>

          {user?._id ? (
            <Link to={"/cart"} className="text-3xl relative cursor-pointer">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>
          ) : (
            <button onClick={handelNotLogin} className="text-3xl relative cursor-pointer">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2">
                <p className="text-xs">0</p>
              </div>
            </button>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="text-xl px-3 bg-cyan-500 py-1 rounded-full text-white hover:bg-cyan-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-xl px-3 bg-cyan-500 py-1 rounded-full text-white hover:bg-cyan-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div >
    </header >
  );
}

export default Header;
