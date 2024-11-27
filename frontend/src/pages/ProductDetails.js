import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import summaryApi from "../common/index"
import { toast } from 'react-toastify'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayAEDCurrency from '../helpers/displayCurrency'
import ProductDetailsCard from '../components/ProductDetailsCard'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { useSelector } from 'react-redux'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    uploadedBy: "",
  })

  const { productId } = useParams()
  const user = useSelector(state => state?.user?.user);
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState()
  const [imageZoomOpen, setImageZoomOpen] = useState(false)
  const [imageZoom, setImageZoom] = useState({
    x: 0,
    y: 0,
  })
  const productImageLoading = new Array(4).fill(false)

  const fetchProduct = async () => {
    setLoading(true)
    await axios.post(summaryApi.productDetails.url,
      { productId },
      { withCredentials: true }
    ).then((response) => {
      const responseData = response?.data

      if (responseData?.success) {
        setData(responseData?.data)
        setActiveImage(responseData?.data.productImage[0])
        return responseData.data
      } else {
        toast.error(responseData?.message)
        return;
      }
    })
    setLoading(false)
  }

  const { fetchAddToCartCount } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, 1)
    fetchAddToCartCount()
  }

  const handleImageZoom = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setImageZoom({
      x,
      y,
    });
  }

  useEffect(() => {
    fetchProduct()
  }, [productId, user])

  return (
    <div className='container mx-auto p-4'>
      {
        loading ? (
          <div className='flex w-full min-h-[550px] gap-4 flex-col lg:flex-row ' >

            <div className='h-full'>
              <ul>
                {productImageLoading.map((_, index) => {
                  return (
                    <li key={index} className='animate-pulse w-24 h-20 lg:w-32 lg:h-28 mt-4 bg-slate-200 flex justify-center items-center'>
                      <div className='w-20 h-16 lg:w-28 lg:h-24 bg-slate-300 rounded'></div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='min-w-[350px] max-w-[350px]  h-[350px] lg:min-w-[550px] lg:max-w-[550px] lg:h-[550px] rounded shadow bg-slate-200 flex justify-center items-center animate-pulse'>
              <div className='min-w-[350px] max-w-[250px]  h-[250px] lg:min-w-[450px] lg:max-w-[450px] lg:h-[450px] rounded shadow bg-slate-300 flex justify-center items-center'></div>
            </div>

            <div className='min-w-[450px]'>

              <div className='animate-pulse'>
                <p className='bg-slate-300 w-full h-8 rounded-full flex justify-center items-center'></p>
                <div className='bg-slate-300 w-full h-8 mt-2'></div>
                <p className='bg-slate-300 w-full h-8 mt-2'></p>
              </div>

              <div className='bg-slate-300 w-full h-8 mt-2 animate-pulse'></div>
              <div className='bg-slate-300 h-8 mt-2 animate-pulse flex gap-3'></div>

              <div className='flex justify-center items-center mt-4'>
                <button className='bg-slate-300 animate-pulse flex justify-center items-center w-32 h-10 rounded-md'></button>
                <button className='animate-pulse ml-5 mr-3 w-32 h-10 bg-slate-300 rounded-md'></button>
              </div>

              <div className='animate-pulse'>
                <div className='bg-slate-300 w-full h-8 mt-4'></div>
                <div className='bg-slate-300 w-full h-8 mt-4' ></div>
              </div>

            </div>
          </div>
        ) : (
          <div className='flex w-full min-h-[550px] gap-8 flex-col lg:flex-row ' >

            <div className='h-full'>
              <ul className='flex flex-row lg:flex-col'>
                {data?.productImage.map((image, index) => {
                  return (
                    <li key={index}
                      onMouseEnter={() => { setActiveImage(image) }}
                      className='w-24 h-20 lg:w-32 lg:h-28 mt-4 bg-slate-200 rounded shadow cursor-pointer'>
                      <img src={image} alt={index} className='w-full h-full object-scale-down mix-blend-multiply' />
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className='p-2 relative min-w-[350px] max-w-[350px] h-[350px] lg:min-w-[550px] lg:max-w-[550px] lg:h-[550px] rounded shadow bg-slate-200 flex justify-center items-center'>
              <img src={activeImage} alt={productId}
                onMouseEnter={() => { setImageZoomOpen(true) }}
                onMouseMove={handleImageZoom}
                onMouseLeave={() => setImageZoomOpen(false)}
                className='w-full h-full object-scale-down mix-blend-multiply'
              />

              {imageZoomOpen &&
                <div className='lg:block w-full scale-125 h-full absolute left-[650px] min-w-[550px] min-h-[550px] max-w-[550px] max-h-[550px] top-0 p-1 bg-slate-200 hidden overflow-hidden'>
                  <div
                    className='w-full h-full  p-3 max-w-[550px] max-h-[550px] min-w-[550px] min-h-[550px] object-scale-down mix-blend-multiply'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${imageZoom.x * 125}% ${imageZoom.y * 125}%`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "auto", // Set to auto to maintain the original size while allowing zoom
                    }}
                  ></div>
                </div>
              }
            </div>

            <div>

              <div>
                <p className='bg-red-200 text-red-400 rounded-full flex justify-center items-center w-fit px-1.5 py-1'>
                  {data?.productName.split(" ")[0]}
                </p>

                <h1 className='font-semibold text-4xl mt-2'>
                  {data?.description}
                </h1>

                <p className='text-gray-400 mt-2'>
                  {`${data.category.charAt(0).toUpperCase()}${data.category.slice(1)}`}
                </p>
              </div>

              <div className='text-lg mt-3 flex gap-1'>
                <FaStar className='fill-red-500' />
                <FaStar className='fill-red-500' />
                <FaStar className='fill-red-500' />
                <FaStar className='fill-red-500' />

                <FaStarHalf className='fill-red-500' />
              </div>

              <div className='flex gap-3 mt-1 text-3xl'>

                <div className='text-red-500 font-semibold mt-2'>
                  {displayAEDCurrency(data?.sellingPrice)}
                </div>

                <div className='text-gray-400 font-semibold mt-2 line-through'>
                  {displayAEDCurrency(data?.price)}
                </div>

              </div>

              <div className='flex justify-start items-start mt-4' onClick={(e) => handleAddToCart(e, productId)} >
                {user?._id ? (
                  <Link to={"/cart"} className='flex justify-center items-center w-32 h-10 bg-transparent text-cyan-700 hover:bg-cyan-500 hover:border-none hover:text-white font-semibold text-lg border-2 border-cyan-600 rounded-md'>
                    Buy
                  </Link>
                ) : (
                  <Link to={"/login"} className='flex justify-center items-center w-32 h-10 bg-transparent text-cyan-700 hover:bg-cyan-500 hover:border-none hover:text-white font-semibold text-lg border-2 border-cyan-600 rounded-md'>
                    Buy
                  </Link>
                )}
                <button className='ml-5 mr-3 w-32 h-10 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-md'>
                  Add To Cart
                </button>
              </div>

              <div className='mt-4'>
                <div>Description:</div>
                <div>{data?.description}</div>
              </div>

            </div>
          </div>
        )
      }

      <ProductDetailsCard category={data?.category} heading={"Recommended Product"} />

    </div >

  )
}

export default ProductDetails
