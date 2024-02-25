import React,{useEffect,useState} from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist,getAProduct } from '../features/products/productSlice';
import {addToCart,getUserCartProduct} from '../features/user/userSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

import {Link} from 'react-router-dom'
const Product = (props) => {
    const addToWish=(id)=>{
        dispatch(addToWishlist(id))
    }

    const [color,setColor]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const navigate=useNavigate()
    const singleProductState=useSelector((state)=>state?.product?.getSingleProduct)
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const location =useLocation()
    const getProductId=location.pathname.split("/")[2];
    const dispatch=useDispatch();
    useEffect(()=>{
        getProduct()
    },[])
    const getProduct=()=>{
        dispatch(getAProduct(getProductId))
        dispatch(getUserCartProduct())
    }
    useEffect(()=>{
      for (let index = 0; index < cartState?.length; index++) {
        if(getProductId===cartState[index]?.productId?._id){
          setAlreadyAdded(true)
        }
        
      }
    })
    const addTocart=()=>{
      if(color===null){
        toast.error("Please Select Color")
        return false
      }
      else{
        dispatch(addToCart({productId:singleProductState?._id,color,quantity,price:singleProductState?.price}))
        navigate('/cart')
        setTimeout(()=>{
          dispatch(getUserCartProduct())
  
        },200)
      }
    }  
  return (
    <div className="product-card" key={props.key}>
    <Link to={`/product/${props.id}`}>
                <div className="product-img">
                  <img src={props.img} alt="" className="product-img1"/>
                  <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
                </div>
                </Link>
                <p className="wish-icon" onClick={(e)=>{addToWish(props.id)}}><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
                <div className="product-content">
                  <p className="title">{props.title}</p>
                  <Stack spacing={1} className="stars">
          <Rating name="size-small" defaultValue={5} size="small" />
    
        </Stack>
        <div className="wish">
        <div>
        <p className="price">&#8377;{props.price}</p>
        <p className="sale-price">&#8377;24000</p>
        </div>
        <div>
    <FavoriteBorderOutlinedIcon className="cart-icon" onClick={(e)=>{addToWish(props.id)}}/>
    <AddShoppingCartOutlinedIcon className="cart-icon" onClick={(e)=>{addTocart(props.id)}}/>
        </div>
        </div>
                </div>

                <div className="hover-details">
    <div className="title-section">
    <p className="title">{props.title}</p>
    <p className="price">&#8377;{props.price}</p>
    </div>
    <div className="size">
      <p>Sizes</p>
      <ul>
        <li>M</li>
        <li>L</li>
        <li>XL</li>
        <li>2XL</li>
        <li>3XL</li>
        <li>4XL</li>
        <li>5XL</li>
      </ul>
    </div>
    <div className="color">
      <p>Colors</p>
      <ul>
      <li onClick={()=>setColor(props.colors)}>{props.colors}</li>
      </ul>
    </div>
    <Link to="#"><button>BUY NOW</button></Link>
    <Link to="#"><button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart()}}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button></Link>
                </div>
              </div>
  )
}

export default Product
