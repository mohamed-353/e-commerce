import React from 'react'
import successVideo from '../assets/Credit Card Travel GIF by VitraCash.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <>
      <div className='flex justify-center items-center flex-col bg-slate-200 w-full max-w-4xl h-[600px] mx-auto rounded-lg text-center'>
        <img src={successVideo} alt='successVideo' className='w-[400px] h-[400px] object-scale-down mix-blend-multiply' />
        <p className='text-green-600 font-bold text-3xl'>Payment Success</p>
        <Link
          to='/order'
          className=
          'p-2 px-3 mt-5 border-4 border-green-500 hover:border-green-600 rounded-lg font-semibold bg-green-600 hover:bg-green-400 text-white hover:text-green-600  text-3xl'
        >
          My Order
        </Link>
      </div>
    </>
  )
}

export default Success