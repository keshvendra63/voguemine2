import React,{useEffect, useState} from 'react'
import './cart.css'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getUserCartProduct, removeFromCart, updateQuantityFromCart} from '../../features/user/userSlice'
import { toast } from 'react-toastify';
const Cart = () => {
    const customer=JSON.parse(localStorage.getItem("customer"))
const [cartItems, setCartItems] = useState([]);
const [productUpdateDetail,setproductUpdateDetail]=useState(null)
    const [totalAmount,setTotalAmount]=useState(null)
    useEffect(() => {
        // Retrieve cart items from localStorage
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartFromStorage);
    }, []);

    const handleQuantityChange = (productId, color, size, newQuantity) => {
        // Update the quantity for the item in the cart
        const updatedCartItems = cartItems?.map(item => {
            if (item?.productId === productId && item?.color === color && item?.size === size) {
                // Find the variant matching the color and size
                const updatedVariants = item?.product?.variants.map(variant => {
                    if (variant?.color === color && variant?.size === size) {
                        // If the new quantity is less than or equal to the variant quantity, update the quantity
                        if (newQuantity <= variant?.quantity) {
                            return { ...variant, quantity: newQuantity };
                        } else {
                            // If the new quantity exceeds the variant quantity, keep the quantity unchanged
                            return { ...variant };
                        }
                    }
                    return variant;
                });
    
                // Update the product variants with the updated variants
                return {
                    ...item,
                    product: {
                        ...item?.product,
                        variants: updatedVariants
                    }
                };
            }
            return item;
        });
    
        // Update localStorage with the updated cart items
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    
        // Update state to reflect the changes
        setCartItems(updatedCartItems);
    };

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
useEffect (()=> {
    let sum=0;
    for(let index=0; index < cartItems ?.length; index++){
        sum =sum+(Number(cartItems[index]?.quantity) *cartItems[index]?.price)
        setTotalAmount(sum)
    }
},[cartItems])

const checkoutClick=()=>{
    window.snaptr('track', 'START_CHECKOUT', 
        {'price':totalAmount, 
        'currency': 'INR', 
        'item_ids': [`${cartItems[0]?.product?._id}`], 
        'item_category': `${cartItems[0]?.product?.category}`, 
        'number_items': cartItems?.length, 
        'payment_info_available': 1, 
        'uuid_c1': `${cartItems[0]?.product?._id}`, 
       })
}
    return (
        <div className='cart'>
            <div className="category-banner">
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710505435/a34_pjehqe.jpg" alt="" />
            </div>
            <h1 style={{textAlign:'center',margin:'20px 0',fontSize:'30px',display:'flex',alignItems:'center',justifyContent:'center'}}><LocalMallIcon style={{fontSize:'30px',marginRight:'10px'}}/> My Cart</h1>
            {
               (cartItems?.length !== null || cartItems?.length !== 0)&&
                <div className="cart-content margin-section">
                <div className="left-cart">
                    <hr />
                    {
  cartItems?.map((item,index)=>{
    return(
                    <div className="cart-item" key={index}>
                        <div className="cartItem-left">
                            <Link to={`/products/${item?.product?.handle}`}>
                            <div className="prdt-img">
                                <img src={item?.product?.images[0]?.url} alt="" />
                            </div>
                            </Link>
                        </div>
                        <div className="cartItem-right">
                            <p className="prdt-name" style={{fontWeight:'bold'}}>{item?.product?.title}</p>
                            <div className="second-item">
                            <div className="size">
                                <p style={{fontWeight:500}}>Size:</p>
                                <p>{item?.size}</p>
                            </div>
                            <div className="size">
                                <p style={{fontWeight:500}}>Color:</p>
                                <p>{item?.color}</p>
                            </div>
                            <div className="quantity">
                                <p style={{fontWeight:500}}>Qty:</p>
                                <input type="number" name="" min={1} max={10} id=""  value={item?.quantity}
                                                onChange={(e) => handleQuantityChange(item?.productId,item?.color,item?.color, e.target.value)}/>
                            </div>
                            </div>
                            <p className="price" style={{marginTop:'20px',fontWeight:'bold'}}>Rs. {item?.price}</p>
                            <hr />
                            <p className='remove' onClick={() => removeFromCartAndUpdate(item.productId, item.color, item.size)}>Remove</p>
                        </div>
                        
                    </div>

                    )
                })
              }
                                  <hr/>
                    
                    <div className="total-items">
                        <p className="quantit" style={{fontWeight:'bold'}}>{cartItems?.length} Item</p>
                        <p style={{fontWeight:'bold'}}>Rs. <span>{totalAmount}</span></p>
                    </div>
                </div>
                <div className="checkouts">
                <p style={{fontWeight:'bold',color:'blue'}}>10% Instant Off on Prepaid Orders</p>
                <Link to="/checkout" >  <button className='checkout-btn' onClick={checkoutClick}>CHECKOUT</button></Link>
                </div>
                
                    
                    
            </div>
                    
                
            }
        </div>
    )
}

export default Cart
