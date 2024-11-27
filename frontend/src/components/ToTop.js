import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`fixed bottom-10 ${isVisible ? 'right-10' : '-right-12'} z-10 transition-all duration-300`}>
      <button
        onClick={scrollToTop}
        className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 text-lg text-white flex items-center justify-center w-12 h-12 rounded-full"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ToTop;
