import React, { useState, useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

import img1 from '../assets/banner/img1.webp'
import img2 from '../assets/banner/img2.webp'
import img3 from '../assets/banner/img3.jpg'
import img4 from '../assets/banner/img4.jpg'
import img5 from '../assets/banner/img5.webp'

import image1Mobile from '../assets/banner/img1_mobile.jpg'
import image2Mobile from '../assets/banner/img2_mobile.webp'
import image3Mobile from '../assets/banner/img3_mobile.jpg'
import image4Mobile from '../assets/banner/img4_mobile.jpg'
import image5Mobile from '../assets/banner/img5_mobile.png'

const images = [img1, img2, img3, img4, img5]
const imagesMobile = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile]

const BannerProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleOpenProduct = async () => {

    const productIds = [
      "670e894f3badcd3a9b0fa6b1",
      "6718b01381e3ca49e756bf72",
      "670957e06012371abf8bcf68",
      "670955e46012371abf8bcf58",
      "6717a7dfd163a5a8ee211f37"
    ];
    navigate(`/product/${productIds[currentIndex]}`);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-96 w-full bg-salt-200 overflow-hidden ">
        <div className='w-full h-full relative'>
          <span className='absolute md:left-[60px] md:w-[92%] md:h-[89%] left-[50px] w-[73%] h-[90%] cursor-pointer z-50' onClick={() => handleOpenProduct()}></span>
          {/* Image Slider */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((desktopImage, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <picture>
                  <source media="(max-width: 768px)" srcSet={imagesMobile[index]} />
                  <img src={desktopImage} alt={`banner-${index + 1}`} className="w-full h-full cursor-pointer" />
                </picture>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute -right-4 -left-4 inset-0 flex items-center justify-between px-4 text-2xl h-full">

            <div
              onClick={handlePrev}
              className='cursor-pointer w-[60px] h-full group'
              aria-label="Previous image"
            >
              <button
                className="bg-white bg-opacity-50 ml-2 mt-[170px] group-hover:bg-opacity-75 rounded-full p-2"
              >
                <FaAngleLeft />
              </button>
            </div>

            <div
              onClick={handleNext}
              className='cursor-pointer w-[60px] h-full group'
              aria-label="Next image"
            >
              <button
                className="bg-white bg-opacity-50 ml-2 mt-[170px] group-hover:bg-opacity-75 rounded-full p-2"
              >
                <FaAngleRight />
              </button>
            </div>

          </div>

          {/* Dots for Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BannerProduct
