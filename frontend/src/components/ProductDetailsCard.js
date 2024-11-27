import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProductsCategory } from '../helpers/fetchAllProducts'
import displayAEDCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const ProductDetailsCard = ({ category, heading }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(5).fill(false)

  const { fetchAddToCartCount } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, 1);
    fetchAddToCartCount();
  }

  useEffect(() => {
    setLoading(true)
    fetchAllProductsCategory(category).then((response) => {
      setProducts(response.data)
    }).finally(() => {
      setLoading(false)
    })
  }, [category])

  return (
    <div className='container mx-auto py-8 relative'>

      <h1 className='text-2xl font-semibold py-4'>{heading}</h1>

      <div className='relative'>
        <div className='flex flex-wrap justify-between'>
          {loading ? (
            loadingList.map((_, index) => (
              <div key={index} className='flex w-full h-44 min-w-96 max-w-96 rounded-lg bg-white shadow-md overflow-hidden animate-pulse'>
                <div className='bg-slate-200 h-full w-44 flex justify-center items-center'>
                  <div className='w-32 h-32 bg-slate-300 rounded'></div>
                </div>

                <div className='p-4 flex flex-col justify-between flex-grow'>
                  <div>
                    <div className='h-6 w-3/4 bg-slate-300 mb-2 rounded'></div>
                    <div className='h-4 w-1/2 bg-slate-300 rounded'></div>
                  </div>

                  <div>
                    <div className='flex gap-3 mb-2'>
                      <div className='h-5 w-20 bg-slate-300 rounded'></div>
                      <div className='h-5 w-16 bg-slate-300 rounded'></div>
                    </div>
                  </div>

                  <div className='h-8 w-28 bg-slate-300 rounded-full'></div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <Link
                key={product?._id}
                to={`/product/${product?._id}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className='min-w-[470px] max-w-[470px] h-[400px] rounded-lg bg-white shadow-md mt-5'
              >
                <div className='h-3/5 bg-slate-200 p-3 overflow-hidden cursor-pointer flex justify-center items-center'>
                  <img src={product?.productImage[0]} alt={product?.productName} className='h-full w-full object-scale-down hover:scale-110 transition-all duration-300 mix-blend-multiply' />
                </div>

                <div className='h-1/4 p-4 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold truncate'>{product?.productName}</h3>
                    <p className='text-sm text-slate-500 capitalize truncate'>{product?.category}</p>
                  </div>
                  <div>
                    <div className='flex gap-3 items-center mt-3'>
                      <p className='text-lg font-medium text-red-600'>{displayAEDCurrency(product?.sellingPrice)}</p>
                      <p className='text-sm text-slate-500 line-through'>{displayAEDCurrency(product?.price)}</p>
                    </div>
                    <button
                      className='bg-cyan-600 w-full hover:bg-cyan-700 mt-1 flex items-center justify-center transition-all duration-300 text-white px-4 py-2 rounded-full'
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>


      </div>
    </div>
  )
}

export default ProductDetailsCard
