const phonepeHost = "https://api.phonepe.com/apis/hermes"
const pmId = "M227ILLLXU0TX"
const SHA256 = require('crypto-js/sha256');
const axios = require("axios")
const psaltIndex = 1
const psalt = "b5efa4e8-7baf-49ec-b4d7-d059de7517ee"
const uniqid = require("uniqid")
const phonePe = async (req, res) => {
    const payEndpoint = '/pg/v1/pay';
    const merchantTransactionId = uniqid()
    const userId = "MUID"+uniqid()
    const {amount,number}=req.body
    console.log(amount,number)
    const payload = {
        merchantId: pmId,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: userId,
        amount: 100,
        redirectUrl: `https://probable-halibut-r94v5r7gwjrhxgvj-3000.app.github.dev/redirect-url/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
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
            const url = response.data.data.instrumentResponse.redirectInfo.url
            // res.redirect(url)
            res.send(response.data)
        })
        .catch(function (error) {
            console.error(error);
        });
}



const redirectUri = async (req, res) => {
    const { merchantTransactionId } = req.params;
    if (merchantTransactionId) {
        const xverify=SHA256(`/pg/v1/status/${pmId}/${merchantTransactionId}` + psalt) + "###" + psaltIndex
        const options = {
            method: 'GET',
         url: `${phonepeHost}/pg/v1/status/${pmId}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                "X-MERCHANT-ID":merchantTransactionId,
                "X-VERIFY":xverify
            },

        };
        axios
            .request(options)
            .then(function (response) {
                res.send(response.data.code);
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