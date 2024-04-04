import React,{useState,useEffect} from 'react'
import './checkout.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AddCardIcon from '@mui/icons-material/AddCard';
import img from '../../images/mens-premium-shirts.jpeg'
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch,useSelector } from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import { TextField } from '@mui/material';
  import axios from 'axios'
import {config} from '../../utils/axiosConfig'  
import {createAnOrder, deleteCart, getUserCartProduct, resetState} from '../../features/user/userSlice'
import {getAllCoupons,getACoupon} from '../../features/coupon/couponSlice'
import { toast } from 'react-toastify';
import QR from '../../images/qr.jpg'
  const shippingSchema=yup.object({
    firstname:yup.string().required("First Name is required"),
    lastname:yup.string().required("Last Name is required"),
    email:yup.string().required("Email is Required"),
    mobile:yup.number().required("Mobile number is required"),
    address:yup.string().required("Address Name is required"),
    city:yup.string().required("City Name is required"),
    state:yup.string().required("State Name is required"),
    pincode:yup.number().required("Pin Code Name is required"),
    phone:yup.number().required("Alternative Phone Name is required"),
  })

const Checkout = () => {
    const addProductToOrderLocalStorage = (product) => {
        const existingOrder = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrder = [...existingOrder, product];
        localStorage.setItem("orders", JSON.stringify(updatedOrder));
      };
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount,setTotalAmount]=useState(null)
    const [orderType,setOrderType]=useState("COD")
    const [shippingCost,setShippingCost]=useState(200)
    const [discount,setDiscount]=useState(0)
    const [cartProductState,setCartProductState]=useState([])
    const [coupon,setCoupon]=useState("")
    const [couponAmount,setCouponAmount]=useState(0)
    const couponState=useSelector((state)=>state?.coupon?.coupon)
    useEffect(() => {
        // Retrieve cart items from localStorage
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartFromStorage);

    }, []);
    
    const removeFromCartAndUpdate = (productIdToRemove) => {
        // Filter out the item to remove
        const updatedCartItems = cartItems.filter(item => item.productId !== productIdToRemove);

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
    }
    const bankClick=()=>{
        setShippingCost(0)
        setOrderType("Prepaid")
        setCouponAmount((totalAmount)/10)

    }

    const finalAmount=shippingCost+totalAmount-couponAmount
    const dispatch=useDispatch();
    const navigate=useNavigate()
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
    const formik = useFormik({
        initialValues: {
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          phone: ""
        },
        validationSchema: shippingSchema,
        onSubmit:(values) => {
           localStorage.setItem("address",JSON.stringify(values))
           if(cartItems?.length>=1){
            setTimeout(()=>{
                checkOutHandler()
            },300)
           }
           
        }
      });



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
        items.push({product:cartItems[index]?.product,quantity:cartItems[index].quantity,price:cartItems[index].price,color:cartItems[index].color,size:cartItems[0].size})
        
    }
    setCartProductState(items)
},[cartItems])
const [imageIndex, setImageIndex] = useState(0);

const handleImageError = () => {
  // Increment the image index to load the next image URL
  setImageIndex(prevIndex => prevIndex + 1);
};
const checkOutHandler=async()=>{
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
        setCartItems([])
        navigate("/profile")
        window.fbq('track', 'InitiateCheckout', {
            content_name: 'Checkout',
            content_category: 'Page',
            content_ids: 'Checkout Page',
            content_type: 'page',
            value:`${finalAmount}`,
            currency: 'USD'
        });
        localStorage.removeItem("address")
        dispatch(resetState())
    }
    else{
    //     const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    //     if(!res){
    //        alert("Razorpay SDK failed to load")
    //        return
    //     }
    //     const result=await axios.post("https://probable-halibut-r94v5r7gwjrhxgvj-5000.preview.app.github.dev/api/user/order/checkout",{amount:finalAmount},config)
    //     if(!result){
    //        alert("Something went wrong")
    //        return
    //     }
       
    //     const {amount,id:order_id,currency}=result.data.order
    //     const options = {
    //        key: "rzp_test_DeWbJCwx392j0T", // Enter the Key ID generated from the Dashboard
    //        amount: amount,
    //        currency: currency,
    //        name: "Voguemine",
    //        description: "Voguemine Payment",
    //        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfisT9A6XILZ3k7Gdg8hsJ1Xds88qRlXTbhc8AtBsng&s",
    //        order_id: order_id,
    //        handler: async function (response) {
    //            const data = {
    //                orderCreationId: order_id,
    //                razorpayPaymentId: response.razorpay_payment_id,
    //                razorpayOrderId: response.razorpay_order_id,
       
    //            };
       
    //            const result = await axios.post("https://probable-halibut-r94v5r7gwjrhxgvj-5000.preview.app.github.dev/api/user/order/paymentVerification", data,config);
    //        await dispatch(createAnOrder({totalPrice:totalAmount,finalAmount:finalAmount,shippingCost:shippingCost,orderType:orderType,discount:couponAmount,orderItems:cartProductState,paymentInfo:result.data,shippingInfo:JSON.parse(localStorage.getItem("address")),tag:"Voguemine"}))
    //        addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
    //        localStorage.removeItem('cart');
    //        setCartItems([])
    //        navigate("/profile")
    //        localStorage.removeItem("address")
    //        dispatch(resetState())
    //        window.fbq('track', 'InitiateCheckout', {
    //         content_name: 'Checkout',
    //         content_category: 'Page',
    //         content_ids: 'Checkout Page',
    //         content_type: 'page',
    //         value:`${finalAmount}`,
    //         currency: 'USD'
    //     });
       
    //        },
    //        prefill: {
    //            name: "Voguemine",
    //            email: "info@voguemine.com",
    //            contact: "6306492433",
    //        },
    //        notes: {
    //            address: "Voguemine Premium Quality Clothes",
    //        },
    //        theme: {
    //            color: "#61dafb",
    //        },
    //    };
       
    //    const paymentObject = new window.Razorpay(options);
    //    paymentObject.open();




    const data = {
        orderCreationId: "Prepaid", // Set a placeholder value for order creation ID for COD orders
        razorpayPaymentId: "Prepaid", // Set a placeholder value for Razorpay payment ID for COD orders
        razorpayOrderId: "Prepaid", // Set a placeholder value for Razorpay order ID for COD orders
    };

    // Simulating a successful payment verification for COD orders
    await dispatch(createAnOrder({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" }))
    addProductToOrderLocalStorage({ totalPrice: totalAmount, finalAmount: finalAmount, shippingCost: shippingCost, orderType: orderType, discount: couponAmount, orderItems: cartProductState, paymentInfo: data, shippingInfo: JSON.parse(localStorage.getItem("address")),tag:"Voguemine" })
    localStorage.removeItem('cart');
    setCartItems([])
    navigate("/profile")
    window.fbq('track', 'InitiateCheckout', {
        content_name: 'Checkout',
        content_category: 'Page',
        content_ids: 'Checkout Page',
        content_type: 'page',
        value:`${finalAmount}`,
        currency: 'USD'
    });
    localStorage.removeItem("address")
    dispatch(resetState())


       }
   
    

}
    return (
        <div className='margin-section checkout'>
            <div className="left-form">
                <p className='section-heading'>Contact</p>
                <form action="" onSubmit={formik.handleSubmit} >
                    <div className="email input">
                        <TextField
                            label="Email"
                            type="email"
                            name='email'
                            value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}
                        />
                        <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                    </div>
                    <p className="section-heading">Delivery</p>
                    <div className="name input">
                        <div>
                        <TextField
                            label="First Name"
                            type="text"
                            name='firstname'
                            value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}
                        />
                        <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                        </div>                    
                    <div><TextField
                            label="Last Name"
                            type="text"
                            name='lastname'
                            value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}
                        /> <div className="error">
                        {formik.touched.lastname && formik.errors.lastname}
                      </div></div> 
                    </div>
                    <div className="address input">
                    <TextField
                            label="Address"
                            type="text"
                            name='address'
                            value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")}
                        /> 
                        <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
                    </div>
                    <div className="city input">
                    <div>
                    <TextField
                            label="City"
                            type="text"
                            name='city'
                            value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")}
                        /> 
                        <div className="error">
                  {formik.touched.city && formik.errors.city}
                </div>
                    </div>
                        <div><select name="state" placeholder="State"  value={formik.values.state} onChange={formik.handleChange("state")} onBlur={formik.handleBlur("state")}>
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
                            <option value="Tripura">Tripura</option>
                            <option value="Uttaranchal">Uttaranchal</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                        <div className="error">
                  {formik.touched.state && formik.errors.state}
                </div>
                        </div>
                        <div><TextField
                            label="Pin Code"
                            type="number"
                            name='pincode'
                            value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")}
                        /> <div className="error">
                        {formik.touched.pincode && formik.errors.pincode}
                      </div></div>
                    </div>
                    <div className="mobile input">
                    <TextField
                            label="Phone"
                            type="number"
                            name='phone'
                            value={formik.values.phone} onChange={formik.handleChange("phone")} onBlur={formik.handleBlur("phone")}
                        /> <div className="error">
                        {formik.touched.phone && formik.errors.phone}
                      </div>

                    </div>
                    <div className="alter-mobile input">
                    <TextField
                            label="Alternative Phone"
                            type="number"
                            name='mobile'
                            value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}
                        /> 
                        <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                    </div>
                    <div className="payment" style={{margin:'50px 0'}}>
                        <p className="section-heading">Payment</p>
                    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="cod"
        name="radio-buttons-group"
      >
        <div className="razorpay">
            <div className="up">
            <FormControlLabel value="razorpay" control={<Radio />} label="Razorpay Secure (UPI, Cards, Wallets, NetBanking)" disabled={true}/>
            <img src="https://axwon.com/wp-content/uploads/2021/03/Footer-payment-icons-1-1536x242-1.png" alt="" />
            </div>
            <div className="bottom">
                <AddCardIcon style={{fontSize:'50px'}}/>
                <p>After clicking “Pay now”, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
                <p style={{color:'red',marginTop:'10px',fontWeight:500}}>* Due to some Banking issues, we are unable to capture paid orders. Please continue shopping with Cash on Delivery. Sorry for the inconvenience</p>
            </div>
        </div>


        <div className="banking">
            <p style={{color:'black',fontWeight:600,fontSize:'19px'}}>Scan QR or Pay using Bank Account details given below and  get Instant 10% Discount</p>
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


        </div>




        <FormControlLabel  value="cod" control={<Radio />} label="Cash on Delivery (Rs. 200)" onClick={codClick}/>
      </RadioGroup>
                    </div>
                    <div>
                    <input type="submit" value="Place Order" className='pay'/>
                    
                    </div>
                </form>
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
                    <p className="delete" onClick={() => removeFromCartAndUpdate(item.productId)}><DeleteIcon className='delete-icon'/></p>
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
