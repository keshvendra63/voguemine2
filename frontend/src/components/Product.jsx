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

    const [color,setColor]=useState(null)
    const [size,setSize]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const navigate=useNavigate()
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const location =useLocation()
    const getProductId=location.pathname.split("/")[2];
    const dispatch=useDispatch();
 console.log(color,size)
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
      else if(size===null){
        toast.error("Please Select Size")
        return false
      }
      else{
        dispatch(addToCart({productId:props.id,color,quantity,price:props.price,size}))
      }
    } 
    const addToWish=(id)=>{
      dispatch(addToWishlist(id))
  }
  return (
    <div className="product-card" key={props.keys}>
 <Link to={`/product/${props.id}`}>
                <div className="product-img">
                  <img src={props?.img[0]?.url} alt="" className="product-img1"/>
                  {
          props?.img[1]?.url!==""?<img src={props?.img[1]?.url} alt="" className="product-img2"/>:<img src=
          "" alt="" className="product-img2"/>
        }
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
        <p className="sale-price">&#8377;{(props.price)*2}</p>
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
      {
  props.variants.filter((item, index, arr) => arr.findIndex(i => i.size === item.size) === index)
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index}>{item.size}</li>)
}
      </ul>
    </div>
    <div className="color">
      <p>Colors</p>
      <ul>
      {
  props.variants.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() => setColor(item.color)} key={index}>{item.color}</li>)
}
      
      </ul>
    </div>
    <Link to="#"><button>BUY NOW</button></Link>
    <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(props.id)}} style={{width:'100%',marginTop:'10px'}}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                </div>
              </div>
  )
}

export default Product
