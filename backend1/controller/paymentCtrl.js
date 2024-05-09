const phonepeHost = "https://api.phonepe.com/apis/hermes"
const pmId = "M227ILLLXU0TX"
const SHA256 = require('crypto-js/sha256');
const axios = require("axios")
const psaltIndex = 1
const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee"
const uniqid = require("uniqid")
const nodeCCAvenue=require('node-ccavenue')
const CryptoJS=require('crypto-js')
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

    try {
        const ccav = new nodeCCAvenue.Configure({
            access_code:"AVKU78LD67AY95UKYA",
          working_key:"01199B9C3D2E12F539A4A180EBFDF9F3",
          merchant_id: "3447954",
        });
        const orderId = uniqid()

        const orderParams = {
          redirect_url: encodeURIComponent(
            `https://probable-halibut-r94v5r7gwjrhxgvj-5000.app.github.dev/api/user/order/hdfcRes`
          ),
          cancel_url: encodeURIComponent(
            `https://probable-halibut-r94v5r7gwjrhxgvj-3000.app.github.dev/checkout`
          ),
          merchant_id: "3447954",
        //   order_id: orderId,
        order_id: "12345678",

          currency: "INR",
          amount: 1,
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
          res.redirect(`https://probable-halibut-r94v5r7gwjrhxgvj-3000.app.github.dev/`);
      } else {
          res.redirect(`https://probable-halibut-r94v5r7gwjrhxgvj-3000.app.github.dev/checkout`);
      }
  } catch (error) {
      console.error("Error processing the HDFC response:", error);
      next(error);
  }
};





module.exports = {
    phonePe,
    redirectUri,
    hdfcPayment,
    hdfcResponse
}