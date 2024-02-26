import React,{useEffect, useState} from 'react'
import key1 from '../../images/mens-premium-shirts.jpeg'
import key2 from '../../images/mens-hoodies.jpeg'
import key3 from '../../images/mens-jackets.jpg'
import key4 from '../../images/mens-track-set.jpeg'
import main_img from '../../images/mens-premium-shirts.jpeg'
import { useDispatch, useSelector } from 'react-redux'
import {getAProduct } from '../../features/products/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import './singleproduct.css'
import { addToCart, getUserCartProduct } from '../../features/user/userSlice'
import {toast} from 'react-toastify'
const SingleProduct = () => {
  const [color,setColor]=useState(null)
  const [quantity,setQuantity]=useState(1)
  const [alreadyAdded, setAlreadyAdded] =useState(false)
  const navigate=useNavigate()
  const singleProductState=useSelector((state)=>state?.product?.getSingleProduct)
  console.log(singleProductState?.images[0]?.url)
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
    <div className='single-product'>
      <div className="product">
        <div className="prdt-left">

            <div className="main">
            <img src={singleProductState?.img_src || singleProductState?.images[0]?.url} alt="" />
            </div>
            <div className="thumbs">
                <img src={main_img} alt="" />
                <img src={main_img} alt="" />
                <img src={main_img} alt="" />
                <img src={main_img} alt="" />
                <img src={main_img} alt="" />
                <img src={main_img} alt="" />
            </div>
        </div>
        <div className="prdt-right">
            <h1 className="product-name">{singleProductState?.Title}</h1>
            <p className="prdt-price">Rs. 1999</p>
            <div className="size prdt-variation">
                <p>SIZE :</p>
                <ul>
                    <li>S</li>
                    <li>M</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>2XL</li>
                    <li>3XL</li>
                    <li>4XL</li>
                    <li>5XL</li>
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
                                          <li onClick={()=>setColor(singleProductState?.colors)} style={{backgroundColor:singleProductState?.colors}} >{singleProductState?.colors}</li>

                    
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
                <button onClick={()=>{alreadyAdded?navigate('/cart'):addTocart()}}>{
                  alreadyAdded?"GO TO CART":"ADD TO CART"
                }</button>
                <button>BUY IT NOW</button>
            </div>
            <div className="prdt-desc">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo error expedita vel accusantium ab enim sit voluptatum doloribus consequuntur ipsa, ex, autem aliquam. Repudiandae animi, officiis mollitia numquam saepe eligendi atque repellat molestias necessitatibus temporibus provident, aliquam ad obcaecati veniam.
                </p>
            </div>

        </div>
      </div>
      <p className='you-like'>YOU MAY ALSO LIKE</p>
      <div className="prdt-suggesstions">
            <div className="product">
            <img src={key1} alt="" />
            <div className="product-content">
            <p className="title">Men's Burberry White Premium Quality Shirt</p>
            <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="product">
            <img src={key2} alt="" />
            <div className="product-content">
            <p className="title">Men's Burberry White Premium Quality Shirt</p>
            <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="product">
            <img src={key3} alt="" />
            <div className="product-content">
            <p className="title">Men's Burberry White Premium Quality Shirt</p>
            <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="product">
            <img src={key4} alt="" />
            <div className="product-content">
            <p className="title">Men's Burberry White Premium Quality Shirt</p>
            <p className="price">Rs. 10,699</p>
            </div>
            </div>
      </div>
    </div>
  )
}

export default SingleProduct
