import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

export default function ProductItem({id,image,item,price,name}) {

    const { currency } = useContext(ShopContext);

  return (
    <Link to={`/Product/${id}`} className='text-gray-700 cursor-pointer '>
        <div className='overflow-hidden'>
            <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium '>{currency}{price}</p>
    </Link>
  )
}
