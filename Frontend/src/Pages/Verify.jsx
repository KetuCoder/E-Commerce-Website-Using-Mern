import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Verify() {

    const { navigate , token , setCartItems , backendUrl } = useContext(ShopContext);
    const [searchParams,setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if(!token){
                return null
            }
            const res = await axios.post(backendUrl + '/api/order/verifystripe',{success,orderId},{headers:{token}})
            if(res.data.Success){
                setCartItems({});
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.Message);
        }
    }

    useEffect(()=>[
        verifyPayment()
    ] [token]);
    
  return (
    <div>
      verify
    </div>
  )
}
