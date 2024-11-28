import React, { useState } from 'react'
import axios from 'axios'
import { CgClose } from 'react-icons/cg'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import summaryApi from '../common/index'
import productsCategory from '../helpers/productsCategory'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import imageCompression from "browser-image-compression";

function AdminEditProduct({ onClose, product, productId, fetchAllProducts }) {
  const [data, setData] = useState({
    productName: product?.productName,
    brandName: product?.brandName,
    category: product?.category,
    productImage: product?.productImage || [],
    description: product?.description,
    price: product?.price,
    sellingPrice: product?.sellingPrice,
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // File size limit (6MB)
    const fileSizeLimit = 6 * 1024 * 1024; // 6MB
    if (file.size > fileSizeLimit) {
      toast.error("Image size exceeds 6MB, please upload a smaller image");
      return;
    }

    let uploadToastId;
    try {
      // Compress the image
      const options = {
        maxSizeMB: 6, // Maximum size of the image in MB
        maxWidthOrHeight: 1024, // Maximum width or height of the image in pixels
        useWebWorker: true, // Use web workers for better performance
      };

      const compressedFile = await imageCompression(file, options);

      // Display a loading toast while uploading
      uploadToastId = toast.loading("Uploading image...");
      const uploadImageCloudinary = await uploadImage(compressedFile);

      console.log("compressedFile", compressedFile);
      console.log("uploadImageCloudinary", uploadImageCloudinary);

      // Update the toast with success message
      toast.update(uploadToastId, {
        render: "Image uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Update state with the new image URL
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));

    } catch (error) {
      // Update the toast with error message
      if (uploadToastId) {
        toast.update(uploadToastId, {
          render: "Image upload failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
      console.error("Image upload failed", error);
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(summaryApi.updateProduct.url, {
        data,
        productId,
      }, {
        withCredentials: true
      })
      const responseData = response.data
      if (responseData.success) {
        toast.success(responseData.message)
        onClose()
        fetchAllProducts()
      } else {
        toast.error(responseData.message)
      }
    } catch (error) {
      toast.error('Error updating product.')
    }
  }

  return (
    <>
      <div className='fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
          <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Update Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
              <CgClose />
            </div>
          </div>

          <form onSubmit={submitHandler} className='grid px-4 py-7 gap-3 h-full overflow-y-scroll'>
            <label htmlFor='productName'>Product Name :</label>
            <input
              type='text'
              id='productName'
              placeholder='enter product name'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='p-2 placeholder:text-lg text-lg bg-slate-100 border rounded-md'
            />

            <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
            <input
              type='text'
              id='brandName'
              placeholder='enter brand name'
              name='brandName'
              value={data.brandName}
              onChange={handleOnChange}
              className='p-2 placeholder:text-lg text-lg bg-slate-100 border rounded-md'
            />

            <label htmlFor='category' className='mt-3'>Category :</label>
            <select
              id='category'
              name='category'
              value={data.category}
              onChange={handleOnChange}
              className='p-2 bg-slate-100 rounded-md'
            >
              <option value={""}>Select Category</option>
              {productsCategory.map((ele, index) => (
                <option value={ele.value} key={ele.value + index}>
                  {ele.label}
                </option>
              ))}
            </select>

            <label htmlFor='productImage' className='mt-3'>Product Image :</label>
            <label htmlFor='uploadImageInput'>
              <div className='p-2 h-32 w-full text-lg bg-slate-100 border rounded-md flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'><FaCloudUploadAlt /></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input onChange={handleUploadProduct} type='file' id='uploadImageInput' className='hidden' />
                </div>
              </div>
            </label>

            <div>
              {data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                  {data.productImage.map((ele, index) => (
                    <div key={index} className='relative group'>
                      <img src={ele}
                        alt="Product"
                        width={80}
                        height={80}
                        className='bg-slate-100 border cursor-pointer'
                        onClick={() => {
                          setOpenFullScreenImage(true)
                          setFullScreenImage(ele)
                        }}
                      />
                      <div
                        className='absolute bottom-0 right-0 p-1 hidden group-hover:block text-white bg-cyan-600 rounded-full cursor-pointer'
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-red-600 text-xm'>*Please upload at least one product image</p>
              )}
            </div>

            <label htmlFor='price' className='mt-3'>Price :</label>
            <input
              type='number'
              id='price'
              placeholder='enter price'
              name='price'
              value={data.price}
              onChange={handleOnChange}
              className='p-2 placeholder:text-lg text-lg bg-slate-100 border rounded-md'
            />

            <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='enter selling price'
              name='sellingPrice'
              value={data.sellingPrice}
              onChange={handleOnChange}
              className='p-2 placeholder:text-lg text-lg bg-slate-100 border rounded-md'
            />

            <label htmlFor='description' className='mt-3'>Description :</label>
            <textarea
              id='description'
              placeholder='enter product description'
              name='description'
              value={data.description}
              rows={3}
              onChange={handleOnChange}
              className='p-1 h-28 resize-none placeholder:text-lg text-lg bg-slate-100 border rounded-md'
            />

            <div className='flex justify-center mt-4 text-xl text-white'>
              <button className='w-48 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full cursor-pointer'>
                Upload
              </button>
            </div>
          </form>
        </div>
        {openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
        )}
      </div>
    </>
  )
}

export default AdminEditProduct
