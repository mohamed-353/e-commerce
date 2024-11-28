import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import displayAEDCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import Context from '../context'

const Cart = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const context = useContext(Context)

  const fetchCartProducts = async () => {
    setLoading(true);
    await axios.get(summaryApi.cartProducts.url,
      { withCredentials: true },
    ).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        console.log(responseData?.data);
        setProducts(responseData?.data);
        return responseData?.data;
      } else {
        toast.error(responseData?.message);
        return;
      };
    });
    setLoading(false);
  };

  const fetchGetQuantity = async () => {
    await axios.get(summaryApi.getQuantity.url,
      { withCredentials: true },
    ).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        console.log(responseData?.data);
        setQuantity(responseData?.data);
        setLoading(false);
        return responseData?.data;
      } else {
        toast.error(responseData?.message);
        return;
      };
    });
  };

  const fetchChangeQuantity = async () => {
    await axios.post(summaryApi.changeQuantity.url,
      { quantity },
      { withCredentials: true },
    ).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        console.log(responseData?.data);
        return responseData?.data;
      } else {
        toast.error(responseData?.message);
        return;
      };
    });
  };

  const handleCountQuantity = () => {
    const totalQuantity = quantity.reduce((a, b) => a + (b || 0), 0);
    setTotalQuantity(totalQuantity);
  }

  const handleCountPrice = () => {
    handleCountQuantity()
    const price = products.map((ele, index) => ele?.sellingPrice * quantity[index]);
    const totalPrice = price.reduce((a, b) => a + (b || 0), 0);
    setTotalPrice(totalPrice);
  }

  const handleChangeQuantity = (qty, index) => {
    if (qty === "+") {
      quantity[index] += 1
    } else if (qty === "-" && quantity[index] > 1) {
      quantity[index] -= 1
    }
    handleCountQuantity()
    handleCountPrice()
    fetchChangeQuantity()
  }

  const handelDeleteProduct = async (productId) => {
    await axios.delete(summaryApi.deleteCartProduct.url,
      {
        data: { productId },
        withCredentials: true
      }
    ).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        setRefresh(prev => !prev);
        return responseData;
      } else {
        toast.error(responseData?.message);
        return;
      };
    });
    
    handleCountQuantity();
    handleCountPrice()

    await context.fetchAddToCartCount()
  };

  useEffect(() => {
    fetchCartProducts();
    fetchGetQuantity();
    handleCountPrice()
  }, []);

  useEffect(() => {
    fetchCartProducts();
    fetchGetQuantity();
    handleCountQuantity();
    handleCountPrice()
  }, [refresh]);

  useEffect(() => {
    handleCountQuantity();
    handleCountPrice()
  }, [quantity]);

  return (
    <div className='container mx-auto m-9'>
      {products.length === 0 && !loading && (
        <div className='bg-slate-200 gap-5 text-2xl w-[1000px] h-[100px] flex justify-center items-center rounded-full'>
          <p>No Items</p>
          <Link to={"/"} className='rounded-full text-white w-36 h-16 bg-cyan-500 hover:bg-cyan-600 flex justify-center items-center'>Shop Now</Link>
        </div>
      )}
      {loading ? (
        <div className='bg-slate-300 gap-5 text-2xl w-[1000px] h-[100px] flex justify-center items-center animate-pulse rounded-full'>
          <p>Loading...</p>
        </div>
      ) : (
        < div className='flex justify-between relative'>
          <div>
            {
              products.map((product, index) => {
                return (
                  <div key={product?._id} className='flex mt-4 border-2 bg-white shadow-lg'>

                    <Link to={`/product/${product._id}`} className='w-44 h-40 p-2 bg-slate-200 cursor-pointer overflow-hidden'>
                      <img
                        src={product?.productImage[0]}
                        alt={product?._id}
                        className='w-full h-full object-scale-down hover:scale-110 transition-translate-all duration-150 mix-blend-multiply'
                      />
                    </Link>

                    <div className='bg-white w-[800px] h-40'>
                      <div className='m-4'>

                        <div>
                          <h1 className='text-2xl'>{product?.productName}</h1>
                          <p className='text-gray-500 text-lg'>{product?.category}</p>
                          <p className='text-xl text-red-600'>{displayAEDCurrency(product?.sellingPrice)}</p>
                        </div>

                        <div className='flex gap-2 text-2xl mt-2'>
                          <button className='w-8 h-8 text-cyan-600 border-cyan-500 border hover:bg-cyan-500 hover:text-white rounded flex justify-center items-center'
                            onClick={() => handleChangeQuantity("-", index)}
                          >
                            -
                          </button>
                          <div>
                            <p>{quantity[index]}</p>
                          </div>
                          <button
                            className='w-8 h-8 text-cyan-600 border-cyan-500 border hover:bg-cyan-500 hover:text-white rounded flex justify-center items-center'
                            onClick={() => handleChangeQuantity("+", index)}
                          >
                            +
                          </button>
                        </div>

                      </div>
                    </div>

                    <div className='relative'>

                      <div
                        onClick={() => handelDeleteProduct(product?._id)}
                        className='mr-4 mt-4 w-9 h-9 text-xl rounded-full flex justify-center items-center bg-red-200 cursor-pointer hover:bg-red-500 hover:text-white'
                      >
                        <FaTrash />
                      </div>

                      <div className='text-2xl absolute right-5 bottom-10  '>
                        <h1>{displayAEDCurrency(quantity[index] * product.sellingPrice)}</h1>
                      </div>

                    </div>

                  </div>
                )
              })
            }
          </div>

          <div className='bg-white w-[440px] h-56 fixed left-[1160px] shadow-lg'>

            <div className='h-16 bg-cyan-500 text-xl text-white rounded-lg shadow-lg'>
              <h1 className='p-5'>ORDER SUMMARY</h1>
            </div>

            <div className='m-2 ml-3 mr-5 text-xl'>
              <p className='flex gap-2'>Total Items : <span>{totalQuantity}</span></p>
              <p className='flex gap-2'>Total Price : <span className='text-red-500'>{displayAEDCurrency(totalPrice)}</span></p>
            </div>

            <div className='flex justify-center items-center text-xl mt-5'>
              <Link
                to={"/"}
                className='w-29 h-16 p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full flex justify-center items-center'
                onClick={() => toast.success("payment successfully")}
              >
                CONFIRM ORDER
              </Link>
            </div>

          </div>

        </div>
      )}
    </div >
  )
}

export default Cart