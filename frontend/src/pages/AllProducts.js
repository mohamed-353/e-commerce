import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const fetchAllProducts = async () => {
    const response = await axios.get(summaryApi.allProducts.url, {
      withCredentials: true
    });
    const responseData = response.data;

    if (responseData.success) {
      setAllProducts(responseData.data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <div className='flex justify-between items-center bg-white py-3 px-5'>
        <h1 className='font-bold text-lg'>
          All Products
        </h1>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className='p-1 px-2 text-cyan-700 hover:bg-cyan-500 hover:text-white rounded-full border-2 border-cyan-700'
        >
          Upload Products
        </button>
      </div>

      {/* All Products */}
      <div className='flex items-start flex-wrap gap-5 py-4 px-1 h-[calc(100vh-195px)] overflow-y-scroll'>
        {allProducts.map((product) => (
          <div key={product._id} className='flex'>
            <AdminProductCard product={product} fetchAllProducts={fetchAllProducts} />
          </div>
        ))}
      </div>

      {/* Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchAllProducts={fetchAllProducts} />
      )}
    </>
  );
}

export default AllProducts;
