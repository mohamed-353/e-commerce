import React, { useEffect } from "react";
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

  const fetchUserDetails = async () => {
    await axios
      .get(summaryApi.userDetails.url, {
        withCredentials: true
      })
      .then(async (response) => {
        const responseData = await response.data

        if (responseData.success) {
          dispatch(setUserDetails(await responseData.data))
        }

        console.log("1 user Details", await responseData);
      })
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails }}>

      <ToastContainer />

      <Header />
      <main className="min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />

    </Context.Provider>
  );
}

export default App;
