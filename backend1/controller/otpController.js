var unirest = require("unirest");
const asyncHandler = require("express-async-handler");

function createUniqueFourDigitGenerator() {
    const usedNumbers = new Set();
    const rangeStart = 1000;
    const rangeEnd = 9999;

    function generate() {
        if (usedNumbers.size >= (rangeEnd - rangeStart + 1)) {
            throw new Error('All 4-digit numbers have been used');
        }

        let number;
        do {
            number = Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
        } while (usedNumbers.has(number));

        usedNumbers.add(number);
        return number;
    }

    function reset() {
        usedNumbers.clear();
    }

    return { generate, reset };
}

// Usage
const generator = createUniqueFourDigitGenerator();

const sendOtp=asyncHandler(async(req,res)=>{
    const {number}=req.params
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
    const otp=generator.generate()
    try {

req.query({
  "authorization": "2MnRj7gKhSaQ8u3zOyTtqbVdfF5YN1Lrks6weB0PXCIpvUA4m9nRZcVPmYBCz7IH2FvUg1l3A0w8yJ4j",
  "variables_values":`${otp}`,
  "route": "otp",
  "numbers": number
});

req.headers({
  "cache-control": "no-cache"
});

req.end(function (res) {
    // if (res.error) throw new Error(res.error);
  
    console.log(res.body);
  });
    res.json({otps:otp})

    }catch (error) {
        throw new Error(error);
      }
})

module.exports=sendOtp