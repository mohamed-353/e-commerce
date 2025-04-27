import React from 'react'
import successVideo from '../assets/Payment Declined.mp4'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <>
      <div className='flex justify-center items-center flex-col bg-slate-200 w-full max-w-4xl h-[500px] mx-auto rounded-lg text-center'>
        <video
          src={successVideo}
          autoPlay
          loop
          muted
          className='w-[320px] h-[320px] object-cover mix-blend-multiply'
        />
        <p className='text-red-600 font-bold text-3xl'>Payment Canceled</p>
        <Link
          to='/order'
          className=
          'p-2 px-3 mt-5 border-4 border-red-500 hover:border-red-600 rounded-lg font-semibold bg-red-600 hover:bg-red-400 text-white hover:text-red-600  text-3xl'
        >
          My Cart
        </Link>
      </div>
    </>
  )
}

export default Cancel