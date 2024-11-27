import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productsCategory'
import axios from 'axios'
import summaryApi from '../common'
import displayAEDCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import { toast } from 'react-toastify'

const ProductCategory = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(12).fill(false)
  const navigate = useNavigate()

  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search);
  const urlArrayCategoryList = urlSearchParams.getAll("category");

  const urlObjectCategoryList = {}

  urlArrayCategoryList.forEach(el => {
    urlObjectCategoryList[el] = true
  });

  const [selectCategory, setSelectCategory] = useState(urlObjectCategoryList)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy] = useState("")

  const fetchProducts = async () => {
    setLoading(true)
    await axios.post(summaryApi.filterProduct.url,
      { category: filterCategoryList },
      { withCredentials: true },
    ).then((response) => {
      const responseData = response?.data;

      if (responseData?.success) {
        console.log(responseData.data);
        setData(responseData?.data || []);
        return responseData?.data;
      } else {
        toast.error(responseData?.message);
        return;
      }
    })
    setLoading(false)
  }

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id, 1);
  }
  const handleSelectCategory = async (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      }
    })
  }

  const handleSortBy = (e) => {
    const { value } = e.target

    setSortBy(value)

    if (value === "asc") {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    } else if (value === "dsc") {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategories = Object.keys(selectCategory).map(categoryKey => {
      if (selectCategory[categoryKey]) {
        return categoryKey
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategories)

    const urlFormat = arrayOfCategories.map(el => {
      if (arrayOfCategories.length === 1) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate(`/product-category?${urlFormat.join("")}`)
  }, [selectCategory])

  useEffect(() => {

  }, [sortBy])

  return (
    <>
      <div className='container mx-auto mr-24 mt-1 p-4'>
        {/* desktop */}
        <div className='grid grid-cols-[150px,1fr] md:grid-cols-[250px,1fr] select-none'>
          {/* left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-190px)] max-h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none shadow-2xl rounded-2xl sticky top-24'>
            {/* sort by */}
            <div className=''>
              <h3 className='text-xl uppercase font-medium text-slate-500 border-b-2 pb-1 border-slate-300'>SORT BY</h3>

              <form className='text-lg flex flex-col gap-2 py-2'>
                <div className='flex gap-3'>
                  <input type='radio' name="sortBy" checked={sortBy === "dsc"} value={"dsc"} onChange={handleSortBy} />
                  <label>Price - High To Low</label>
                </div>

                <div className='flex gap-3'>
                  <input type='radio' name="sortBy" checked={sortBy === "asc"} value={"asc"} onChange={handleSortBy} />
                  <label>Price - Low to High</label>
                </div>
              </form>

            </div>

            {/* filter by */}
            <div className='mt-1'>
              <h3 className='text-xl uppercase font-medium text-slate-500 border-b-2 pb-1 border-slate-300'>CATEGORY</h3>

              <form className='text-lg flex flex-col gap-2 py-2'>
                {productCategory.map((category, index) => {
                  return (
                    <div key={category.id} className='flex gap-3'>
                      <input
                        type='checkBox'
                        id={category?.id}
                        name={"category"}
                        checked={selectCategory[category?.value]}
                        value={category?.value}
                        onChange={handleSelectCategory}
                      />
                      <label htmlFor={category.value}>{category.label}</label>
                    </div>
                  )
                })}
              </form>

            </div>
          </div>

          {/* right side */}
          <div className='p-2'>
            <h1 className='ml-8 text-2xl font-semibold py-4'>Results: {data.length}</h1>

            <div className='flex flex-wrap justify-between gap-2'>
              {loading ? (
                loadingList.map((_, index) => (
                  <div key={index} className='flex w-full h-44 min-w-96 max-w-96 rounded-lg bg-white shadow-md overflow-hidden animate-pulse'>
                    <div className='bg-slate-200 h-full w-44 flex justify-center items-center'>
                      <div className='w-32 h-32 bg-slate-300 rounded'></div>
                    </div>

                    <div className='p-4 flex flex-col  justify-between flex-grow'>
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
                data.map((product) => {
                  return (
                    <Link
                      key={product?._id}
                      to={`/product/${product?._id}`}
                      className='min-w-[370px] max-w-[370px] h-[400px] rounded-xl bg-white shadow-md mt-5 ml-9'
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
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCategory