import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAProduct,getAllProducts } from '../../features/products/productSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './singleproduct.css'
import { addToCart, getUserCartProduct } from '../../features/user/userSlice'
import Product from '../../components/Product'

import {toast} from 'react-toastify'
const SingleProduct = () => {
  const { handle } = useParams()
  const limit=3
  const page=1
  const [color,setColor]=useState(null)
  const [size,setSize]=useState(null)
  const [sold,setSold]=useState("none")

  const [quantity,setQuantity]=useState(1)
  const [alreadyAdded, setAlreadyAdded] =useState(false)
  const [mainImage,setMainImage]=useState("")
  const [btnDisable,setBtnDisable]=useState(false)
  const navigate=useNavigate()
  const singleProductState=useSelector((state)=>state?.product?.getSingleProduct)
  const cartState=useSelector((state)=>state?.auth?.cartProducts)
  const location =useLocation()
  const getProductId=location.pathname.split("/")[2];
  const collectionName=singleProductState?.collectionName
  const dispatch=useDispatch();
  useEffect(()=>{
      getProduct()
  },[])
  const getProduct=()=>{
      
      dispatch(getUserCartProduct())
  }
  const productState=useSelector((state)=>state?.product?.product)
  useEffect(()=>{
    dispatch(getAProduct(handle))
      getProducts()
  },[limit,page,collectionName,handle])
  const getProducts=()=>{
      dispatch(getAllProducts({limit,page,collectionName}))
  }
  const products=productState? productState:[]
   const customer=JSON.parse(localStorage.getItem("customer"))

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
    if(size===null){
      toast.error("Please Select Size")
      return false
    }
    if(customer==null){
      toast.error("Please Login First to Add to Cart")
      navigate("/login")
    }
    
    else{
      dispatch(addToCart({productId:singleProductState?._id,color,quantity,price:singleProductState?.price,size}))
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
        navigate('/cart')
      },500)
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
   toast.error("Please Login First to Buy")
   navigate("/login")

 }
 

  else{
    dispatch(addToCart({productId:singleProductState?._id,color,quantity,price:singleProductState?.price,size}))
    window.fbq('track', 'Purchase', {
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
    },500)
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
    if (matchingVariant?.quantity===0) {
        setBtnDisable(true)  
    }
    else{
      setBtnDisable(false)
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
 
  
  return (
    <div className='single-product'>
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
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index} style={{border:item.size===size?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.size}</li>)
}
                </ul>
            </div>
            {
              alreadyAdded===false && <>
              <div className="color prdt-variation">
                <p>COLOR :</p>
                <ul>
                  {/* {
                    singleProductState?.map((item,index)=>{
                      return(
                        <li onClick={()=>setColor(item?._id)} style={{backgroundColor:'red'}} key={index}></li>
                      )
                    })
                  } */}
                                           {
  singleProductState?.variants?.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() => setColor(item.color)} key={index} style={{border:item.color===color?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.color}</li>)
}

                    
                </ul>
            </div>
              </>
            }
            {
              alreadyAdded===false && <>
              <div className="quantity">
                <input type="number" name="" min={1} max={10} id="" onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>
            </div>
              </>
            }
            <div className="buy-btn">
                <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(singleProductState?._id)}} className={btnDisable?'disabled-btn':"btn"} disabled={btnDisable}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                <button className={btnDisable?'disabled-btn':"btn"} onClick={buyNow} disabled={btnDisable}>BUY IT NOW</button>
            </div>
            <div className="prdt-desc">
                <p dangerouslySetInnerHTML={{ __html: singleProductState?.description }}/>
              
                
            </div>

        </div>
      </div>
      <p className='you-like'>YOU MAY ALSO LIKE</p>
      
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
                

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
