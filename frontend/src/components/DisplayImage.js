import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-10 relative'>

        {/* Close button */}
        <div className='w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer absolute top-2 right-2' onClick={onClose}>
          <CgClose />
        </div>

        {/* Image Container */}
        <div className='flex justify-center p-4'>
          <img
            src={imgUrl}
            alt='Full view'
            className='w-[600px] h-[600px] object-contain' // Fixed width and height with aspect ratio maintained
          />
        </div>

      </div>
    </div>
  )
}

export default DisplayImage
