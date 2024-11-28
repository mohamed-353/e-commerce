import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import summaryApi from '../common/index'

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([])
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchProductCategory = async () => {
    setLoading(true)
    const response = await axios.get(summaryApi.productCategory.url, {
      withCredentials: true
    })
    const responseData = response.data
    if (responseData.success) {
      setLoading(false)
      setProductCategory(responseData.data)
    }
  }

  useEffect(() => {
    fetchProductCategory()
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {loading ? (
          categoryLoading.map((_, index) => {
            return (
              <div className='h-20 w-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>
              </div>
            )
          })
        ) :
          (
            productCategory.map((product, index) => {
              return (
                <Link to={`/product-category?category=${product?.category}`} className='cursor-pointer' key={product?.category}>
                  <div className='h-20 w-20 md:w-24 md:h-24 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                  </div>
                  <p className='text-center md:text-base capitalize'>{product?.category}</p>
                </Link>
              )
            })
          )}
      </div>
    </div>
  )
}

export default CategoryList