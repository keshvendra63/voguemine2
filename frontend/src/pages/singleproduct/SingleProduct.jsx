import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAProduct,getAllProducts,rating, resetState } from '../../features/products/productSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './singleproduct.css'
import { addToCart, getUserCartProduct } from '../../features/user/userSlice'
import Product from '../../components/Product'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify'
const SingleProduct = () => {
  const { handle } = useParams()
  const limit=4
  const page=1
  const [pQuantity,setPQuantity]=useState()
  const [color,setColor]=useState(null)
  const [size,setSize]=useState(null)
  const [sold,setSold]=useState("none")
  const [quantity,setQuantity]=useState(1)
  const [alreadyAdded, setAlreadyAdded] =useState(false)
  const [mainImage,setMainImage]=useState("")
  const [btnDisable,setBtnDisable]=useState(false)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [msg,setMsg]=useState("")
  const [star,setStar]=useState(5)

  const navigate=useNavigate()
  const singleProductState=useSelector((state)=>state?.product?.getSingleProduct)
  const cart=JSON.parse(localStorage.getItem("cart"))
  const location =useLocation()
  const getProductId=location.pathname.split("/")[2];
  const collectionName=singleProductState?.collectionName
  const dispatch=useDispatch();

  useEffect(()=>{
      getProduct()      
  },[])
  useEffect(()=>{
    dispatch(resetState())
  },[resetState])
  const getProduct=()=>{
      
      dispatch(getUserCartProduct())
  }
  const productState=useSelector((state)=>state?.product?.product)
  useEffect(()=>{
    dispatch(getAProduct(handle))
      getProducts()
  },[limit,page,collectionName,handle])
  const getProducts=()=>{
      dispatch(getAllProducts({limit,page,collectionName,sort:"-createdAt"}))
  }
  const products=productState? productState:[]
   const customer=JSON.parse(localStorage.getItem("customer"))

  useEffect(()=>{
    for (let index = 0; index < cart?.length; index++) {
      if(getProductId===cart[index]?.productId?._id){
        setAlreadyAdded(true)
      }
      
    }
  })
  const addProductToCartLocalStorage = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const addTocart=async()=>{
    if(color===null){
      toast.error("Please Select Color")
      return false
    }
    if(size===null){
      toast.error("Please Select Size")
      return false
    }
    else{
      await addProductToCartLocalStorage({productId:getProductId,color,quantity,price:singleProductState?.price,size,product:singleProductState})
          toast.success("Added To Cart")
      window.fbq('track', 'AddToCart', {
        content_name:`${singleProductState?.title}`,
        content_category:`${singleProductState?.category}`,
        content_ids:`${singleProductState?._id}`,
        content_type: 'product',
        value:`${singleProductState?.price}`,
        currency: 'USD'
    });
      
      setTimeout(()=>{
        dispatch(getUserCartProduct())
      },1000)
    }
    
    
}
const buyNow=async()=>{
  if(color===null){
    toast.error("Please Select Color")
    return false
  }
  if(size===null){
    toast.error("Please Select Size")
    return false
  } 
 

  else{
    await addProductToCartLocalStorage({productId:getProductId,color,quantity,price:singleProductState?.price,size,product:singleProductState})
    toast.success("Added To Cart")   
     window.fbq('track', 'InitiateCheckout', {
      content_name:`${singleProductState?.title}`,
      content_category:`${singleProductState?.category}`,
      content_ids:`${singleProductState?._id}`,
      content_type: 'product',
      value:`${singleProductState?.price}`,
      currency: 'USD'
  });
    setTimeout(()=>{
      dispatch(getUserCartProduct())
      navigate('/checkout')
    },1000)
  }
  
  
}
const changeMainImage=(img)=>{
  setMainImage(img?.url)
}
const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // Increment the image index to load the next image URL
    setImageIndex(prevIndex => prevIndex + 1);
  };  

  const findVariant = (color, size) => {
    return singleProductState?.variants.find(variant => variant.color === color && variant.size === size);
  };
  useEffect(()=>{
    const matchingVariant = findVariant(color, size);
    setPQuantity(matchingVariant?.quantity) 
    if (matchingVariant?.quantity===0) {
        setBtnDisable(true)
        setSold("block")
         
    }
    else{
      setBtnDisable(false)
      setSold("none")

    }
  },[color,size])
  useEffect(() => {
    if (singleProductState?.variants) {
      const firstAvailableVariant = singleProductState?.variants?.find(variant => variant.quantity > 0);
      if (firstAvailableVariant) {
        setColor(firstAvailableVariant.color);
        setSize(firstAvailableVariant.size);
      }
      if(!firstAvailableVariant){
        setBtnDisable(true) 
      }

      const totalQuantity = singleProductState?.variants?.reduce((total, item) => total + item.quantity, 0);
      if (totalQuantity === 0) {
        setSold("block");
      } else {
        setSold("none");
      }
    }
  }, [singleProductState?.variants]);
  const incrementQuantity = () => {
    if (quantity < pQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  useEffect(() => {
    if (singleProductState?.metaTitle!=="" || singleProductState?.metaTitle!==undefined) {
        document.title = singleProductState?.metaTitle;
    }
    else{
      document.title =`${singleProductState?.title}`;
    }

}, [singleProductState?.metaTitle]);
useEffect(() => {
  if (singleProductState?.metaDesc!=="" || singleProductState?.metaDesc!==undefined) {
      document.querySelector('meta[name="description"]').setAttribute('content',singleProductState?.metaDesc);
  }
  else{
    document.querySelector('meta[name="description"]').setAttribute('content',singleProductState?.description);
  }

}, [singleProductState?.metaDesc]);

const commentPost=()=>{
  if(name==="" || email ==="" || msg===""){
    toast.info("Please Fill all the Fields")
  }
  else{
dispatch(rating({name:name,email:email,comment:msg,star:star,prodId:singleProductState?._id}))
  }
}
  return (
    <div className='single-product margin-section'>
      <div className="product">
        <div className="prdt-left">

            <div className="main">
            <img src={mainImage==""?singleProductState?.images[imageIndex]?.url : mainImage} alt="" onError={handleImageError}/>
            </div>
            <div className="thumbs">
                {
                  singleProductState?.images?.map((img,index)=>{
                      return <img src={img?.url} alt={singleProductState?.title} key={index} onClick={()=>changeMainImage(img)}/>
                    
                    
                  })
                }
            </div>
        </div>
        <div className="prdt-right">
            <p className="product-name">{singleProductState?.title}</p>
            <div style={{display:'flex',alignItems:'center'}}>
            <p className="prdt-price">&#8377;{singleProductState?.price}</p>
            <p style={{color:'grey',fontSize:'13px',textDecoration:'line-through',margin:'0 10px 0 10px'}}>{(singleProductState?.price)*2}</p>
            <p style={{display:sold,
            margin:'0 10px', 
            backgroundColor: 'rgb(37, 37, 37)',
    color: 'white',
    borderRadius: '4px',
    padding:'0px 10px',
    height: '24px'}}>Sold out</p>
            </div>
            <div className="size prdt-variation">
                <p>SIZE :</p>
                <ul>
                {
  singleProductState?.variants?.filter((item, index, arr) => arr.findIndex(i => i.size === item.size) === index)
                .map((item, index) => <li onClick={() => (setSize(item.size),setQuantity(1))} key={index} style={{border:item.size===size?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.size}</li>)
}
                </ul>
            </div>
            {
              alreadyAdded===false && <>
              <div className="color prdt-variation">
                <p>COLOR :</p>
                <ul>
                                           {
  singleProductState?.variants?.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() => (setColor(item.color),setQuantity(1))} key={index} style={{border:item.color===color?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.color}</li>)
}

                    
                </ul>
            </div>
              </>
            }
            {
              alreadyAdded===false && <>
              <div className="quantity">
<p onClick={decrementQuantity}><RemoveIcon className='qty-icon'/></p>
<p>{quantity}</p>
<p onClick={incrementQuantity}><AddIcon className='qty-icon'/></p>
            </div>
              </>
            }
            {
              sold==="block" ? <p style={{textAlign:'center',margin:"15px auto",color:'red',fontWeight:600,fontSize:'20px'}}>This size is not available</p>:
<div className="buy-btn">
                <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(singleProductState?._id)}} className={btnDisable?'disabled-btn':"btn"} disabled={btnDisable}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                <button className={btnDisable?'disabled-btn':"btn"} onClick={buyNow} disabled={btnDisable}>BUY IT NOW</button>
            </div>
            }
            
            <div className="prdt-desc">
                <p dangerouslySetInnerHTML={{ __html: singleProductState?.description }}/>
              
                
            </div>

        </div>
      </div>
<div className="ratings">
  <p style={{fontSize:'20px',fontWeight:500}}>Ratings</p>
  <div className="rating">
    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
    <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
    <Stack spacing={1} className="stars">
          <Rating name="size-small" value={star} size="medium" onChange={(e)=>setStar(e.target.value)}/>
        </Stack>
    <div className="msg">
<textarea name="" id="" onChange={(e)=>setMsg(e.target.value)} placeholder='Enter Message'></textarea>
    </div>
    <button onClick={commentPost}>Post</button>
  </div>
  <hr />

  {
    singleProductState?.ratings?.length>0 ?
<div className="ratingCount">
    <p style={{fontSize:'20px',fontWeight:500}}>What Our Customers Says.</p>
    {
      singleProductState?.ratings?.map((item,index)=>{
        return(
          <div className="rate">
      <div className="name">
      <p style={{fontWeight:500,marginBottom:0}}>{item?.name}</p>
      <Stack spacing={1} className="star" style={{fontSize:'25px',marginLeft:'20px'}}>
          <Rating name="size-small" value={item?.star} size="medium" onChange={(e)=>setStar(e.target.value)}/>
        </Stack>
      </div>
      <p style={{color:'grey',marginTop:'15px',fontSize:'14px'}}>{item?.comment}</p>
    </div>
        )
      })
    }
  </div>
  :
  ""
  }
  
</div>

      <p className='you-like'>YOU MAY ALSO LIKE</p>
      
      <div className="products-listing ">                

        <div className="product-list">
            {
                
                products.map((arm,index)=>{

                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle}/>
                   
                    
                })
            }
      
        </div>

      </div>
    </div>
  )
}

export default SingleProduct
