import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../Components/NewLetterBox'

export default function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus rerum eaque explicabo neque nesciunt, doloremque at odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ad necessitatibus laudantium.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestias nihil consequatur in nobis inventore vero repellat cum rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, doloribus.</p>
              <b className='text-gray-800 '>Our Mission</b>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consequuntur sit deleniti quasi inventore iste voluptas tenetur recusandae expedita? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi quibusdam maiores dolore voluptate! Numquam, quidem.</p>
          </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
            <b>Quality Assurance :</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, similique! Maxime, error soluta!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
            <b>Convenience :</b>
            <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, similique! Maxime, error soluta!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
            <b>Exception Customer Service :</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, similique! Maxime, error soluta!</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}
