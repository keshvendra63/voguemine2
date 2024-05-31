import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAProduct,getAllProducts,rating, resetState } from '../../features/products/productSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import './singleproduct.css'
import { addToCart, getUserCartProduct } from '../../features/user/userSlice'
import Product from '../../components/Product'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify'
import Carousel from 'react-bootstrap/Carousel';
import StraightenIcon from '@mui/icons-material/Straighten';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import img from '../../images/women.jpg'
import CloseIcon from '@mui/icons-material/Close';
import img1 from '../../images/1.jpg'
import img2 from '../../images/2.jpg'
import img3 from '../../images/3.jpg'
import img4 from '../../images/4.jpg'
import img5 from '../../images/5.jpg'
import img6 from '../../images/6.jpg'
import img7 from '../../images/7.jpg'
import img8 from '../../images/8.jpg'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SingleProduct = () => {
  const [open, setOpen] =useState(false);
const [chart,setChart]=useState("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    
  };
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
  if(singleProductState?.collectionName==="Men's Loafers"){
setChart(img1)
  }

    else if(singleProductState?.collectionName==="Men's Denim Jeans"){
      setChart(img2)

    }
    
    else if(singleProductState?.collectionName==="Men's Premium Shirts"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Premium T Shirts"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Sweatshirts"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Slippers"){
      setChart(img1)

    }
    
    else if(singleProductState?.collectionName==="Men's Sneakers"){
      setChart(img1)
    }
    
    else if(singleProductState?.collectionName==="Men's Hoodies"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Trackpants"){
      setChart(img2)

    }
    
    else if(singleProductState?.collectionName==="Men's Co-ord Set"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Premium Shorts"){
      setChart(img3)

    }
    
    else if(singleProductState?.collectionName==="Men's Jackets"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Women's Co-ord set"){
      setChart(img8)

    }
    
    else if(singleProductState?.collectionName==="Kid's T-Shirts"){

    }
    
        
    else if(singleProductState?.collectionName==="Kids Shirts"){

    }
    
    else if(singleProductState?.collectionName==="men,s combos"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Women's T-Shirt"){
      setChart(img8)

    }
    
    else if(singleProductState?.collectionName==="Men's Pullover"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Men's Track Set"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Kids Tracksuit"){

    }
    
    else if(singleProductState?.collectionName==="Women's Dresses"){
      setChart(img5)

    }
    
    else if(singleProductState?.collectionName==="Flat Sandals"){
      setChart(img6)

    }
    
    else if(singleProductState?.collectionName==="Kid's Girl co-ord Set"){

    }
        
    else if(singleProductState?.collectionName==="Women's Sandals "){
      setChart(img6)

    }
    
    else if(singleProductState?.collectionName==="Kids Hoodies"){

    }
    
    else if(singleProductState?.collectionName==="Womens'Jackets"){
      setChart(img8)

    }
    
    else if(singleProductState?.collectionName==="Kid's Jackets"){

    }
    
    else if(singleProductState?.collectionName==="Women's Pullovers"){
      setChart(img8)

    }
        
    else if(singleProductState?.collectionName==="Kid's Co-Ord Sets"){

    }
    
    else if(singleProductState?.collectionName==="Heeled Sandals"){
      setChart(img6)

    }
    
    else if(singleProductState?.collectionName==="Boy's Cord-Set"){

    }
    
    else if(singleProductState?.collectionName==="Women's Track Sets"){
      setChart(img8)

    }
    
    else if(singleProductState?.collectionName==="Kid Girl's Dress"){

    }
    
    
    else if(singleProductState?.collectionName==="Women's Legging"){
      setChart(img7)

    }
    
    else if(singleProductState?.collectionName==="Women's Sweatshirts"){
      setChart(img8)

    }
    
    else if(singleProductState?.collectionName==="Men's Combos"){
      setChart(img4)

    }
    
    else if(singleProductState?.collectionName==="Women's Winter Coats"){
      setChart(img8)

    }
        
    else if(singleProductState?.collectionName==="Men's Premium Half Sleeve Shirt"){
      setChart(img4)

    }
})
      useEffect(() => {
       if (!color || !size) {
         // If color or size is not selected, set alreadyAdded to false
         setAlreadyAdded(false);
         return;
       }
     
       const cart = JSON.parse(localStorage.getItem("cart")) || [];
       const matchingCartItem = cart.find(item => {
         return item.product._id === singleProductState?._id && item?.color === color && item?.size === size;
       });
     
       if (matchingCartItem) {
         // If a matching cart item is found, set alreadyAdded to true
         setAlreadyAdded(true);
       } else {
         // If no matching cart item is found, set alreadyAdded to false
         setAlreadyAdded(false);
       }
     }, [color, size,getProductId]);
  const addProductToCartLocalStorage = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const addTocart=async(data)=>{
    if(color===null){
      toast.error("Please Select Color")
      return false
    }
    if(size===null){
      toast.error("Please Select Size")
      return false
    }
    else{
      window.snaptr('track', 'ADD_CART', 
          {'price': singleProductState?.price, 
          'currency': 'INR', 
          'item_ids': [`${data}`], 
          'item_category': `${singleProductState?.category}`, 
          'number_items': 1, 
          'uuid_c1': `${data}`, 
         })
      await addProductToCartLocalStorage({productId:data,color,quantity,price:singleProductState?.price,size,product:singleProductState})
          toast.success("Added To Cart")
      window.fbq('track', 'AddToCart', {
        content_name:`${singleProductState?.title}`,
        content_category:`${singleProductState?.category}`,
        content_ids:`${singleProductState?._id}`,
        content_type: 'product',
        value:`${singleProductState?.price}`,
        currency: 'INR'
    });
    setAlreadyAdded(true)
      
      setTimeout(()=>{
        dispatch(getUserCartProduct())
      },1000)
    }
    
    
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
    window.snaptr('track', 'START_CHECKOUT', 
        {'price': singleProductState?.price, 
        'currency': 'INR', 
        'item_ids': [`${singleProductState?._id}`], 
        'item_category': `${singleProductState?.category}`, 
        'number_items': quantity, 
        'payment_info_available': 1, 
        'uuid_c1': `${singleProductState?._id}`, 
       })
    await addProductToCartLocalStorage({productId:data,color,quantity,price:singleProductState?.price,size,product:singleProductState})
    toast.success("Added To Cart")   
     window.fbq('track', 'InitiateCheckout', {
      content_name:`${singleProductState?.title}`,
      content_category:`${singleProductState?.category}`,
      content_ids:`${singleProductState?._id}`,
      content_type: 'product',
      value:`${singleProductState?.price}`,
      currency: 'INR'
  });
    setTimeout(()=>{
      dispatch(getUserCartProduct())
      navigate('/checkout')
    },1000)
  }
  
  
}
const changeMainImage=(img)=>{
  setMainImage(img?.url)

  setTimeout(()=>{
    setMainImage("")
  },5000)
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
  useEffect(()=>{
    window.fbq('track', 'ViewContent', {
      content_name: `${singleProductState?.title}`,
      content_category:`${singleProductState?.category}`,
      content_ids: `${singleProductState?._id}`,
      content_type: 'product',
      value:singleProductState?.price,
      currency: 'INR'
     });
  },[singleProductState])
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
    if (singleProductState?.metaTitle!=="") {
        document.title = singleProductState?.metaTitle;
    }
    else{
      document.title =singleProductState?.title;
    }

}, [singleProductState?.metaTitle,singleProductState?.title]);
useEffect(() => {
  if (singleProductState?.metaDesc!=="") {
      document.querySelector('meta[name="description"]').setAttribute('content',singleProductState?.metaDesc);
  }
  else{
    document.querySelector('meta[name="description"]').setAttribute('content',document.createElement('div').innerHTML = singleProductState?.description );
  }

}, [singleProductState?.metaDesc,singleProductState?.description]);

const commentPost=()=>{
  if(name==="" || email ==="" || msg===""){
    toast.info("Please Fill all the Fields")
  }
  else{
dispatch(rating({name:name,email:email,comment:msg,star:star,prodId:singleProductState?._id}))
setTimeout(()=>{
setMsg("")
setName("")
setEmail("")
},1000)
  }
}
const cart=JSON.parse(localStorage.getItem("cart"))
useEffect(() => {
  if (!color || !size) {
    // If color or size is not selected, set alreadyAdded to false
    setAlreadyAdded(false);
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const matchingCartItem = cart.find(item => {
    return item.productId === singleProductState?._id && item.color === color && item.size === size;
  });

  if (matchingCartItem) {
    // If a matching cart item is found, set alreadyAdded to true
    setAlreadyAdded(true);
  } else {
    // If no matching cart item is found, set alreadyAdded to false
    setAlreadyAdded(false);
  }
}, [color, size, singleProductState]);
const [loading,setLoading]=useState(true)
const productStat = useSelector((state) => state?.product);

    const {isError,isLoading,isSuccess}=productStat
    useEffect(()=>{
      if(isLoading && singleProductState){
        setLoading(true)
      }
      if(isSuccess && singleProductState){
        setTimeout(()=>{
          setLoading(false)
  
        },1000)
      }
    },[isLoading,isSuccess,singleProductState])


const [alt,setAlt]=useState("")
    useEffect(() => {
      if (singleProductState?.alt && singleProductState?.alt!=="") {
          setAlt(singleProductState?.alt)
      }
      else{
        setAlt(singleProductState?.title)
      }
    
    }, [singleProductState?.title,singleProductState?.alt]);
  return (
    <div className='single-product margin-section'>
      <div className="chart">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className='size-img'>
          <div className="c-icon" onClick={handleClose}><CloseIcon/></div>
            <img src={chart} alt="" />
        </DialogContent>
      </Dialog>
      </div>
      <div className="product">
      {
            loading===true ? <p style={{width:'100%',height:'400px',backgroundColor:'rgb(228, 228, 228)',borderRadius:'10px'}} className='prdt-left'></p>:
            <div className="prdt-left">


         

            <div className="main">
              {
                mainImage===""? <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
                {
                  singleProductState?.images?.map((item)=>{
                    return <Carousel.Item interval={3000}>
                    <img src={item?.url} alt="" />
                  </Carousel.Item>
                  })
                }
  
        
      </Carousel>
      :
                  <img src={mainImage} alt={alt} onError={handleImageError}/>

              }
           
            {/* <img src={mainImage==""?singleProductState?.images[imageIndex]?.url : mainImage} alt={alt} onError={handleImageError}/> */}
            </div>
            <div className="thumbs">
                {
                  singleProductState?.images?.map((img,index)=>{
                      return <img src={img?.url} alt={alt} key={index} onClick={()=>changeMainImage(img)}/>
                    
                    
                  })
                }
            </div>
        </div>
            
          }
       
        <div className="prdt-right">
            <h1 className="product-name">{singleProductState?.title}</h1>
            <div style={{display:'flex',alignItems:'center'}}>
            <p className="prdt-price">&#8377;{singleProductState?.price}</p>
            <p style={{color:'grey',fontSize:'18px',textDecoration:'line-through',margin:'0 10px 6px 15px'}}>&#8377;{(singleProductState?.price)*2}</p>
            <p style={{display:sold,
            margin:'0 10px', 
            backgroundColor: 'rgb(37, 37, 37)',
    color: 'white',
    borderRadius: '4px',
    padding:'0px 10px',
    height: '24px'}}>Sold out</p>
            </div>
            <div className="size prdt-variation">
                <p>SIZE : <span onClick={handleClickOpen}><StraightenIcon className='ico'/> Size Chart</span></p>
                <ul>
    {singleProductState?.variants
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
              <div className="color prdt-variation">
                <p>COLOR :</p>
                <ul>
                                           {
  singleProductState?.variants?.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() => (setColor(item.color),setQuantity(1))} key={index} style={{border:item.color===color?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.color}</li>)
}

                    
                </ul>
            </div>
 

              <div className="quantity">
<p onClick={decrementQuantity}><RemoveIcon className='qty-icon'/></p>
<p>{quantity}</p>
<p onClick={incrementQuantity} style={{opacity:pQuantity===quantity? 0:1}}><AddIcon className='qty-icon'/></p>
            </div>
            {
              pQuantity<3?            <p style={{color:'red',textAlign:'center',marginTop:'15px'}}>Only {pQuantity} Available</p>
:
""
            }

<div className="coupon-code">
  <p><span><LocalOfferIcon className='ico'/></span>Buy 1 Get 5% Off- <span>SAVE5</span></p>
  <p><span><LocalOfferIcon className='ico'/></span>Buy 2 Get 10% Off- <span>MEGA10</span></p>
  <p><span><LocalOfferIcon className='ico'/></span><span>Free Shipping</span> on Prepaid Orders</p>

</div>
            {
              
              sold==="block" ? <p style={{textAlign:'center',margin:"15px auto",color:'red',fontWeight:600,fontSize:'20px'}}>This size is not available</p>:
<div className="buy-btn">
                <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(singleProductState?._id)}} className={btnDisable?'disabled-btn':"btn"} disabled={btnDisable}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                <button className={btnDisable?'disabled-btn':"btn"} onClick={()=>{alreadyAdded?navigate('/checkout'):buyNow(singleProductState?._id)}} disabled={btnDisable}>
                {
                  alreadyAdded?"COMPLETE PURCHASE":"BUY IT NOW"
                }
                </button>
            </div>
            }
            
            <div className="prdt-desc">
                <p dangerouslySetInnerHTML={{ __html: singleProductState?.description }} style={{userSelect:'none'}}/>
              
                
            </div>

        </div>
      </div>
<div className="ratings">
  <p style={{fontSize:'20px',fontWeight:500}}>Ratings</p>
  <div className="rating">
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
    <Stack spacing={1} className="stars">
          <Rating name="size-small" value={star} size="medium" onChange={(e)=>setStar(e.target.value)}/>
        </Stack>
    <div className="msg">
<textarea name="" id="" value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='Enter Message'></textarea>
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
                
                products?.products?.map((arm,index)=>{

                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} alt={arm?.alt}/>
                   
                    
                })
            }
      
        </div>

      </div>
    </div>
  )
}

export default SingleProduct
