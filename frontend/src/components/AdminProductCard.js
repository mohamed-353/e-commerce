import React, { useState } from 'react';
import AdminEditProduct from '../components/AdminEditProduct';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from "react-icons/fa";
import displayAEDCurrency from '../helpers/displayCurrency';
import DisplayImage from './DisplayImage';
import axios from 'axios';
import summaryApi from '../common';

const AdminProductCard = ({ product, fetchAllProducts }) => {
  const [productId, setProductId] = useState();
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const deleteProduct = async () => {
    try {
      await axios.post(
        summaryApi.deleteProduct.url,
        { productId: product._id },
        { withCredentials: true }
      );
      fetchAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div key={product?._id} className='bg-white p-4 rounded-lg'>
      <div className='w-52'>
        <div className='w-52 h-52 flex justify-center items-center'>
          <img
            src={product?.productImage[0]}
            alt=''
            className='w-56 cursor-pointer mx-auto object-scale-down h-full'
            onClick={() => {
              setOpenFullScreenImage(true)
              setFullScreenImage(product?.productImage[0])
            }}
          />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{product?.productName}</h1>

        <div>
          <p className='font-semibold'>
            {displayAEDCurrency(product.sellingPrice)}
          </p>

          <div className='flex justify-end mt-4'>
            <button
              onClick={() => {
                setProductId(product._id);
                deleteProduct(); // Call the delete function here
              }}
              className='w-fit ml-2 bg-red-200 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
            >
              <FaTrash />
            </button>
            <button
              onClick={() => {
                setOpenUpdateProduct(true)
                setProductId(product._id)
              }}
              className='w-fit ml-2 bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
            >
              <MdModeEditOutline />
            </button>
          </div>
        </div>
      </div>

      {/* Update Product Component */}
      {openUpdateProduct && (
        <AdminEditProduct
          onClose={() => setOpenUpdateProduct(false)}
          product={product}
          productId={productId}
          fetchAllProducts={fetchAllProducts}
        />
      )}

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  )
}

export default AdminProductCard;
