import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import displayAEDCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([])
  const [productsCount, setProductsCount] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(12).fill(false)
  const searchParams = new URLSearchParams(query.search);
  const navigate = useNavigate()

  console.log("query", query.search);

  const fetchProducts = async () => {
    await axios.get(`${summaryApi.searchProduct.url}${query.search}`, {
      params: { page },
      withCredentials: true,
    }).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        setData(responseData?.data.product)
        setProductsCount(responseData?.data.count)
        return responseData?.data;
      } else {
        toast.error(responseData?.message);
        return;
      };
    });
    setLoading(false)
    console.log(data);
  };

  const { fetchAddToCartCount } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, 1);
    fetchAddToCartCount();
  }

  useEffect(() => {
    fetchProducts()
  }, [query.search, page]);

  const handelChangePage = (pageNumber) => {
    setPage(pageNumber);
    searchParams.set('p', pageNumber);
    navigate(`/search?${searchParams.toString()}`);
    console.log(searchParams);
  };

  return (
    <div className='container mx-auto py-8 relative'>

      <h1 className='text-2xl font-semibold py-4'>Results: {productsCount}</h1>

      {data.length === 0 && !loading && (
        <div className='bg-slate-200 gap-5 text-2xl w-[1000px] h-[100px] flex justify-center items-center rounded-full'>
          <p>No Data Found</p>
        </div>
      )}

      <div className='flex flex-wrap justify-between gap-2'>
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
          data.map((product, index) => {
            return (
              <Link
                key={product?._id}
                to={`/product/${product?._id}`}
                className='min-w-[470px] max-w-[470px] h-[400px] rounded-xl bg-white shadow-md mt-5'
              >
                <div className='h-3/5 bg-slate-200 p-3 overflow-hidden cursor-pointer flex justify-center items-center rounded-xl shadow-xl'>
                  <img src={product?.productImage[0]} alt={product?.productName} className='h-full w-full object-scale-down hover:scale-110 transition-all duration-300 mix-blend-multiply' />
                </div>

                <div className='h-1/4 p-4 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-lg font-semibold truncate'>{product?.productName}</h3>
                    <p className='text-sm text-slate-500 capitalize truncate'>{product?.category}</p>
                  </div>
                  <div>
                    <div className='flex gap-3 items-center mt-2'>
                      <p className='text-lg font-medium text-red-600'>{displayAEDCurrency(product?.sellingPrice)}</p>
                      <p className='text-lg text-slate-500 line-through'>{displayAEDCurrency(product?.price)}</p>
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
            )
          })
        )}
      </div>

      <div className='flex justify-start mt-8 select-none'>
        <ul className="flex justify-center items-center gap-2">
          <li className="p-3 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300" onClick={() => handelChangePage(Math.max(page - 1, 1))}>
            Previous
          </li>
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className="p-3 px-4 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300"
              onClick={() => handelChangePage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
          <li className="p-3 bg-slate-200 rounded-full cursor-pointer hover:bg-slate-300" onClick={() => handelChangePage(page + 1)}>
            Next
          </li>
        </ul>
      </div>

    </div >
  )
}

export default SearchProduct