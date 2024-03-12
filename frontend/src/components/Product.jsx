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
  const customer=JSON.parse(localStorage.getItem("customer"))

    const [color,setColor]=useState(null)
    const [colorBorder,setColorBorder]=useState("")
    const [size,setSize]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const navigate=useNavigate()
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const location =useLocation()
    const getProductId=location.pathname.split("/")[2];
    const dispatch=useDispatch();

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
      if(customer==null){
        toast.error("Please Login First to Add to Cart")
        navigate("/home")
      }
      
      else{
        dispatch(addToCart({productId:props.id,color,quantity,price:props.price,size}))
      }
    } 
    const addToWish=(id)=>{
      if(customer==null){
        toast.error("Please Login First to Add to Wishlist")
      }
 else{

     
      dispatch(addToWishlist(id))
 }
  }

  const buyNow=()=>{
    if(color===null){
      toast.error("Please Select Color")
      return false
    }
    if(size===null){
      toast.error("Please Select Size")
      return false
    }
    if(customer==null){
      toast.error("Please Login First to Buy Now")
    }
    
    else{
      dispatch(addToCart({productId:props.id,color,quantity,price:props.price,size}))
      
      setTimeout(()=>{
        dispatch(getUserCartProduct())
        navigate('/checkout')
      },500)
    }
    
    
}
const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // Increment the image index to load the next image URL
    setImageIndex(prevIndex => prevIndex + 1);
  };

  return (
    <div className="product-card" key={props.keys}>
 <Link to={`/product/${props.id}`}>
                <div className="product-img">
                  <img src={props?.img[imageIndex]?.url} alt="" className="product-img1" onError={handleImageError}/>
                  
          <img src={props?.img[imageIndex+1]?.url} alt="" className="product-img2" onError={handleImageError}/>
        
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
    {/* <AddShoppingCartOutlinedIcon className="cart-icon" onClick={(e)=>{addTocart(props.id)}}/> */}
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
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index} style={{border:item.size===size?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.size}</li>)
}
      </ul>
    </div>
    <div className="color">
      <p>Colors</p>
      <ul>
      {
  props.variants.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() =>( setColor(item.color))} key={index} style={{border:item.color===color?'2px solid black':'1px solid grey',color:item.color===color?'black':'rgb(122, 122, 122)'}}>{item.color}</li>)
}
      
      </ul>
    </div>
    <div className="btns">
    <button onClick={buyNow} style={{width:'100%'}}>BUY NOW</button>
    <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(props.id)}} style={{width:'100%'}}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
    </div>
                </div>
              </div>
  )
}

export default Product
