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
 },[])

  return (
    <div className='margin-section' style={{ marginTop: '150px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
      <p style={{fontSize:'25px',fontWeight:'500',marginBottom:"20px"}}>Hello, {order?.shippingInfo?.firstname}</p>
      <p style={{color:'green',fontSize:'19px',marginBottom:'20px'}}>Thank you for your trust in Rampvalk! Your order has been processed and is on its journey to you.</p>


      <div>
      <button style={{color:'white',backgroundColor:'black',fontWeight:500,marginRight:'15px',border:'none',padding:'8px 15px'}} onClick={()=>navigate("/")}>Continue Shopping</button>
      <button style={{color:'white',backgroundColor:'black',fontWeight:500,border:'none',padding:'8px 15px'}} onClick={()=>navigate("/profile")}>See your order</button>
      </div>
    </div>
  );
};

export default RedirectUri;
