import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const fetchListOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (res.data.Success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.Message);
    }
  };

  const StatusHandler = async (e,orderId) => {
    try {
      const res = await axios.post(backendUrl + '/api/order/status',{orderId,status:e.target.value},{headers:{token}});
      if(res.data.Success){
        await fetchListOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.Message)
    }
  }

  useEffect(() => {
    fetchListOrders();
  }, [token]);

  return (
    <div>
      <h2>Orders Page</h2>
      <div className="">
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div className="">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="">
                <p>{order.address.street + " , "}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipcode}
                </p>
              </div>
              <div className="">
                <p>{order.address.phone}</p>
              </div>
            </div>
            <div className="">
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethods}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(e)=>StatusHandler(e,order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
