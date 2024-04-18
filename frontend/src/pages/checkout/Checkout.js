import React,{useState,useEffect} from 'react'
import './checkout.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AddCardIcon from '@mui/icons-material/AddCard';
import CircularProgress from '@mui/material/CircularProgress';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch,useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import { TextField } from '@mui/material';
import axios from 'axios'
import {config} from '../../utils/axiosConfig'  
import {createAnOrder, deleteCart, getUserCartProduct, resetState,createAbondend} from '../../features/user/userSlice'
import {getAllCoupons,getACoupon} from '../../features/coupon/couponSlice'
import { toast } from 'react-toastify';
import QR from '../../images/qr.jpg'


const Checkout = () => {

    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")

    const [email,setEmail]=useState("")

    const [phone,setPhone]=useState("")
    const [mobile,setMobile]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [state,setState]=useState("")
    const [pincode,setPincode]=useState("")

    const [cartItems, setCartItems] = useState([]);
const [ship,setShip]=useState({})
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
      const [paySpin,setPaySpin]=useState(false)
    const [totalAmount,setTotalAmount]=useState(null)
    const [orderType,setOrderType]=useState("COD")
    const [shippingCost,setShippingCost]=useState(200)
    const [discount,setDiscount]=useState(0)
    const [cartProductState,setCartProductState]=useState([])
    const [coupon,setCoupon]=useState("")
    const [couponAmount,setCouponAmount]=useState(0)
    const couponState=useSelector((state)=>state?.coupon?.coupon)
    const [payMethod,setPayMethod]=useState("cod")
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
            if(item?.name===coupon){
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

    const finalAmount=shippingCost+totalAmount-couponAmount
    const dispatch=useDispatch();
    useEffect (()=> {
        let sum=0;
        for(let index=0; index < cartItems?.length; index++){
            sum =sum+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
            setTotalAmount(sum)
        }
    },[cartItems])
    useEffect(()=>{
        dispatch(getAllCoupons())
    },[])
  
const completeOrder=()=>{
    if(firstname==="" || lastname==="" || email==="" || phone==="" || mobile==="" || address==="" || city==="" || state==="" || pincode===""){
        toast.info("Please Fill All Information")
    }
    else{
            setPaySpin(true)
           localStorage.setItem("address",JSON.stringify({
            firstname:firstname,
            lastname:lastname,
            email:email,
            address:address,
            phone:phone,
            mobile:mobile,
            city:city,
            state:state,
            pincode:pincode,
           }))
           if(cartItems?.length>=1){
            setTimeout(()=>{
                checkOutHandler()
            },300)
           }
           
        }
    }



const loadScript=(src)=>{
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

useEffect(()=>{
    let items=[]
    for (let index = 0; index < cartItems?.length; index++) {
        items.push({product:cartItems[index]?.product,quantity:cartItems[index].quantity,price:cartItems[index].price,color:cartItems[index].color,size:cartItems[index].size})
        
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
                localStorage.removeItem('cart');
        await dispatch(createAnOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }))
        addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
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
       if(payMethod==="bank"){
const data = {
        orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
        razorpayPaymentId: "Prepaid", // Set a placeholder value for Razorpay payment ID for COD orders
        razorpayOrderId: "Prepaid", // Set a placeholder value for Razorpay order ID for COD orders
    };

    // Simulating a successful payment verification for COD orders
            localStorage.removeItem('cart');

    await dispatch(createAnOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }))
    addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
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
        phone:phone,
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
                finalAmount:finalAmount
    }))
},[firstname,lastname,email,phone,mobile,address,city,state,pincode])
console.log(ship)
useEffect(() => {
    return () => {
        if (location.pathname!=='/profile') {
            console.log(ship)

            if(cartItems?.length>=0){
                const addr=JSON.parse(localStorage.getItem("temp"))
                if(addr?.firstname!=="" && addr?.phone!==""){
                    dispatch(createAbondend(addr))

                }
            }
        }
    };
}, [location]);



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
                    <TextField
                            label="Phone*"
                            type="number"
                            name='phone'
                            value={phone} onChange={(e)=>setPhone(e.target.value)}
                        /> 

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
        defaultValue="cod"
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


        <div className="banking">
        <FormControlLabel  value="bank" control={<Radio />} label="Scan QR or Pay using Bank Account details given below and  get Instant 10% Discount" onClick={bankClick}/>
            {
                payMethod==="bank"?
                <>
                <div className="qr">
                <img src={QR} alt="" />
            </div>
            <p style={{color:'red',marginTop:'10px',fontWeight:500,textAlign:'center',fontSize:'25px'}}>Payable: &#8377; {totalAmount-(totalAmount/10)}</p>
            <div className="bank">
                <p style={{fontWeight:600}}>Bank Details:</p>
                <p>Account Number: <span>50200091104371</span></p>
                <p>IFSC: <span>HDFC0000003</span></p>
            </div>
            <FormControlLabel  value="paid" control={<Radio />} label="Check If You Have Made Payment" onClick={bankClick} style={{fontWeight:500,margin:'5px 0'}}/>

            </>
            :
            ""
            }


        </div>


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
                        <img src={item?.product?.images[imageIndex]?.url} alt="" onError={handleImageError}/>
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
