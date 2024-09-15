import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Orders() {

  const { backendUrl , token , currency } = useContext(ShopContext);
  const [orderData,setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if(!token){
        return null;
      }
      const res = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}});
      if(res.data.Success){
        let allordersItem = []
        res.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethods'] = order.paymentMethods
            item['date'] = order.date
            allordersItem.push(item)
          })
        })
        setOrderData(allordersItem.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  }

  useEffect(()=>{
    loadOrderData();
  },[token])

  return (
    <div className='border-t pt-16'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className=''>
            {
              orderData.map((item,index)=>(
                <div className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
                    <div className='flex items-start gap-6 text-sm '>
                        <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                        <div className=''>
                          <p className='sm:text-base font-medium'>{item.name}</p>
                          <div className='flex items-center gap-3 mt-2 text-base tex-gray-700'>
                              <p >{currency}{item.price}</p>
                              <p>Quantity : {item.quantity}</p>
                              <p>Size : {item.size}</p>
                          </div>
                          <p className='mt-2'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className='mt-2'>Payment : <span className='text-gray-400'>{item.paymentMethods}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                      <div className='flex items-center gap-2 '>
                          <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                          <p className='text-sm md:text-base'>{item.status}</p>
                      </div>
                      <button className='border px-4 py-2 text-sm font-medium rounded-sm' onClick={loadOrderData}>Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}
