import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SHA256 } from 'crypto-js';

const RedirectUri = () => {
  const navigate = useNavigate();
  const { merchantTransactionId } = useParams();
  const recentOrder = JSON.parse(localStorage.getItem("recentOrder"));
  const [status, setStatus] = useState(null);
console.log(status)
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const psaltIndex = 1;
        const pmId = "M227ILLLXU0TX";
        const phonepeHost = "https://api.phonepe.com/apis/hermes";
        const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee";
        const xverify = SHA256(`/pg/v1/status/${pmId}/${merchantTransactionId}` + psalt) + "###" + psaltIndex;

        const response = await axios.get(`${phonepeHost}/pg/v1/status/${pmId}/${merchantTransactionId}`, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-MERCHANT-ID": pmId,
            "X-VERIFY": xverify
          }
        });

        setStatus(response.data);
      } catch (error) {
        console.error('Error checking status:', error);
        setStatus({ error: error.message }); // Set an error message in status state
      }
    };

    if (merchantTransactionId) {
      checkStatus();
    }
  }, [merchantTransactionId]);

  useEffect(() => {
    if (status && status.code === "PAYMENT_SUCCESS") {
      console.log(recentOrder);
      navigate("/profile");
    }
  }, [status, recentOrder, navigate]);

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
