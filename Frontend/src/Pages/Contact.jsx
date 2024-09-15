import React from "react";
import Title from "../Components/Title";
import { assets } from '../assets/assets'
import NewsLetterBox from '../Components/NewLetterBox'

export default function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <img src={assets.contact_img} className="w-full md:max-w-[480px]" alt="" />
          <div className="flex flex-col justify-center items-start gap-6 ">
                <p className="font-semibold text-xl text-gray-600">Our Store</p>
                <p className="text-gray-500">Antilia, Ketan Tower, <br />Altamount Road, Cumballa Hill, Mumbai – 400026 Bharat</p>
                <p className="text-gray-500">Phone : +91 766644 6754 <br />Email : ketan@gmail.com</p>
                <p className="font-semibold text-xl text-gray-600">Career At Towers</p>
                <p className="text-gray-600">Learn More About Our Teams And Job Opening</p>
                <button className=" border border-black px-8 py-4 text-1xl hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
          </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}
