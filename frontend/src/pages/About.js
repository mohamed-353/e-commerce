import React from 'react'

const About = () => {
  return (
    <section>
      {/* Top section with fixed background */}
      <header className="bg-[#172d4e] h-32 md:h-26 w-full text-white flex justify-center items-center text-3xl md:text-5xl">
        About Us
      </header>

      <div className='grid grid-cols-1 md:grid-cols-[1fr,1.5fr] h-[calc(100vh-10rem)] mt-24'>
        {/* Left section with circular background */}
        <div className='flex justify-center items-start'>
          <div className='bg-cyan-200 rounded-full w-[360px] h-[360px] md:w-[460px] md:h-[460px] flex justify-center items-center'>
            <ul className="p-4">
              <li className="text-xl font-semibold text-black text-center mb-2">
                محمد طارق عبد الحميد — رقم الجلوس: 65883
              </li>
              <li className="text-xl font-semibold text-black text-center mb-2">
                يوسف زاهر البدوي — رقم الجلوس: 65801
              </li>
              <li className="text-xl font-semibold text-black text-center mb-2">
                محمد عبد الباسط عبد الصمد — رقم الجلوس: 65877
              </li>
              <li className="text-xl font-semibold text-black text-center mb-2">
                منار أيمن القباري — رقم الجلوس: 65309
              </li>
            </ul>
          </div>
        </div>

        {/* Right section with flex column for text */}
        <div className='flex flex-col justify-start items-start gap-4 h-full'>
          <div className='font-bold text-2xl text-cyan-700'>
            ملخص مشروع التجارة الإلكترونية
          </div>

          {/* Text content with word wrapping */}
          <div className='break-words p-4 text-lg text-gray-700'>
            يهدف هذا المشروع إلى إنشاء موقع تجارة إلكترونية متكامل يوفر تجربة تسوق سهلة وسريعة للمستخدمين.
            يتميز الموقع بتصميم عصري متجاوب مع جميع الأجهزة، مع توفير تصنيفات متعددة للمنتجات،
            وسهولة في التصفح وعملية شراء مبسطة وآمنة. يركز المشروع على تحسين تجربة المستخدم وتقديم واجهة استخدام مريحة وعملية.
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
