import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

export default function CartTotal() {

    const { currency , delivery_fee , GetCartAmount } = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {GetCartAmount()}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{delivery_fee === 0 ? 0 : delivery_fee}.00</p>
            </div>
            <hr />
            <div className="flex justify-between">
                <b>Total </b>
                <b>{currency}{GetCartAmount() === 0 ? 0 : GetCartAmount()+delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}