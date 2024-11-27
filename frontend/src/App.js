import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Context from "./context/index";
import summaryApi from "./common/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    await axios
      .get(summaryApi.userDetails.url, {
        withCredentials: true
      })
      .then((response) => {
        const responseData = response.data

        if (responseData.success) {
          dispatch(setUserDetails(responseData.data))
        }
      })
  };

  const fetchAddToCartCount = async () => {
    await axios
      .get(summaryApi.addToCartCount.url, {
        withCredentials: true
      })
      .then((response) => {
        const responseData = response.data

        if (responseData.success) {
          setCartProductCount(responseData.data.count)
        }
      })
  };

  useEffect(() => {
    fetchUserDetails();
    fetchAddToCartCount();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails, fetchAddToCartCount, cartProductCount }}>

      <ToastContainer position="top-left" limit={3} closeOnClick />

      <Header />
      <main className="min-h-[calc(100vh-130px)] pt-20">
        <Outlet />
      </main>
      <Footer />

    </Context.Provider>
  );
}

export default App;
