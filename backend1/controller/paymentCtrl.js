const phonepeHost = "https://api.phonepe.com/apis/hermes"
const pmId = "M227ILLLXU0TX"
const SHA256 = require('crypto-js/sha256');
const axios = require("axios")
const psaltIndex = 1
const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee"
const uniqid = require("uniqid")
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
        amount: 100,
        redirectUrl: `https://voguemine2.onrender.com/api/user/redirect-url/${merchantTransactionId}`,
        redirectMode: "POST",
        mobileNumber:number || "99999999",
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
            // return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
            // res.redirect(url)
            res.send(response.data)
        })
        .catch(function (error) {
            console.error(error);
        });
   }
   catch(error){
    console.log(error)
   }
}



const redirectUri = async (req, res) => {
    const { merchantTransactionId } = req.params;
    const payEndpoint = '/pg/v1/pay';
    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8")
    const base63EncodedPayload = bufferObj.toString("base64")
    if (merchantTransactionId) {
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
            .then(function (response) {
                if(res.data.code==="PAYMENT_SUCCESS"){
                    const url=`https://flipkaart.shop/success`
                    return res.redirect(url)
                }
                else{
                    const url=`https://flipkaart.shop/checkout`
                    return res.redirect(url)
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        // res.send({ merchantTransactionId })
    } else {
        res.send({ error: "Error" })
    }
}


module.exports = {
    phonePe,
    redirectUri
}