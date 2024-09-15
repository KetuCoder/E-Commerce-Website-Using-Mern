import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProduct from '../Components/RelatedProduct';

export default function Product() {

  const { productId } = useParams();
  const { products , currency , AddToCart } = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId,products]);


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          {/* product images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                  productData.image.map((item,index)=>(
                    <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
                  ))
                }
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} className='w-full h-auto' />
            </div>
          </div>
          {/* product info */}
          <div className="flex-1">
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_icon} alt="" />
              <img className='w-3 5' src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                  {
                    productData.sizes.map((item,index)=>(
                      <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-200 ${item === size ? 'border-orange-800' : ''}`}>{item}</button>
                    ))
                  }
              </div>
            </div>
            <button onClick={()=>AddToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add To Cart</button>
            <hr className='mt-8 sm:w-4/5' />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash On Delivery Is Available On This Product</p>
              <p>Easy Return And Exchange Policy Within 7 Days</p>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="mt-20">
          <div className="flex">
            <b className='border px-5 py-3 text-sm'>Description</b>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>An E-Commerce Website Is An Online Platform That Facilities The Buying And Selling Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Similique, quisquam animi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, harum aliquam eligendi dignissimos non ipsa 
               aperiam assumenda debitis iste voluptates, voluptas quae. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore voluptatem ad 
               dolorum quisquam laudantium eius alias repellat. Placeat, porro! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab vitae 
               exercitationem numquam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur dignissimos deserunt aperiam numquam eius nesciunt illo accusantium. 
              Lorem ipsum dolor sit amet conse Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime laboriosam debitis natus, incidunt fugiat rerum perspiciatis distinctio?</p>
          </div>
        </div>
        
        {/* related products */}
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) :
  <div className='opacity-0'>

  </div>
}
