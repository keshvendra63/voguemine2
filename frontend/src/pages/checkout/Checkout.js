import React,{useState,useEffect} from 'react'
import './checkout.css'
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CircularProgress from '@mui/material/CircularProgress';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useDispatch,useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { TextField } from '@mui/material';
import axios from 'axios'
import {createAnOrder, resetState,createAbondend,sendOtp} from '../../features/user/userSlice'
import {getAllCoupons} from '../../features/coupon/couponSlice'
import { toast } from 'react-toastify';


const Checkout = () => {
const otpState=useSelector((state)=>state?.auth?.otp)
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [success,setSuccess]=useState(false)

    const [email,setEmail]=useState("")

    const [phone,setPhone]=useState("")
    const [mobile,setMobile]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [state,setState]=useState("")
    const [pincode,setPincode]=useState("")
    const [verified,setVerified]=useState(false)

    const [cartItems, setCartItems] = useState([]);
const address1=JSON.parse(localStorage.getItem("address"))
useEffect(()=>{
    if (!firstname && !lastname && !email && !address && !phone && !mobile && !city && !state && !pincode) {
        // Populate fields only if they're empty
        setFirstname(address1?.firstname || "")
        setLastname(address1?.lastname || "")
        setEmail(address1?.email || "")
        setAddress(address1?.address || "")
        setPhone(address1?.phone || "")
        setMobile(address1?.mobile || "")
        setCity(address1?.city || "")
        setState(address1?.state || "")
        setPincode(address1?.pincode || "")
    }
},[address1, firstname, lastname, email, address, phone, mobile, city, state, pincode])
    const location = useLocation();
    const navigate=useNavigate()

    const addProductToOrderLocalStorage = (product) => {
        const existingOrder = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrder = [...existingOrder, product];
        localStorage.setItem("orders", JSON.stringify(updatedOrder));
      };
      function normalizePhoneNumber(phoneNumber) {
        // Remove all non-digit characters from the phone number
        let cleanNumber = phoneNumber.replace(/\D/g, '');
    
        // Check if the number starts with '91' (India's country code) and is longer than 10 digits
        if (cleanNumber.startsWith('91') && cleanNumber.length > 10) {
            // Remove the '91' prefix
            cleanNumber = cleanNumber.substring(2);
        } else if (cleanNumber.startsWith('0') && cleanNumber.length > 10) {
            // Remove the leading '0' if any (common in some domestic formats)
            cleanNumber = cleanNumber.substring(1);
        }
    
        // Return the cleaned up number assuming it should be 10 digits long
        return cleanNumber;
    }
      const [verify,setVerify]=useState("SEND OTP")
      const [otp,setOtp]=useState()
      const [noneOtp,setNoneotp]=useState("none")
      const [paySpin,setPaySpin]=useState(false)
    const [totalAmount,setTotalAmount]=useState(null)
    const [orderType,setOrderType]=useState("Prepaid")
    const [shippingCost,setShippingCost]=useState(0)
    const [cartProductState,setCartProductState]=useState([])
    const [coupon,setCoupon]=useState("")
    const couponState=useSelector((state)=>state?.coupon?.coupon)
    const [payMethod,setPayMethod]=useState("phonepe")
    useEffect(() => {
        // Retrieve cart items from localStorage
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartFromStorage);

    }, []);
    

    const removeFromCartAndUpdate = (productIdToRemove, colorToRemove, sizeToRemove) => {
        // Filter out the item to remove based on productId, color, and size
        const updatedCartItems = cartItems.filter(item => {
            return !(item.productId === productIdToRemove && item.color === colorToRemove && item.size === sizeToRemove);
        });

        // Update localStorage with the updated cart items
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

        // Update state to reflect the changes
        setCartItems(updatedCartItems);
        toast.success("Removed");
    };
    const applyCoupon=()=>{
        couponState?.map((item)=>{
            if((item?.name.toLowerCase())===(coupon.toLowerCase())){
                if(item?.status==="active"){
                    if(item?.discounttype==="freeShip"){
                        setShippingCost(0)
                    }
                    if(item?.discounttype==="buyX"){
                        if(item?.minItem<=10){
                          if(item?.minItem>=cartItems?.length){
                            if(item?.discount?.includes("%")){
                                const percent=parseFloat(item?.discount)/100
                                setCouponAmount(percent*totalAmount)
                            }
                            else{
                                setCouponAmount(parseInt(item?.discount))
                            }
                          }
                          else{
                            toast.error("")
                          }
                        }
                        else{
                                if(item?.discount?.includes("%")){
                                    const percent=parseFloat(item?.discount)/100
                                    setCouponAmount(percent*totalAmount)
                                }
                                else{
                                    setCouponAmount(parseInt(item?.discount))
                                }
                              
                        }
                    }
                    if(item?.discounttype==="order"){
                        if(item?.discount?.includes("%")){
                            const percent=parseFloat(item?.discount)/100
                            setCouponAmount(percent*totalAmount)
                        }
                        else{
                            setCouponAmount(parseInt(item?.discount))
                        }
                    }
                    toast.success("Coupon Code Applied")
                }
            }
            // else{
            //     toast.error("Invalid Coupon")
            // }
        })
    }
    // const standardClick=()=>{
    //     setShippingCost(0)
    //     setOrderType("Prepaid")
    //     setCouponAmount((totalAmount)/10)
    // }
    const codClick=()=>{
        setShippingCost(200)
        setOrderType("COD")
        setCouponAmount(0)
        setPayMethod("cod")
        toast.warn("Oops, you are missing top deals by selecting COD")
    }
    const bankClick=()=>{
        setShippingCost(0)
        setOrderType("Prepaid")
        setCouponAmount((totalAmount)/10)
        setPayMethod("bank")
    }
    const phonepeClick=()=>{
        setShippingCost(0)
        setOrderType("Prepaid")
        setCouponAmount((totalAmount)/10)
        setPayMethod("phonepe")
    }
    const hdfcClick=()=>{
        setShippingCost(0)
        setOrderType("Prepaid")
        setCouponAmount((totalAmount)/10)
        setPayMethod("hdfc")
    }
    useEffect (()=> {
        let sum=0;
        for(let index=0; index < cartItems?.length; index++){
            sum =sum+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
            setTotalAmount(sum)
        }
    },[cartItems])
    const [couponAmount,setCouponAmount]=useState()
useEffect(()=>{
setCouponAmount(totalAmount/10)
},[totalAmount])
    const finalAmount=shippingCost+totalAmount-couponAmount
    const dispatch=useDispatch();
   
    useEffect(()=>{
        dispatch(getAllCoupons())
    },[])

  
const completeOrder=()=>{
    if(firstname==="" || lastname==="" || email==="" || phone==="" || mobile==="" || address==="" || city==="" || state==="" || pincode===""){
        toast.info("Please Fill All Information")
    }
    else if(verified===false){
        toast.error("Please Verify First")
    }
    else{
            setPaySpin(true)
           localStorage.setItem("address",JSON.stringify({
            firstname:firstname,
            lastname:lastname,
            email:email,
            address:address,
            phone:normalizePhoneNumber(phone),
            mobile:mobile,
            city:city,
            state:state,
            pincode:pincode,
            isVarified:verified
           }))
           if(cartItems?.length>=1){
            setSuccess(true)
            setTimeout(()=>{
                checkOutHandler()
            },300)
           }
           
        }
    }




useEffect(()=>{
    let items=[]
    for (let index = 0; index < cartItems?.length; index++) {
        items.push({product:cartItems[index]?.product,quantity:cartItems[index].quantity,price:cartItems[index].price,color:cartItems[index].color,size:cartItems[index].size,sku:cartItems[index]?.product?.sku})
        
    }
    setCartProductState(items)
},[cartItems])
const [imageIndex, setImageIndex] = useState(0);

const handleImageError = () => {
  // Increment the image index to load the next image URL
  setImageIndex(prevIndex => prevIndex + 1);
};
const checkOutHandler=async(e)=>{
    if (orderType === "COD") {
        // If order type is COD, proceed with placing the order without opening Razorpay
        const data = {
            orderCreationId: "COD", // Set a placeholder value for order creation ID for COD orders
            razorpayPaymentId: "COD", // Set a placeholder value for Razorpay payment ID for COD orders
            razorpayOrderId: "COD", // Set a placeholder value for Razorpay order ID for COD orders
        };

        // Simulating a successful payment verification for COD orders
        await dispatch(createAnOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }))
        addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
        localStorage.removeItem('cart');

        navigate("/profile")
        setPaySpin(false)
       
        dispatch(resetState())
    }
    else{
        
       if(payMethod==="phonepe"){
        const data = {
            orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
            razorpayPaymentId: "Phonepe", // Set a placeholder value for Razorpay payment ID for COD orders
            razorpayOrderId: "Phonepe", // Set a placeholder value for Razorpay order ID for COD orders
        };
        localStorage.setItem("recentOrder", JSON.stringify({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }));

    axios.post("https://voguemine2.onrender.com/api/user/order/checkout",{amount:finalAmount,number:phone})
    .then(response=>{
        window.location.href=response.data
    })
    .catch(error=>{
        console.log(error)
    })


        // console.log(result)
// window.location.href=result.data.data.instrumentResponse.redirectInfo.url

       }
       if(payMethod==="hdfc"){
        const data = {
            orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
            razorpayPaymentId: "hdfc", // Set a placeholder value for Razorpay payment ID for COD orders
            razorpayOrderId: "hdfc", // Set a placeholder value for Razorpay order ID for COD orders
        };
        localStorage.setItem("recentOrder", JSON.stringify({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }));

    axios.post("https://voguemine2.onrender.com/api/user/order/hdfcPay",{amount:finalAmount})
    .then(response=>{
        window.location.href=response.data.payLink

    })
    .catch(error=>{
        console.log(error)
    })


        // console.log(result)
// window.location.href=result.data.data.instrumentResponse.redirectInfo.url

       }
       if(payMethod==="bank"){
const data = {
        orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
        razorpayPaymentId: "Prepaid", // Set a placeholder value for Razorpay payment ID for COD orders
        razorpayOrderId: "Prepaid", // Set a placeholder value for Razorpay order ID for COD orders
    };

    // Simulating a successful payment verification for COD orders

    await dispatch(createAnOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }))
    addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
    localStorage.removeItem('cart');

    navigate("/profile")
    setPaySpin(false)

    dispatch(resetState())
       }
    


     }
   
    

}


useEffect(()=>{
    localStorage.setItem("temp",JSON.stringify(
        {
            shippingInfo:{
        firstname:firstname,
        lastname:lastname,
        email:email,
        phone:normalizePhoneNumber(phone),
        address:address,
        city:city,
        state:state,
        pincode:pincode,
        mobile:mobile,},
        tag:"Voguemine",
                orderItems:cartProductState,
                totalPrice:totalAmount,
                shippingCost:shippingCost,
                orderType:orderType,
                discount:couponAmount,
                finalAmount:finalAmount,
                success:success
    }))
},[firstname,lastname,email,phone,mobile,address,city,state,pincode,cartProductState,success])
useEffect(() => {
    return () => {
        // Check if the current location is not '/profile'
        if (location.pathname !== '/profile') {
            const addr = JSON.parse(localStorage.getItem("temp"));

            // Check if there are cart items
            if (addr?.orderItems?.length > 0) {
                // Check if the order hasn't been successfully placed
                    // Create abandoned order
                    if (addr?.shippingInfo?.firstname !== "" && addr?.shippingInfo?.phone !== "" && addr?.success===false) {
                        dispatch(createAbondend(addr));
                    
                }
            }
        }
    };
}, [location]);
const [isRead,setIsread]=useState(false)
const initialTime = 120;

  // State to keep track of the remaining time
  const [timeLeft, setTimeLeft] = useState(initialTime);

    // Only set the interval if timeLeft is greater than 0
   

    const [intervalId, setIntervalId] = useState(null);

    
const sendOtps=async()=>{
    if(phone?.length<10){
        toast.info("Please Fill Correct Number")
    }
    else{
        setVerify("Verify")
    setNoneotp("block")
    await dispatch(sendOtp(normalizePhoneNumber(phone)))
    setTimeLeft(initialTime); // Reset the countdown timer

    // Clear any existing interval (safety check)
    if (intervalId) clearInterval(intervalId);

    // Start a new countdown timer
    const id = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
                clearInterval(id); // Stop the countdown timer when it reaches zero
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);
    setIntervalId(id);
    }

}

const verifyOtp=()=>{
    console.log(otpState,otp)

if(otpState?.otps===parseInt(otp)){
    setVerified(true)
    toast.success("VERIFIED")
    setIsread(true)
    

}
else{
    setVerified(false)
    setIsread(true)
    toast.error("Wrong OTP")
}
}
useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
        if (intervalId) clearInterval(intervalId);
    };
}, [intervalId]);
const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
    return (
        <div className='margin-section checkout'>
            <div className="left-form">
                <p className='section-heading'>Contact</p>
                    <div className="email input">
                        <TextField
                            label="Email*"
                            type="email"
                            name='email'
                            value={email} onChange={(e)=>setEmail(e.target.value)} 
                        />
                       
                    </div>
                    <p className="section-heading">Delivery</p>
                    <div className="name input">
                        <div>
                        <TextField
                            label="First Name*"
                            type="text"
                            name='firstname'
                            value={firstname} onChange={(e)=>setFirstname(e.target.value)}
                        />
                       
                        </div>                    
                    <div><TextField
                            label="Last Name*"
                            type="text"
                            name='lastname'
                            value={lastname} onChange={(e)=>setLastname(e.target.value)}
                        /> </div> 
                    </div>
                    <div className="address input">
                    <TextField
                            label="Address*"
                            type="text"
                            name='address'
                            value={address} onChange={(e)=>setAddress(e.target.value)}
                        /> 
                       
                    </div>
                    <div className="city input">
                    <div>
                    <TextField
                            label="City*"
                            type="text"
                            name='city'
                            value={city} onChange={(e)=>setCity(e.target.value)}
                        /> 
                        
                    </div>
                        <div><select name="state" placeholder="State"  value={state} onChange={(e)=>setState(e.target.value)}>
                            <option value="">State</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Orissa">Orissa</option>
                            <option value="Pondicherry">Pondicherry</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttaranchal">Uttaranchal</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                       
                        </div>
                        <div><TextField
                            label="Pin Code*"
                            type="number"
                            name='pincode'
                            value={pincode} onChange={(e)=>setPincode(e.target.value)}
                        /></div>
                    </div>
                    <div className="mobile input">

                    <FormControl>
                    <InputLabel htmlFor="standard-adornment-password">Phone</InputLabel>

                    <OutlinedInput
                    
                    style={{width:'100%',display:'grid',gridTemplateColumns:'11fr 1fr'}}
           type="number"
           name='phone'
           value={phone} onChange={(e)=>setPhone(e.target.value)}
           readOnly={isRead}
            endAdornment={
              <InputAdornment position="end">

                <IconButton
                style={{display:verified===true?"block":"none"}}
                  aria-label="toggle password visibility"
                  edge="end"
                >
                <VerifiedIcon className='v-tag'/>
                </IconButton>
              </InputAdornment>
            }
          />
                    </FormControl>
                    {/* <TextField
                            label="Phone*"
                            type="number"
                            name='phone'
                            value={phone} onChange={(e)=>setPhone(e.target.value)}
                            
                        />  */}
                        <div className='phone-veri' style={{display:verified===true?"none":"flex"}}>
                            <input type="number" value={otp} placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)}  style={{display:noneOtp}} maxLength={6}/>
                            {
                                timeLeft>0?                            <button onClick={verify === "SEND OTP" ? sendOtps : verifyOtp} >{verify}</button>
:
<button onClick={sendOtps} >SEND AGAIN</button>

                            }
                            {
                                timeLeft>0? <p style={{display:verify==="SEND OTP"?"none":"block"}}>Try Again in: {formatTime()}</p>:
""                            }
                           
                        </div>

                    </div>
                    <div className="alter-mobile input">
                    <TextField
                            label="Alternative Phone*"
                            type="number"
                            name='mobile'
                            value={mobile} onChange={(e)=>setMobile(e.target.value)}
                        /> 
                       
                    </div>
                    <div className="payment" style={{margin:'50px 0'}}>
                        <p className="section-heading">Payment</p>
                    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="razorpay"
        name="radio-buttons-group"
      >
        <div className="razorpay">
            <FormControlLabel value="razorpay" control={<Radio />} label="PhonePe Secure (UPI, Cards, Wallets, NetBanking)" disabled={false} onClick={phonepeClick}/>
            {/* <img src="https://axwon.com/wp-content/uploads/2021/03/Footer-payment-icons-1-1536x242-1.png" alt="" /> */}
            {/* <div className="bottom">
                <AddCardIcon style={{fontSize:'50px'}}/>
                <p>After clicking “Pay now”, you will be redirected to PhonePe Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
                <p style={{color:'red',marginTop:'10px',fontWeight:500}}>* Due to some Banking issues, we are unable to capture paid orders. Please continue shopping with Cash on Delivery. Sorry for the inconvenience</p>
            </div> */}
        </div>
        {/* <div className="razorpay">
            <FormControlLabel value="hdfc" control={<Radio />} label="HDFC Secure Payments" disabled={false} onClick={hdfcClick}/>
            <img src="https://axwon.com/wp-content/uploads/2021/03/Footer-payment-icons-1-1536x242-1.png" alt="" />
            <div className="bottom">
                <AddCardIcon style={{fontSize:'50px'}}/>
                <p>After clicking “Pay now”, you will be redirected to PhonePe Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
                <p style={{color:'red',marginTop:'10px',fontWeight:500}}>* Due to some Banking issues, we are unable to capture paid orders. Please continue shopping with Cash on Delivery. Sorry for the inconvenience</p>
            </div>
        </div> */}


<div className='razorpay'>
<FormControlLabel  value="cod" control={<Radio />} label="Cash on Delivery (Rs. 200)" onClick={codClick}/>

</div>

      </RadioGroup>
                    </div>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                        {
                            paySpin===true?<CircularProgress />:
                            <button className='pay' disabled={paySpin} onClick={completeOrder}>Complete</button>

                        }
                    
                    </div>
            </div>
            <div className="right-form">

                {
                    cartItems?.map((item,index)=>{
                        return(
                            <div className="prdt" key={index}>
                    <div className="detail">
                        <img src={modifyCloudinaryUrl(item?.product?.images[imageIndex]?.url)} alt="" onError={handleImageError}/>
                        <div><p className="p-name">{item?.product?.title}</p>
                        <p className="size"><span>{item?.size}</span><span>/</span><span>{item?.color}</span></p></div>
                    </div>
                    <p className="p-price">&#8377;{(item?.price)*(item?.quantity)}</p>
                    <p className="delete" onClick={() => removeFromCartAndUpdate(item.productId, item.color, item.size)}><DeleteIcon className='delete-icon'/></p>
                </div>
                        )
                    })
                }
                <div className="coupon">
                <input
                            id="coupon"
                            label="Coupon Code"
                            type="text"
                            value={coupon}
                            onChange={(e)=>setCoupon(e.target.value)}
                        />
                        <button onClick={applyCoupon}>APPLY</button>
                </div>
                <div className="total">
                    <ul>
                        <li>Subtotal</li>
                        <li>Shipping</li>
                        <li>Discount</li>
                        <li style={{fontSize:'20px',fontWeight:600}}>Total</li>
                    </ul>
                    <ul>
                        <li>&#8377; {totalAmount}</li>
                        <li>&#8377; {shippingCost!==0?shippingCost:`${shippingCost}(Free)`}</li>
                        <li>&#8377; -{couponAmount}</li>
                        <li style={{fontSize:'20px',fontWeight:600}}>&#8377; {finalAmount}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Checkout
