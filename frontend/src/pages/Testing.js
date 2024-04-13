import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createAnOrder } from '../features/user/userSlice';
import { useDispatch,useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
const RedirectUri = () => {
 const order=JSON.parse(localStorage.getItem("recentOrder"))
const dispatch=useDispatch()
const navigate=useNavigate()
const addProductToOrderLocalStorage = (product) => {
  const existingOrder = JSON.parse(localStorage.getItem("orders")) || [];
  const updatedOrder = [...existingOrder, product];
  localStorage.setItem("orders", JSON.stringify(updatedOrder));
};
 useEffect(()=>{
  if(order){
    dispatch(createAnOrder(order))
  }

  setTimeout(()=>{
    localStorage.removeItem('cart')
    addProductToOrderLocalStorage(order)
    localStorage.removeItem("address")
    localStorage.removeItem("recentOrder")

  },2000)
 },[order])

  return (
    <div className='margin-section' style={{ marginTop: '150px' }}>
      <p>Hello, {order?.shippingInfo?.firstname}</p>
      <p>Thank you for your trust in VogueMine! Your order has been processed and is on its journey to you.</p>


      <button onClick={()=>navigate("/home")}>Continue Shopping</button>
      <button onClick={()=>navigate("/profile")}>See your order</button>
    </div>
  );
};

export default RedirectUri;
