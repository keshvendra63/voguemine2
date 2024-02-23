import React,{useEffect, useState} from 'react'
import './cart.css'
import banner from '../../images/A21.jpg'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getUserCartProduct, removeFromCart, updateQuantityFromCart} from '../../features/user/userSlice'

const Cart = () => {
    const [productUpdateDetail,setproductUpdateDetail]=useState(null)
    const [totalAmount,setTotalAmount]=useState(null)
    const dispatch=useDispatch();
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    useEffect(()=>{
      dispatch(getUserCartProduct())
    },[])
    useEffect(()=>{
if(productUpdateDetail!==null){
    dispatch(updateQuantityFromCart({cartItemId:productUpdateDetail?.cartItemId,quantity:productUpdateDetail?.quantity}))
    setTimeout(()=>{
        dispatch(getUserCartProduct())

      },200)
}
      },[productUpdateDetail])

    const carts=cartState?cartState:[]
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
                <img src={banner} alt="" />
            </div>
            <h1 style={{textAlign:'center',margin:'20px 0',fontSize:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}><LocalMallIcon style={{fontSize:'30px',marginRight:'10px'}}/> My Cart</h1>
            {
               (cartState?.length !== null || cartState?.length !== 0)&&
                <div className="cart-content container">
                <div className="left-cart">
                    <hr />
                    {
  carts?.map((item,index)=>{
    return(
                    <div className="cart-item" key={index}>
                        <div className="cartItem-left">
                            <div className="prdt-img">
                                <img src={item?.img_src} alt="" />
                            </div>
                        </div>
                        <div className="cartItem-right">
                            <p className="prdt-name" style={{fontWeight:'bold'}}>{item?.Title}</p>
                            <div className="second-item">
                            <div className="size">
                                <p>Size:</p>
                                <select name="size">
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                    <option value="4XL">4XL</option>
                                    <option value="5XL">5XL</option>
                                </select>
                            </div>
                            <div className="quantity">
                                <p>Qty:</p>
                                <input type="number" name="" min={1} max={10} id="" onChange={(e)=>{setproductUpdateDetail({cartItemId:item?._id,quantity:e.target.value})}} value={productUpdateDetail?.quantity ? productUpdateDetail?.quantity : item?.quantity }/>
                            </div>
                            </div>
                            <p className="price" style={{marginTop:'20px',fontWeight:'bold'}}>Rs. 1999</p>
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
                <div className="right-cart">
                    <div className="discountcode">
                        <p>Enter Discount Code</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Discount Code"
                                aria-label="Discount Code"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-secondary" id="button-addon2">
                                APPLY
                            </Button>
                        </InputGroup>

                    </div>
                    <div className="total-details">
                        <div className="left">
                            <p>Shipping Cost</p>
                            <p>Discount</p>
                            <p>TAX</p>
                            <p style={{fontWeight:'bold'}}>Estimated Total</p>
                        </div>
                        <div className="right">
                            <p>Rs. 200</p>
                            <p>Rs. -200</p>
                            <p>0</p>
                            <p style={{fontWeight:'bold'}}>Rs. 3499</p>
                        </div>
                    </div>
                    <p style={{fontWeight:'bold',color:'blue'}}>10% Instant Off on Prepaid Orders</p>
                    <button className='checkout-btn'><Link to="/checkout" >CHECKOUT</Link></button>
                    
                </div>
            </div>
                    
                
            }
        </div>
    )
}

export default Cart
