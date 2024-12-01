import React from 'react';

const Footer = () => {
  return (
    <footer className="container mx-auto ">
      <div className="text-center bg-slate-200 text-black font-bold py-8">
        <p>
          © 2024 Mohamed E-commerce.
        </p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li className="hover:underline cursor-pointer">Privacy Policy</li>
          <li className="hover:underline cursor-pointer">Terms of Service</li>
          <li className="hover:underline cursor-pointer">Contact Us</li>
        </ul>
      </div >
    </footer >
  );
};

export default Footer;
