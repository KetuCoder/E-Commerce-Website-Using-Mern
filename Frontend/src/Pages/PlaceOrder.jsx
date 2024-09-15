import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PlaceOrder() {

  const [method,setMethod] = useState('cod');
  const { navigate , backendUrl , token , cartItems , setCartItems , GetCartAmount , delivery_fee , products } = useContext(ShopContext);

  const [formData,setFormData] = useState({
    firstName : '', lastName : '' , email : '' , street : '' , city : '' , state : '' , zipcode : '' , country : '' , phone : ''
  })

  const OnChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}))
  }
  const OnSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address : formData,
        items : orderItems,
        amount : GetCartAmount() + delivery_fee
      }

      switch(method){

        case 'cod' : 
          const res = await axios.post(backendUrl + '/api/order/place',orderData,{headers : {token}});
          console.log(res.data)
          if(res.data.Success){
            setCartItems({});
            navigate('/orders')
          }else{
            toast.error(res.data.Message);
          }
        break;
        
        case 'stripe' :
            const responceStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
            if(responceStripe.data.Success){
                const { session_url } = responceStripe.data;
                window.location.replace(session_url); 
            }else{
              toast.error(responceStripe.data.Message)
            }
        break;

        default : 
          break;
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={OnSubmit} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80%] border-t-'>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

            <div className='text-xl sm:text-2xl my-3'>
                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>
            <div className='flex gap-3'>
              <input required onChange={OnChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required onChange={OnChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <input required onChange={OnChangeHandler} name='email' value={formData.email} type="email" placeholder='Your Email ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required onChange={OnChangeHandler} name='street' value={formData.street} type="text" placeholder='Street Address ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <div className='flex gap-3'>
              <input required onChange={OnChangeHandler} name='city' value={formData.city} type="text" placeholder='Your City ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required onChange={OnChangeHandler} name='state' value={formData.state} type="text" placeholder='Your State ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <div className='flex gap-3'>
              <input required onChange={OnChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Your City Zipcode ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
              <input required onChange={OnChangeHandler} name='country' value={formData.country} type="text" placeholder='Your Country ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <input required onChange={OnChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Your Phone Number ...' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>

        <div className='mt-8'>
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>

            <div className='mt-12'>
                <Title text1={'PAYMENT'} text2={'METHOD'} />
                <div className="flex gap-3 flex-col lg:flex-row ">
                  <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
                    <img src={assets.stripe_logo} className='h-5 mx-4' />
                  </div>
                  {/* <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
                    <img src={assets.razorpay_logo} className='h-5 mx-4' />
                  </div> */}
                  <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
                    <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
                  </div>
                </div>
                <div className="w-full text-end mt-8">
                  <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACEORDER</button>
                </div>
            </div>

        </div>

    </form>
  )
}
