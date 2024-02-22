import React,{useEffect} from 'react'
import './cart.css'
import banner from '../../images/A21.jpg'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import prdt_img from '../../images/mens-premium-shirts.jpeg'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getUserCartProduct} from '../../features/user/userSlice'
import { addToCart } from '../../features/user/userSlice';

const Cart = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
      getCartFromDb()
    },[])
    const getCartFromDb=()=>{
        dispatch(getUserCartProduct())
    }
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const carts=cartState?cartState:[]
    const removeFromCart=(id)=>{
      dispatch(addToCart(id))
      setTimeout(()=>{
        dispatch(getUserCartProduct())
      },300)
    }
    return (
        <div className='cart'>
            <div className="cart-banner">
                <img src={banner} alt="" />
            </div>
            <h1 style={{textAlign:'center',margin:'20px 0',fontSize:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}><LocalMallIcon style={{fontSize:'30px',marginRight:'10px'}}/> My Cart</h1>
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
                                <select name="size">
                                    <option value="S">1</option>
                                    <option value="S">2</option>
                                    <option value="S">3</option>
                                    <option value="S">4</option>
                                    <option value="S">5</option>
                                    <option value="S">6</option>
                                    <option value="S">7</option>
                                    <option value="S">8</option>
                                </select>
                            </div>
                            </div>
                            <p className="price" style={{marginTop:'20px',fontWeight:'bold'}}>Rs. 1999</p>
                            <hr />
                            <p className='remove' onClick={()=>removeFromCart(item?._id)}>Remove</p>
                        </div>
                        
                    </div>

                    )
                })
              }
                                  <hr/>
                    
                    <div className="total-items">
                        <p className="quantit" style={{fontWeight:'bold'}}>2 Item</p>
                        <p style={{fontWeight:'bold'}}>Rs. <span>1999</span></p>
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
                    <button className='checkout-btn'><Link to="/home" >CHECKOUT</Link></button>
                    
                </div>
            </div>
        </div>
    )
}

export default Cart
