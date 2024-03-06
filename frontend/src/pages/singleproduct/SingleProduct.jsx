import React,{useEffect, useState} from 'react'
import key1 from '../../images/mens-premium-shirts.jpeg'
import key2 from '../../images/mens-hoodies.jpeg'
import key3 from '../../images/mens-jackets.jpg'
import key4 from '../../images/mens-track-set.jpeg'
import main_img from '../../images/mens-premium-shirts.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import {getAProduct,getAllProducts } from '../../features/products/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import './singleproduct.css'
import { addToCart, getUserCartProduct } from '../../features/user/userSlice'
import Product from '../../components/Product'

import {toast} from 'react-toastify'
const SingleProduct = () => {
  const [color,setColor]=useState(null)
  const [size,setSize]=useState(null)
  const [quantity,setQuantity]=useState(1)
  const [alreadyAdded, setAlreadyAdded] =useState(false)
  const [mainImage,setMainImage]=useState("")
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
  const productState=useSelector((state)=>state?.product?.product)
  useEffect(()=>{
      getProducts()
  },[])
  const getProducts=()=>{
      dispatch(getAllProducts())
  }
  const products=productState? productState:[]
    
  const shirts = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -')).slice(0,4) 
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
    else{
      dispatch(addToCart({productId:singleProductState?._id,color,quantity,price:singleProductState?.price,size}))
      navigate('/cart')
      setTimeout(()=>{
        dispatch(getUserCartProduct())

      },200)
    }
    
    
}
const changeMainImage=(img)=>{
  setMainImage(img?.url)
}
console.log(singleProductState?.images)
  return (
    <div className='single-product'>
      <div className="product">
        <div className="prdt-left">

            <div className="main">
            <img src={mainImage===""?singleProductState?.images[1]?.url : mainImage} alt="" />
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
            <p className="prdt-price">&#8377;{singleProductState?.price}</p>
            <div className="size prdt-variation">
                <p>SIZE :</p>
                <ul>
                {
  singleProductState?.variants?.filter((item, index, arr) => arr.findIndex(i => i.size === item.size) === index)
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index} style={{color:item.size===size?'red':'black'}}>{item.size}</li>)
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
                .map((item, index) => <li onClick={() => setColor(item.color)} key={index} style={{color:item.color===color?'red':'black'}}>{item.color}</li>)
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
                <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart(singleProductState?._id)}}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                <button>BUY IT NOW</button>
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
                
                shirts.map((arm,index)=>{

                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants}/>
                   
                    
                })
            }
      
        </div>

      </div>
    </div>
  )
}

export default SingleProduct
