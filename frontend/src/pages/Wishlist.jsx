import React, { useEffect,useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {Link} from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux'
import {getUserWishlistProduct} from '../features/user/userSlice'
import { addToWishlist} from '../features/products/productSlice';
import {toast} from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [color,setColor]=useState(null)
    const [size,setSize]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const navigate=useNavigate()
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const location =useLocation()
    const getProductId=location.pathname.split("/")[2];
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
    <div className=''>
        <div className="category-banner">
        <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710505441/a33_dc4zuw.jpg" alt="" />
      </div>
            <div className="products-listing">
        <p className="section-heading">Wishlist</p>
        <div className="product-list margin-section">
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
{
  item?.variants.filter((item, index, arr) => arr.findIndex(i => i.size === item.size) === index)
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index} style={{border:item.size===size?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.size}</li>)
}
</ul>
</div>
<div className="color">
<p>Colors</p>
<ul>
{
  item?.variants?.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
                .map((item, index) => <li onClick={() =>( setColor(item.color))} key={index} style={{border:item.color===color?'2px solid black':'1px solid grey',color:item.color===color?'black':'rgb(122, 122, 122)'}}>{item.color}</li>)
}
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
