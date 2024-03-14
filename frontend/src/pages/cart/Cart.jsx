import React,{useEffect, useState} from 'react'
import './cart.css'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getUserCartProduct, removeFromCart, updateQuantityFromCart} from '../../features/user/userSlice'
import { toast } from 'react-toastify';
const Cart = () => {
    const customer=JSON.parse(localStorage.getItem("customer"))

    const [productUpdateDetail,setproductUpdateDetail]=useState(null)
    const [totalAmount,setTotalAmount]=useState(null)
    const dispatch=useDispatch();
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    useEffect(()=>{
      dispatch(getUserCartProduct())
    },[])
    useEffect(()=>{
if(productUpdateDetail!==null){
    if(customer==null){
        toast.error("Please Login First to Update Quantity")
      }
 else{     
    dispatch(updateQuantityFromCart({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
    setTimeout(()=>{
        dispatch(getUserCartProduct())

      },200)
}}
      },[productUpdateDetail])

    const carts=cartState?cartState:[]
    console.log(carts)
    const removeFromcart=(id)=>{
      dispatch(removeFromCart(id))
      setTimeout(()=>{
        dispatch(getUserCartProduct())

      },200)
      }
useEffect (()=> {
    let sum=0;
    for(let index=0; index < cartState ?.length; index++){
        sum =sum+(Number(cartState[index].quantity) *cartState[index].price)
        setTotalAmount(sum)
    }
},[cartState])
    return (
        <div className='cart'>
            <div className="cart-banner">
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710437939/featured_2_jgppuj.png" alt="" />
            </div>
            <h1 style={{textAlign:'center',margin:'20px 0',fontSize:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}><LocalMallIcon style={{fontSize:'30px',marginRight:'10px'}}/> My Cart</h1>
            {
               (cartState?.length !== null || cartState?.length !== 0)&&
                <div className="cart-content margin-section">
                <div className="left-cart">
                    <hr />
                    {
  carts?.map((item,index)=>{
    console.log(item)
    return(
                    <div className="cart-item" key={index}>
                        <div className="cartItem-left">
                            <div className="prdt-img">
                                <img src={item?.productId?.images[1]?.url} alt="" />
                            </div>
                        </div>
                        <div className="cartItem-right">
                            <p className="prdt-name" style={{fontWeight:'bold'}}>{item?.productId?.title}</p>
                            <div className="second-item">
                            <div className="size">
                                <p style={{fontWeight:500}}>Size:</p>
                                <p>{item.size}</p>
                            </div>
                            <div className="size">
                                <p style={{fontWeight:500}}>Color:</p>
                                <p>{item.color}</p>
                            </div>
                            <div className="quantity">
                                <p style={{fontWeight:500}}>Qty:</p>
                                <input type="number" name="" min={1} max={10} id="" onChange={(e)=>{setproductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}} value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity }/>
                            </div>
                            </div>
                            <p className="price" style={{marginTop:'20px',fontWeight:'bold'}}>Rs. {item?.price}</p>
                            <hr />
                            <p className='remove' onClick={()=>removeFromcart(item?._id)}>Remove</p>
                        </div>
                        
                    </div>

                    )
                })
              }
                                  <hr/>
                    
                    <div className="total-items">
                        <p className="quantit" style={{fontWeight:'bold'}}>{cartState?.length} Item</p>
                        <p style={{fontWeight:'bold'}}>Rs. <span>{totalAmount}</span></p>
                    </div>
                </div>
                <div className="checkouts">
                <p style={{fontWeight:'bold',color:'blue'}}>10% Instant Off on Prepaid Orders</p>
                <Link to="/checkout" >  <button className='checkout-btn'>CHECKOUT</button></Link>
                </div>
                
                    
                    
            </div>
                    
                
            }
        </div>
    )
}

export default Cart
