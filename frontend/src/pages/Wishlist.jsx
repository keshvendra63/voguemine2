import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {Link} from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import banner from '../images/A21.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {getUserWishlistProduct} from '../features/user/userSlice'
import { addToWishlist} from '../features/products/productSlice';
import {toast} from 'react-toastify'
const Wishlist = () => {
  const dispatch=useDispatch();
    useEffect(()=>{
      getWishlistFromDb()
    },[])
    const getWishlistFromDb=()=>{
        dispatch(getUserWishlistProduct())
    }
    const wishlistState=useSelector((state)=>state?.auth?.wishlist?.wishlist)
    const wishlists=wishlistState?wishlistState:[]
    const removeFromWishlist=(id)=>{
      dispatch(addToWishlist(id))
      dispatch(getUserWishlistProduct())
      setTimeout(()=>{
       toast.success("Removed")
      },300)
    }
  return (
    <div className='margin-section'>
        <div className="category-banner">
        <img src={banner} alt="" />
      </div>
            <div className="products-listing">
        <p className="section-heading">Wishlist</p>
        <div className="product-list">
          {
            wishlists.length===0 && <div>NO DATA</div>
          }

{
  wishlists?.map((item,index)=>{
    return(
      <div className="product-card" key={index}>
      <div className="product-img">
        <img src={item?.images[1]?.url} alt="" className="product-img1"/>
        {
          item?.images[2]?.url!==""?<img src={item?.images[2]?.url} alt="" className="product-img2"/>:<img src=
          "" alt="" className="product-img2"/>
        }
      </div>
      <p className="wish-icon" onClick={()=>{removeFromWishlist(item?._id)}}><CloseIcon className="cart-icon"/></p>
      <div className="product-content">
        <p className="title">{item?.title}</p>
        <Stack spacing={1} className="stars">
<Rating name="size-small" defaultValue={5} size="small" />

</Stack>
<div className="wish">
<div>
<p className="price">&#8377;{item?.price}</p>
<p className="sale-price">&#8377;24000</p>
</div>
<div>
<CloseIcon className="cart-icon" onClick={()=>{removeFromWishlist(item?._id)}}/>
{/* <AddShoppingCartOutlinedIcon className="cart-icon"/> */}
</div>
</div>

      </div>
      <div className="hover-details">
<div className="title-section">
<p className="title">{item?.title}</p>
<p className="price">&#8377;{item?.price}</p>
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
<li>{item?.colors}</li>
</ul>
</div>
<Link to="#"><button>BUY NOW</button></Link>
      </div>
    </div>
    )
  })
}
         

        </div>
      </div>
    </div>
  )
}

export default Wishlist
