const phonepeHost = "https://api.phonepe.com/apis/hermes"
const pmId = "M227ILLLXU0TX"
const SHA256 = require('crypto-js/sha256');
const axios = require("axios")
const psaltIndex = 1
const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee"
const uniqid = require("uniqid")
const nodeCCAvenue=require('node-ccavenue')
const CryptoJS=require('crypto-js')
const crypto=require('crypto')
const jwt = require('jsonwebtoken');
const moment=require("moment")

const phonePe = async (req, res) => {
   try{
    const payEndpoint = '/pg/v1/pay';
    const merchantTransactionId = uniqid()
    const userId = "MUID"+uniqid()
    const {amount,number}=req.body
    const payload = {
        merchantId: pmId,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: amount*100,
        redirectUrl: `https://voguemine2.onrender.com/api/user/status/${merchantTransactionId}`,
        redirectMode: "POST",
        mobileNumber:number,
        paymentInstrument: {
            type: "PAY_PAGE"
        }
    }

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8")
    const base63EncodedPayload = bufferObj.toString("base64")
    const xVerify = SHA256(base63EncodedPayload + payEndpoint + psalt) + "###" + psaltIndex
    const options = {
        method: 'POST',
        url: `${phonepeHost}${payEndpoint}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify,
        },
        data: {
            request: base63EncodedPayload,
        }
    };
    axios
        .request(options)
        .then(function (response) {
            return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
            // res.redirect(url)
        })
        .catch(function (error) {
            console.error(error);
        });
   }
   catch(error){
    res.status(500).send({
        message:error.message,
        success:false
    })
   }
}



const redirectUri = async (req, res) => {
    // return console.log(res.req.body)
    const {merchantTransactionId} =req.params
        const xverify=SHA256(`/pg/v1/status/${pmId}/${merchantTransactionId}` + psalt) + "###" + psaltIndex
        const options = {
            method: 'GET',
         url: `${phonepeHost}/pg/v1/status/${pmId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                "X-VERIFY":xverify,
                "X-MERCHANT-ID":pmId
            },

        };
        axios
            .request(options)
            .then(async (response) =>{
               if(response.data.code==="PAYMENT_SUCCESS"){
                return res.redirect("https://voguemine.com/success")
                // window.location.href=""
               }
            })
            .catch(function (error) {
                console.error(error);
            });
        // res.send({ merchantTransactionId })

}


const hdfcPayment = async (req, res,next) => {
    const {orderId,amount}=req.body
    try {
        const ccav = new nodeCCAvenue.Configure({
            access_code:"AVKU78LD67AY95UKYA",
          working_key:"01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
        });

        const orderParams = {
          redirect_url: encodeURIComponent(
            `https://probable-halibut-r94v5r7gwjrhxgvj-5000.app.github.dev/api/user/order/hdfcRes`
          ),
          cancel_url: encodeURIComponent(
            `https://rampvalk.com/checkout`
          ),
          merchant_id: "3447954",
        //   order_id: orderId,
        order_id:`${orderId}`,

          currency: "INR",
          amount: amount,
          language: "EN"

        };
        const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
        res.setHeader("content-type", "application/json");
        res.status(200).json({
          encryptedOrderData,
          payLink: `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&access_code=AVKU78LD67AY95UKYA&encRequest=${encryptedOrderData}`,
        });

      } catch (err) {
        next(err);
      }
};

const hdfcResponse = async (req, res, next) => {
  try {
      // Assuming `encResp` is correctly a base64/hex string of encrypted data
      const encryption = req.query.encResp || req.body.encResp;
console.log(encryption)
      // Configure your CCAvenue access with the correct working key
      const ccav = new nodeCCAvenue.Configure({
          working_key: "01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
      });

      var ccavResponse = ccav.redirectResponseToJson(encryption);
      console.log(ccavResponse)

      var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(ccavResponse),
          "Voguemine"
      ).toString();
      // Redirect based on payment status
      if (ccavResponse["order_status"] === "Success") {
          res.redirect(`https://rampvalk.com/profile`);
      } else {
          res.redirect(`https://rampvalk.com/checkout`);
      }
  } catch (error) {
      console.error("Error processing the HDFC response:", error);
      next(error);
  }
};


 // To parse URL-encoded strings

// Encrypt function for CCAvenue
const querystring = require('querystring'); // To parse URL-encoded strings

// Encrypt function for CCAvenue
function encrypt(plainText, workingKey) {
  const key = CryptoJS.enc.Utf8.parse(workingKey);
  const iv = CryptoJS.enc.Utf8.parse(workingKey);
  const encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

// Decrypt function for CCAvenue
function decrypt(encryptedText, workingKey) {
  const key = CryptoJS.enc.Utf8.parse(workingKey);
  const iv = CryptoJS.enc.Utf8.parse(workingKey);
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const checkOrderStatus = async (req, res) => {
  const { orderId } = req.body;
  try {
    const accessCode = 'AVKU78LD67AY95UKYA';
    const workingKey = '01199B9C3D2E12F5'; // Encryption key

    // Prepare data for the request
    const requestData = {
      access_code: accessCode,
      command: 'orderStatusTracker',
      request_type: 'JSON',
      response_type: 'JSON',
      version: '1.2',
      enc_request: encryptRequest(orderId, workingKey),
    };

    // Make the API request
    const response = await fetch('https://apitest.ccavenue.com/apis/servlet/DoWebTrans', {
      method: 'POST',
      body: new URLSearchParams(requestData),
    });

    // Read the response body as text
    const responseBody = await response.text();
    console.log('Raw Response:', responseBody);

    // Parse the response as JSON
    const parsedResponse = JSON.parse(responseBody);
    console.log('Parsed Response:', parsedResponse);

    // Check for errors in the response
    if (parsedResponse.status === '1') {
      console.error('Error:', parsedResponse.enc_error_code, parsedResponse.enc_response);
      return res.status(400).json({ error: parsedResponse.enc_response });
    }

    // Decrypt the encrypted response
    const decryptedResponse = decryptResponse(parsedResponse.enc_response, workingKey);
    console.log('Decrypted Response:', decryptedResponse);

    // Send the decrypted response back
    res.json(JSON.parse(decryptedResponse));

  } catch (error) {
    console.error('Error checking order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to encrypt the request data
const encryptRequest = (orderId, workingKey) => {
  // Implement encryption logic here
  return 'Encrypted_Request_Data';
};

// Function to decrypt the response data
const decryptResponse = (encResponse, workingKey) => {
  // Implement decryption logic here
  return 'Decrypted_Response_Data';
};




const secretKey = 'rcDR0IKFer68ZpC9qA6DpLzz4CD1rGGu'; // Replace with your actual secret key
const clientid = 'uvoguev2'; // Replace with your actual clientid
const mercid = 'UVOGUEV2'; // Replace with your actual mercid

const formatDateWithTimezone = (date) => {
  const timezoneOffset = -date.getTimezoneOffset() * 60000;
  const localISOTime = (new Date(date.getTime() + timezoneOffset)).toISOString().slice(0, -1);
  return localISOTime + '+00:00';
};
const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] });
    console.log('Verified Token:', decoded);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
};

const billPay = async (req, res) => {
  const now = new Date();
  const orderDate = formatDateWithTimezone(now);
  const traceId = uniqid();

  const payload = {
    mercid,
    orderid: uniqid(),
    amount: '100.00',
    order_date: orderDate,
    currency: 'INR',
    ru: 'http://localhost:5000/api/user/order/billRes',
    additional_info: {
      additional_info1: 'Demo',
      additional_info2: 'Voguemine',
    },
    itemcode: 'DIRECT',
    device: {
      init_channel: 'internet',
      ip: req.ip,
      user_agent: req.headers['user-agent'],
      accept_header: 'text/html',
      browser_tz: '-330',
      browser_color_depth: '32',
      browser_java_enabled: 'false',
      browser_screen_height: '601',
      browser_screen_width: '657',
      browser_language: 'en-US',
      browser_javascript_enabled: 'true',
    },
    iat: Math.floor(Date.now() / 1000),
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT',
    clientid, // Include clientid as a custom parameter in the header
  };

  console.log('Payload:', JSON.stringify(payload, null, 2));
  console.log('Header:', JSON.stringify(header, null, 2));

  try {
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256', header });
verifyToken(token,secretKey)
    console.log('Generated JWT:', token);

    const response = await axios.post(
      'https://uat1.billdesk.com/u2/payments/ve1_2/orders/create',
      token,
      {
        headers: {
          Accept: 'application/jose',
          'Content-Type': 'application/jose',
          'BD-Traceid': traceId,
          'BD-Timestamp': Math.floor(Date.now() / 1000).toString(),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error response:', error.response ? error.response.data : error.message);
    console.error('Error details:', error.response ? error.response : error);

    res.status(500).json({
      error: 'Error processing payment',
      details: error.response ? error.response.data : error.message,
    });
  }
};

const billRes=(req, res) => {
    const response = req.body;
    // Handle the response from BillDesk
    res.json(response);
    }
module.exports = {
    phonePe,
    redirectUri,
    hdfcPayment,
    hdfcResponse,
    billPay,
    billRes,
    checkOrderStatus
}