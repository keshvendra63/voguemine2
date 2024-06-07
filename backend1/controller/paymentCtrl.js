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


const hdfcPayment = async (req, res, next) => {
  const { orderId, amount } = req.body;
  try {
      const ccav = new nodeCCAvenue.Configure({
          access_code: "AVKU78LD67AY95UKYA",
          working_key: "01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
      });

      // Add original amount as a custom parameter
      const orderParams = {
          redirect_url: encodeURIComponent(
              `https://voguemine2.onrender.com/api/user/order/hdfcRes`
          ),
          cancel_url: encodeURIComponent(
              `https://rampvalk.com/checkout`
          ),
          merchant_id: "3447954",
          order_id: `${orderId}`,
          currency: "INR",
          amount: amount,
          language: "EN",
          merchant_param1: amount // Pass the original amount as a custom parameter
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
      const encryption = req.query.encResp || req.body.encResp;

      const ccav = new nodeCCAvenue.Configure({
          working_key: "01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
      });

      var ccavResponse = ccav.redirectResponseToJson(encryption);

      // Extract the original amount from the custom parameter
      const originalAmount =ccavResponse.merchant_param1

      // Compare the amounts
      if (parseFloat(ccavResponse.order_amt) !== originalAmount) {
          return res.status(400).json({ error: 'Amount mismatch' });
      }

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
function encrypt(plainText, key) {
  key = hextobin(md5(key));
  const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
  const cipher = crypto.createCipheriv('aes-128-cbc', key, initVector);
  let encryptedText = cipher.update(plainText, 'utf8', 'hex');
  encryptedText += cipher.final('hex');
  return encryptedText;
}

function decrypt(encryptedText, key) {
  key = hextobin(md5(key));
  const initVector = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
  const encryptedBuffer = hextobin(encryptedText);
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, initVector);
  let decryptedText = decipher.update(encryptedBuffer, 'binary', 'utf8');
  decryptedText += decipher.final('utf8');
  return decryptedText;
}

function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

function hextobin(hexString) {
  const buffer = Buffer.alloc(hexString.length / 2);
  for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return buffer;
}

// Status API
const hdfcStatus = async (req, res, next) => {
  const { orderNo, referenceNo } = req.body;
  const working_key = '01199B9C3D2E12F539A4A180EBFDF9F3'; // Shared by CCAvenue
  const access_code = 'AVKU78LD67AY95UKYA';

  const merchant_json_data = {
      'order_no': orderNo,
      'reference_no': referenceNo
  };

  const merchant_data = JSON.stringify(merchant_json_data);
  const encrypted_data = encrypt(merchant_data, working_key);
  const final_data = `enc_request=${encrypted_data}&access_code=${access_code}&command=orderStatusTracker&request_type=JSON&response_type=JSON&version=1.2`;

  try {
      const response = await axios.post('https://apitest.ccavenue.com/apis/servlet/DoWebTrans', final_data, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      const result = response.data;
      console.log('API Response:', result); // Log the entire API response for debugging

      let status = '';
      const information = result.split('&');

      information.forEach(info => {
          const info_value = info.split('=');
          if (info_value[0] === 'enc_response') {
              status = decrypt(info_value[1].trim(), working_key);
          }
      });

      console.log('Decrypted status:', status); // Log the decrypted status
      if (status) {
          const obj = JSON.parse(status);
          console.log('Parsed JSON:', obj); // Log the parsed JSON object
          res.status(200).json(obj);
      } else {
          console.error('No status found in response.');
          res.status(400).json({ error: 'No status found in response.' });
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      next(error);
  }
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
    hdfcStatus
}
