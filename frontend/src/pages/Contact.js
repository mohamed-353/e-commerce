import React from 'react'
import { FaRegUserCircle, FaEnvelope, FaPhoneAlt, FaGithub } from 'react-icons/fa'
import CVFile from '../assets/Mohamed Tarek Full Stack CV.pdf'

const Contact = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start py-12 bg-gray-100">

      <div className="flex items-center gap-4 mb-8">
        <FaRegUserCircle className="w-14 h-14 text-cyan-700" />
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-[600px] flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-cyan-600 w-6 h-6" />
          <span className="text-lg text-gray-700">Gmail: ymirfritz96@gmail.com</span>
        </div>

        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-cyan-600 w-6 h-6" />
          <span className="text-lg text-gray-700">Phone: 01127797401</span>
        </div>

        <div className="flex items-center gap-4">
          <FaGithub className="text-cyan-600 w-6 h-6" />
          <a
            href="https://github.com/mohamed-353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-gray-700 hover:underline"
          >
            GitHub Profile
          </a>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My CV</h2>

        <iframe
          src={CVFile}
          className="w-full h-[700px] rounded-lg border"
          title="My CV"
        ></iframe>

        <div className="flex justify-center gap-6 mt-6">
          <a
            href={CVFile}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-600 text-white py-3 px-6 rounded text-lg hover:bg-cyan-700 transition"
          >
            view cv
          </a>

          <a
            href={CVFile}
            download
            className="bg-green-600 text-white py-3 px-6 rounded text-lg hover:bg-green-700 transition"
          >
            download cv
          </a>
        </div>
      </div>

    </section>
  )
}

export default Contact
