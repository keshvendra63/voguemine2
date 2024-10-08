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
  const bannerState=useSelector((state)=>state?.banner?.banner)

const [wishlist,setWishlist]=useState([])
  const [color,setColor]=useState(null)
    const [size,setSize]=useState(null)
    const [quantity,setQuantity]=useState(1)
    const [alreadyAdded, setAlreadyAdded] =useState(false)
    const navigate=useNavigate()
    const cartState=useSelector((state)=>state?.auth?.cartProducts)
    const location =useLocation()
    const getProductId=location.pathname.split("/")[2];
    const dispatch=useDispatch();
    useEffect(() => {
      // Retrieve cart items from localStorage
      const cartFromStorage = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(cartFromStorage);
  }, []);

    const removeFromWishlist=(id)=>{
      const cardDetails = JSON.parse(localStorage.getItem('wishlist')) || [];
      const updatedWishlistDetails = cardDetails.filter(item => item.productId !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlistDetails));
        setWishlist(updatedWishlistDetails)
      setTimeout(()=>{
       toast.success("Removed")
      },300)
    }
    const modifyCloudinaryUrl = (url) => {
      const urlParts = url?.split('/upload/');
      return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
    };
  return (
    <div className=''>
        <div className="category-banner">
        <img src={modifyCloudinaryUrl(bannerState[36]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1710505441/a33_dc4zuw.jpg")} alt={bannerState[37]?.alt} />
      </div>
            <div className="products-listing margin-section">
        <p className="section-heading">Wishlist</p>
        <div className="product-list ">
          {
            wishlist.length===0 && <div>NO DATA</div>
          }

{
  wishlist?.map((item,index)=>{
    return(
      <div className="product-card" key={index}>
      <Link to={`/products/${item?.product?.handle}`}>
      <div className="product-img">
        <img src={modifyCloudinaryUrl(item?.product?.images[1]?.url)} alt="" className="product-img1"/>
        {
          item?.product?.images[2]?.url!==""?<img src={item?.product?.images[2]?.url} alt="" className="product-img2"/>:<img src=
          "" alt="" className="product-img2"/>
        }
      </div>
      </Link>
      <p className="wish-icon" onClick={()=>{removeFromWishlist(item?.product?._id)}}><CloseIcon className="cart-icon"/></p>
      <div className="product-content">
        <Link to={`/products/${item?.product?.handle}`}>
        <p className="title">{item?.title}</p>
        </Link>
        <Stack spacing={1} className="stars">
<Rating name="size-small" defaultValue={5} size="small" />

</Stack>
<div className="wish">
<div>
<p className="price">&#8377;{item?.product?.price}</p>
<p className="sale-price">&#8377;{item?.product?.price*2}</p>
</div>
<div>
<CloseIcon className="cart-icon" onClick={()=>{removeFromWishlist(item?.productId)}}/>
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
  item?.product?.variants.filter((item, index, arr) => arr.findIndex(i => i.size === item.size) === index)
                .map((item, index) => <li onClick={() => setSize(item.size)} key={index} style={{border:item.size===size?'2px solid black':'1px solid grey',color:item.size===size?'black':'rgb(122, 122, 122)'}}>{item.size}</li>)
}
</ul>
</div>
<div className="color">
<p>Colors</p>
<ul>
{
  item?.product?.variants?.filter((item, index, arr) => arr.findIndex(i => i.color === item.color) === index)
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
