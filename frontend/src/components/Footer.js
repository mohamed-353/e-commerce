import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="h-[150px] text-center bg-slate-200 text-black font-bold py-8 text-lg">
      <p>
        © 2025 Created By Mohamed Tarek
      </p>

      <ul className="flex justify-center space-x-6 mt-4 text-xl">
        {/* <li className="hover:underline cursor-pointer">Privacy Policy</li>
          <li className="hover:underline cursor-pointer">Terms of Service</li> */}
        <li className="underline hover:no-underline cursor-pointer"><Link to={"/contact"}>Contact Us</Link></li>
        <li className="underline hover:no-underline cursor-pointer"><Link to={"/about"}>About Us</Link></li>
      </ul>
    </footer >
  );
};

export default Footer;
