import React,{useEffect,useState} from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist,getAProduct } from '../features/products/productSlice';
import {addToCart,getUserCartProduct} from '../features/user/userSlice'
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
const Product = (props) => {
  const addProductToCartLocalStorage = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = [...existingCart, product];
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};
const addProductToWishlistLocalStorage = (product) => {
  const existingCart = JSON.parse(localStorage.getItem("wishlist")) || [];
  const updatedCart = [...existingCart, product];
  localStorage.setItem("wishlist", JSON.stringify(updatedCart));
};
  const [fav,setFav]=useState("block")
const [red,setRed]=useState("")
    const [sold,setSold]=useState("none")
    const [color,setColor]=useState(null)
    const [size,setSize]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)

    const navigate=useNavigate()
    const dispatch=useDispatch();

    const wishlist=JSON.parse(localStorage.getItem("wishlist"))
    const cart=JSON.parse(localStorage?.getItem("cart"))
useEffect(()=>{
  wishlist?.map((item)=>{
    if(item?.productId===props.id){
      setRed("h")
    }
  })
},[wishlist])
useEffect(() => {
  if (!color || !size) {
    // If color or size is not selected, set alreadyAdded to false
    setAlreadyAdded(false);
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const matchingCartItem = cart.find(item => {
    return item?.productId === props?.id && item?.color === color && item?.size === size;
  });

  if (matchingCartItem) {
    // If a matching cart item is found, set alreadyAdded to true
    setAlreadyAdded(true);
  } else {
    // If no matching cart item is found, set alreadyAdded to false
    setAlreadyAdded(false);
  }
}, [color, size, props?.id]);
    const addTocart=async(data)=>{
      if(color===null){
        toast.error("Please Select Color")
        return false
      }
      else if(size===null){
        toast.error("Please Select Size")
        return false
      }
      else{
        
        if(data && (data===props.prdt._id)){
          window.snaptr('track', 'ADD_CART', 
          {'price': props?.price, 
          'currency': 'INR', 
          'item_ids': [`${data}`], 
          'item_category': `${props?.prdt?.category}`, 
          'number_items': 1, 
          'uuid_c1': `${data}`, 
         })
          await addProductToCartLocalStorage({productId:data,color,quantity,price:props.price,size,product:props.prdt})
          toast.success("Added To Cart")
          window.fbq('track', 'AddToCart', {
            content_name:`${props?.title}`,
            content_category: 'Product',
            content_ids:`${props?.id}`,
            content_type: 'product',
            value:`${props?.price}`,
            currency: 'INR'
        });
        setAlreadyAdded(true)

        }

       
      }
    } 
    const addToWish=async(data)=>{

     
      if(data && (data===props.prdt._id)){
        await addProductToWishlistLocalStorage({productId:data,color,quantity,price:props.price,size,product:props.prdt})
        toast.success("Added To Wishlist")
      }

      setFav("none")
 
  }

  const buyNow=async(data)=>{
    if(color===null){
      toast.error("Please Select Color")
      return false
    }
    if(size===null){
      toast.error("Please Select Size")
      return false
    }
    
    else{
      if(data && (data===props.prdt._id)){
        window.snaptr('track', 'START_CHECKOUT', 
        {'price': props?.prdt?.price, 
        'currency': 'INR', 
        'item_ids': [`${props?.prdt?._id}`], 
        'item_category': `${props?.prdt?.category}`, 
        'number_items': quantity, 
        'payment_info_available': 1, 
        'uuid_c1': `${props?.prdt?._id}`, 
        })
        await addProductToCartLocalStorage({productId:data,color,quantity,price:props.price,size,product:props.prdt})
        toast.success("Added To Cart")
        window.fbq('track', 'InitiateCheckout', {
          content_name:`${props?.title}`,
          content_category: 'Product',
          content_ids:`${props?.id}`,
          content_type: 'product',
          value:`${props?.price}`,
          currency: 'INR'
      });
     
      setTimeout(()=>{
        dispatch(getUserCartProduct())
        navigate('/checkout')
      },1000)
      }
      
     
    }
    
    
}
const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // Increment the image index to load the next image URL
    setImageIndex(prevIndex => prevIndex + 1);
  };
  const [btnDisable,setBtnDisable]=useState(false)

  const findVariant = (color, size) => {
    return props?.variants.find(variant => variant.color === color && variant.size === size);
  };



  useEffect(()=>{
    const matchingVariant = findVariant(color, size);
    if (matchingVariant?.quantity===0) {
        setBtnDisable(true)  
    }
    else{
      setBtnDisable(false)
    }
  },[color,size])
  useEffect(() => {
    if (props?.variants) {
      const firstAvailableVariant = props.variants.find(variant => variant.quantity > 0);
      if (firstAvailableVariant) {
        setColor(firstAvailableVariant.color);
        setSize(firstAvailableVariant.size);
      }
      if(!firstAvailableVariant){
        setBtnDisable(true) 
      }

      const totalQuantity = props.variants.reduce((total, item) => total + item.quantity, 0);
      if (totalQuantity === 0) {
        setSold("block");
      } else {
        setSold("none");
      }
    }
  }, [props.variants]);
 

  const [alt,setAlt]=useState("")
  useEffect(() => {
    if (props?.alt && props?.alt!=="") {
        setAlt(props?.alt)
    }
    else{
      setAlt(props?.title)
    }
  
  }, [props?.title,props?.alt]);
  return (
    <div className="product-card" key={props.keys}>

                <div className="product-img">
                <Link to={`/products/${props.handle}`}>
                  <img src={props?.img[imageIndex]?.url} alt={alt} className="product-img1" onError={handleImageError} />
                  
                  {
                    props?.img?.length>1 ?           <img src={props?.img[imageIndex+1]?.url} alt={alt} className="product-img2" onError={handleImageError}/>
:
""
                  }        
                
                </Link>
                {
                  red===""?                <p className="wish-icon" onClick={(e)=>{addToWish(props.id)}}><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
:
<p className="wish-icon"><FavoriteIcon className="cart-icon" style={{color:'red'}}/></p>

                }


                <p className='sold' style={{display:sold}}>Sold out</p>
                </div>
                <div className="product-content">
                  <Link to={`/products/${props.handle}`} className="title" style={{color:'black'}}><p >{props.title}</p></Link>
                  <p style={{fontSize:'13px',fontWeight:500}}>{props?.prdt?.sku}</p>

                  <Stack spacing={1} className="stars">
          <Rating name="size-small" value={5} size="small" />
    
        </Stack>
        <div className="wish">
        <div style={{display:'flex',alignItems:'center',marginTop:'10px'}}>
        <p className="price">&#8377;{props.price}</p>
        <p className="sale-price" style={{margin:'0 10px'}}>&#8377;{(props.price)*2}</p>

        </div>
        <div>
          {
            red===""?<FavoriteBorderOutlinedIcon className="cart-icon" onClick={(e)=>{addToWish(props.id)}}/>
            :
            <FavoriteIcon className="cart-icon" style={{color:'red'}}/>
          }
    
    {/* <AddShoppingCartOutlinedIcon className="cart-icon" onClick={(e)=>{addTocart(props.id)}}/> */}
        </div>
        </div>
                </div>

                <div className="hover-details">
    <div className="title-section">
    <div>
    <p className="title">{props.title}</p>
    <p style={{fontSize:'13px',fontWeight:500}}>{props?.prdt?.sku}</p>
    </div>
    <p className="price">&#8377;{props.price}</p>
    </div>
    <div className="size">
  <p>Sizes</p>
  <ul>
    {props.variants
      .filter(variant => variant.color === color) // Filter variants based on selected color
      .map((variant, index) => (
        <li
          key={index}
          onClick={() => {
            if (variant.quantity > 0) {
              setSize(variant.size);
            }
          }}
          style={{
            border: variant.size === size ? '2px solid black' : '1px solid grey',
            color: variant.size === size ? 'black' : 'rgb(122, 122, 122)',
            opacity:variant.quantity === 0 ? 0.5 : 1,
            textDecoration: variant.quantity === 0 ? 'line-through' : 'none' ,
            textDecorationThickness: variant.quantity === 0 ? '1px' : 'auto',
            pointerEvents: variant.quantity === 0 ? 'none' : 'auto', // Disable pointer events if quantity is 0
            // Make the line bold if quantity is 0
            // Apply line-through if quantity is 0
          }}
        >
          {variant.size}
        </li>
      ))}
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
    <button onClick={()=>{alreadyAdded?navigate('/checkout'):buyNow(props.id)}} style={{width:'100%'}} className={btnDisable?'btn-disable':"btn"} disabled={btnDisable}>{
                  alreadyAdded?"CHECKOUT":"BUY NOW"
                }</button>
    <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(props.id)}} style={{width:'100%'}} className={btnDisable?'btn-disable':"btn"} disabled={btnDisable}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
    </div>
                </div>
              </div>
  )
}

export default Product
