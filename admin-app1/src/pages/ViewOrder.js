import React, { useEffect, useState,useRef } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserOrder, getOrders } from "../features/auth/authSlice";
import generatePDF from 'react-to-pdf';
import './packing.css'

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Product Name",
//     dataIndex: "name",
//   },
//   {
//     title: "Brand",
//     dataIndex: "brand",
//   },
//   {
//     title: "Count",
//     dataIndex: "count",
//   },
//   {
//     title: "Color",
//     dataIndex: "color",
//   },
//   {
//     title: "Amount",
//     dataIndex: "amount",
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

const ViewOrder = () => {
  const targetRef = useRef();
  const [num, setNum] = useState(0);

  const randomNumberInRange = (min, max) => {
      return Math.floor(Math.random()
          * (max - min + 1)) + min;
  };

  const pdfDownload=()=>{
      setNum(randomNumberInRange(1, 20));
      generatePDF(targetRef, {filename: `voguemine${num}.pdf`})
  }
  const navigate=useNavigate()
  const [subTotal,setSubTotal]=useState(null)
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrder(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  useEffect (()=> {
    let sum=0;
    for(let index=0; index < orderState?.orderItems?.length; index++){
        sum =sum+(Number(orderState?.orderItems[index]?.quantity) *orderState?.orderItems[index]?.price)
        setSubTotal(sum)
    }
},[orderState])
  // const data1 = [];
  // for (let i = 0; i < orderState?.orderItems?.length; i++) {
  //   data1.push({
  //     key: i + 1,
  //     name: orderState?.orderItems[i]?.product.title,
  //     brand: orderState?.orderItems[i]?.product.brand,
  //     count: orderState?.orderItems[i]?.quantity,
  //     amount: orderState?.orderItems[i]?.price,
  //     color: orderState?.orderItems[i]?.color,
  //     action: (
  //       <>
  //         <Link to="/" className=" fs-3 text-danger">
  //           <BiEdit />
  //         </Link>
  //         <Link className="ms-3 fs-3 text-danger" to="/">
  //           <AiFillDelete />
  //         </Link>
  //       </>
  //     ),
  //   });
  // }
  console.log(orderState)
  const timestamp = orderState?.createdAt; // Example timestamp in milliseconds

  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Format the date as desired
  const formattedDate = date.toLocaleString(undefined, {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false});
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div className="order-head">
          <div className="left">
          <p onClick={()=>navigate("/admin/orders")}><IoMdArrowRoundBack /></p>
            <div>
            <div>
              
              <p>#1000</p>
              <p>{orderState?.orderType}</p>
            </div>
            <div>
            <p>{formattedDate}</p>            </div>
            </div>
          </div>
          <div className="right">
            <button>Edit</button>
            <button  onClick={pdfDownload}>Print Packing Slip</button>
          </div>
        </div>
      <div className="order-detail">
        
       <div className="left-section">
       <div className="order-products">
        {
          orderState?.orderItems?.map((item,index)=>{
            return(
<div className="prdt">
          <div className="left">
            <img src={item?.product?.images[1]?.url} alt="" />
            <div className="details">
              <p style={{color:'blue',fontWeight:500}}>{item?.product?.title}</p>
              <p style={{fontWeight:500}}>{item?.size} / {item?.color}</p>
              <p style={{fontWeight:500}}>{item?.product?.sku}</p>
            </div>
          </div>
          <div className="right">
    <p>{item?.quantity} X {item?.price}</p>
    <p style={{fontWeight:500}}>{(item?.product?.price)*(item?.quantity)}</p>
          </div>
          </div>
            )
          })
        }
          

        </div>
        <div className="payment-info">
          <div className="payment">
            <div className="left">
<p>Subtotal</p>
<p>Shipping</p>
<p>Discount</p>
<p>Total</p>
            </div>
            <div className="center">
              <p>{orderState?.orderItems?.length} Item</p>
              <p>Prepaid</p>
              <p></p>
              <p></p>
            </div>
            <div className="right">
            <p>{subTotal}</p>
              <p>{orderState?.shippingCost}</p>
              <p>{orderState?.discount}</p>
              <p>{subTotal+(orderState?.shippingCost)-(orderState?.discount)}</p>
            </div>
          </div>
        </div>
       </div>
       <div className="right-section">
        <div className="customer">
        <p style={{color:'black',fontWeight:500}}>customer</p>
        <p>{orderState?.shippingInfo?.firstname}</p>
        {/* <p>3 orders</p> */}
        </div>
        <div className="email">
          <p style={{color:'black',fontWeight:500}}>Email</p>
          <p>{orderState?.shippingInfo?.email}</p>
        </div>
        <div className="address">
          <p style={{color:'black',fontWeight:500}}>Shipping Address</p>
          <p>{orderState?.shippingInfo?.firstname}</p>
          <p>{orderState?.shippingInfo?.address}</p>
          <p>{orderState?.shippingInfo?.city}</p>
          <p>{orderState?.shippingInfo?.pincode}</p>
          <p>{orderState?.shippingInfo?.state}</p>
          <p>{orderState?.shippingInfo?.phone}</p>
          {/* <p>+916387017782</p> */}
        </div>
       </div>
      </div>
      <div>
      <div style={{height:'1122px', width:'794px',padding:'50px', position:'absolute',left:'-200%'}} ref={targetRef}>
      <div className='head'>
<h1>VOGUE MINE</h1>
<div>
    <p>Order #6494</p>
    <p>{formattedDate}</p>
</div>
      </div>
      <div className="detail">
        <div>
        <p>SHIP TO</p>
        <p>{orderState?.shippingInfo?.firstname}</p>
          <p>{orderState?.shippingInfo?.address}</p>
          <p>{orderState?.shippingInfo?.city}</p>
          <p>{orderState?.shippingInfo?.pincode}</p>
          <p>{orderState?.shippingInfo?.state}</p>
          <p style={{fontWeight:500}}>NUMBER: {orderState?.shippingInfo?.phone}</p>
        </div>
        <div>
        <p>BILL TO</p>
        <p>{orderState?.shippingInfo?.firstname}</p>
          <p>{orderState?.shippingInfo?.address}</p>
          <p>{orderState?.shippingInfo?.city}</p>
          <p>{orderState?.shippingInfo?.pincode}</p>
          <p>{orderState?.shippingInfo?.state}</p>
          <p style={{fontWeight:500}}>NUMBER: {orderState?.shippingInfo?.phone}</p>
        </div>
      </div>
      <hr />
      <div className="main">
        <div className="head">
            <p style={{fontWeight:500}}>ITEMS</p>
            <p style={{fontWeight:500}}>QUANTITY</p>
        </div>
        {
          orderState?.orderItems?.map((item,index)=>{
            return(
            <div className="item" key={index}>
            <div className='img'>
                <img src={item?.product?.images[1]?.url} alt="img" />
                <div className="produ-detail">
                    <p>{item?.product?.title}</p>
                    <p>{item?.size} / {item?.color}</p>
                    <p>{item?.product?.sku}</p>
                    <p>RS. {item?.product?.price}</p>
                </div>
            </div>
            <p>{item?.quantity}</p>
        </div>

         ) })}
        

        <div className="total-amount">
            <p style={{fontWeight:500}}>Shipping Cost: {orderState?.shippingCost}</p>
            <p style={{fontWeight:500}}>Discount: Rs.{orderState?.discount}</p>
            <p style={{fontWeight:500}}>Total Amount: Rs.{orderState?.finalAmount}</p>
        </div>
        <hr />
        <div className='shop'>
        <p>Thank you shopping with us!</p><br/>
        <p  style={{fontWeight:700}}>Vogue Mine</p>
        <p>H 119, Noida, UP, 201301, India</p>
        <p>customersupport@voguemine.com</p>
        <p>+91 9899202079</p>
        <p>voguemine.com</p>
        </div>
      </div>
    </div>
        {/* <Table columns={columns} dataSource={data1} /> */}
      </div>
    </div>
  );
};

export default ViewOrder;
