import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const RedirectUri = () => {
  const navigate = useNavigate();
  const recentOrder = JSON.parse(localStorage.getItem("recentOrder"));
  const { merchantTransactionId } = useParams();
  console.log(merchantTransactionId)
  const [status, setStatus] = useState({});
  const pmId = "M227ILLLXU0TX"
  const phonepeHost = "https://api.phonepe.com/apis/hermes"
console.log(status)
useEffect(() => {
  const checkStatus = async () => {
    try {
      // Perform SHA256 encryption for X-VERIFY header
      const psaltIndex = 1;
      const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee";
      const xverify = SHA256(`/pg/v1/status/${pmId}/${merchantTransactionId}` + psalt) + "###" + psaltIndex;

      // Make a GET request to check transaction status
      const response = await axios.get(`${phonepeHost}/pg/v1/status/${pmId}/${merchantTransactionId}`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          "X-VERIFY": xverify,
          "X-MERCHANT-ID": pmId,

        }
      });
      
      // Update the status state with the response data
      setStatus(response.data);
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };

  checkStatus(); // Call the function to check transaction status
}, [merchantTransactionId]); // Add merchantTransactionId to dependencies array


  return (
    <div className='margin-section' style={{ marginTop: '150px' }}>
      {status ? (
        status.code === "PAYMENT_SUCCESS" ? (
          <p>Hii, {recentOrder?.shippingInfo?.firstname} Your Order Placed Successfully</p>
        ) : (
          <p>Please try Again</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RedirectUri;
