const phonepeHost = "https://api.phonepe.com/apis/hermes"
const pmId = "M227ILLLXU0TX"
const SHA256 = require('crypto-js/sha256');
const axios = require("axios")
const psaltIndex = 1
const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee"
const uniqid = require("uniqid")
const nodeCCAvenue=require('node-ccavenue')
const CryptoJS=require('crypto-js')
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
            `https://voguemine2.onrender.com/api/user/order/hdfcRes`
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

      // Configure your CCAvenue access with the correct working key
      const ccav = new nodeCCAvenue.Configure({
          working_key: "01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
      });

      // Attempt to decrypt and convert to JSON
      var ccavResponse = ccav.redirectResponseToJson(encryption);
      console.log(ccavResponse)

      // You might need to handle the decryption or data conversion based on your setup
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



const billdeskHost = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
const merchantId = 'UVOGUEV2';
const securityKey = 'rcDR0IKFer68ZpC9qA6DpLzz4CD1rGGu';

const headers = {
    alg: "HS256",
    clientid: "uvoguev2",
    kid: "HMAC"
};

const createOrder = async () => {
    const payload = {
        mercid: merchantId,
        orderid: "12345gty",
        amount: "100.00",
        order_date: new Date().toISOString(),
        currency: "INR",
        ru: 'http://localhost:5000/api/user/order/billRes',
        additional_info: {
            additional_info1: "cud456",
            additional_info2: "vogue",
            additional_info3: "NA",
            additional_info4: "NA",
            additional_info5: "NA",
            additional_info6: "NA",
            additional_info7: "NA"
        },
        itemcode: "DIRECT",
        device: {
            init_channel: "internet",
            ip: "127.0.0.1",
            mac: "00:00:00:00:00:00",
            imei: "123456789012345",
            accept_header: "text/html",
            user_agent: "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0",
            fingerprintid: "unique_fingerprint_id"
        }
    };

    const token = jwt.sign(payload, securityKey, {
        algorithm: 'HS256',
        header: headers
    });

    try {
        const response = await axios.post(billdeskHost, token, {
            headers: {
                'Content-Type': 'application/jose',
                'Accept': 'application/jose',
                'BD-Traceid': payload.orderid,
                'BD-Timestamp': moment().utc().format('YYYYMMDDTHHmmss') // Format correction
            }
        });

        const result = response.data;

        try {
            const decoded = jwt.verify(result, securityKey, { algorithms: ['HS256'] });

            if (decoded.status === 'ACTIVE') {
                const transactionid = decoded.links[1].parameters.bdorderid;
                const authtoken = decoded.links[1].headers.authorization;

                console.log('Transaction is active. Transaction ID:', transactionid);

                const formHTML = `
                    <html>
                    <head></head>
                    <body>
                        <form name="sdklaunch" id="sdklaunch" action="https://uat1.billdesk.com/u2/web/v1_2/embeddedsdk" method="POST">
                            <input type="hidden" id="bdorderid" name="bdorderid" value="${transactionid}">
                            <input type="hidden" id="merchantid" name="merchantid" value="${merchantId}">
                            <input type="hidden" id="rdata" name="rdata" value="${authtoken}">
                            <input name='submit' type='submit' value='Complete your Payment' />
                        </form>
                        <script type="text/javascript">
                            document.getElementById('sdklaunch').submit();
                        </script>
                    </body>
                    </html>
                `;
                return formHTML;
            } else {
                console.error('Response error:', decoded);
            }
        } catch (error) {
            console.error('Return signature validation FAILED:', error);
        }
    } catch (error) {
        console.error('Error submitting to Billdesk:', error.response ? error.response.data : error.message);
    }
};

const billPay = async (req, res) => {
    const formHTML = await createOrder();
    res.send(formHTML);
};


const billRes=(req, res) => {
        const tx = req.body.transaction_response;
    
        if (!tx) {
            return res.status(400).send('Invalid call');
        }
    
        // Signature validation
        try {
            const resultDecoded = jwt.verify(tx, "rcDR0IKFer68ZpC9qA6DpLzz4CD1rGGu", { algorithms: ['HS256'] });
            const resultArray = resultDecoded;
            const resultJson = JSON.stringify(resultArray, null, 2);
    
            // Process info
            if (resultDecoded.transaction_error_type === 'success') {
                const orderid = resultDecoded.orderid;
                const transactionDate = resultDecoded.transaction_date;
                const transactionid = resultDecoded.transactionid;
                const chargeAmount = resultDecoded.charge_amount;
    
                // SAVE TO DB and send receipt
                // Example: updateTransactionToDB(resultArray);
                // Example: GenerateReceiptEmail(orderid, 1, draftreceipt);
    
                res.send(`
                    <h2>Transaction was successful....</h2>
                    Transaction Date: ${transactionDate}<br>
                    Transaction ID: ${transactionid}<br>
                    Charge Amount: ₹${chargeAmount}<br>
                `);
            } else {
                const txerror = resultDecoded.transaction_error_type;
                const transactionid = resultDecoded.transactionid;
                res.send(`
                    <h2>Transaction FAILED....</h2>
                    Transaction Date: ${resultDecoded.transaction_date}<br>
                    Transaction ID: ${transactionid}<br>
                    Charge Amount: ₹${resultDecoded.charge_amount}<br>
                    Failure Reason: ₹${resultDecoded.transaction_error_desc}<br>
                `);
            }
        } catch (error) {
            res.status(400).send('Invalid response');
        }
    }
module.exports = {
    phonePe,
    redirectUri,
    hdfcPayment,
    hdfcResponse,
    billPay,
    billRes
}