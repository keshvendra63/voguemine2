import React, { useEffect } from 'react'
import banner from '../../images/A21.jpg'
import './product.css'
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, getAllProducts } from '../../features/products/productSlice';
import {addToCart} from '../../features/user/userSlice'
const Products = () => {
    const productState=useSelector((state)=>state?.product?.product)
    console.log(productState)
    const dispatch=useDispatch();
    useEffect(()=>{
        getProducts()
    },[])
    const getProducts=()=>{
        dispatch(getAllProducts())
    }
    const addToWish=(id)=>{
        dispatch(addToWishlist(id))
    }
    const addTocart=(id)=>{
        dispatch(addToCart(id))
    }
    const products=productState? productState :[]
    return (
        <div className='Products'>
            <div className="product-banner">
                <img src={banner} alt="" />
            </div>
            <div className="products-box">
                <div className="filter">
                    <div className="category">
                        <p>Availability</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />In Stock</li>
                            <li><input type="checkbox" name="" id="" />Out of Stock</li>
                        </ul>
                    </div>
                    <div className="price">
                        <p>Price</p>
                        <ul>
                            <li>min:<input type="number" /></li>
                            <li>max:<input type="number" /></li>
                        </ul>


                    </div>
                    <div className="size">
                        <p>Size</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>
                    <div className="color">
                        <p>Colour</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>

                </div>
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p>Filter</p>
                        </div>
                        <p style={{fontWeight:'bold'}}>1000 Products</p>
                        <div className="sort">
                            <select name="" id="" style={{fontWeight:'bold'}}>
                                <option value="">Best Selling</option>
                                <option value="">Featured</option>
                                <option value="">Price Low to High</option>
                                <option value="">Price High to Low</option>
                                <option value="">Old to New</option>
                                <option value="">New to Old</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="products-listing">
        <p className="section-heading">Featured Products</p>
        <div className="product-list">
        {
                         products?.map((item,index)=>{
                            if(item?.title=="fdfdfdfdfdf"){
                                return(

<div className="product-card" key={index}>
<Link to={`/product/${item?._id}`}>
            <div className="product-img">
              <img src={item?.img_src} alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon" onClick={(e)=>{addToWish(item?._id)}}><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">{item?.Title}</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon" onClick={(e)=>{addToWish(item?._id)}}/>
<AddShoppingCartOutlinedIcon className="cart-icon" onClick={(e)=>{addTocart(item?._id)}}/>
    </div>
    </div>
            </div>
            </Link>
            <div className="hover-details">
<div className="title-section">
<p className="title">Louis Vuitton White Premium Quality Shirt</p>
<p className="price">&#8377;1999</p>
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
    <li style={{backgroundColor:"red"}}></li>
    <li style={{backgroundColor:"green"}}></li>
    <li style={{backgroundColor:"blue"}}></li>
    <li style={{backgroundColor:"black"}}></li>
    <li style={{backgroundColor:"pink"}}></li>
  </ul>
</div>
<Link to="#"><button>BUY NOW</button></Link>
<Link to="#" onClick={(e)=>{addTocart(item?._id)}}><button>ADD TO CART</button></Link>
            </div>
          </div>

           )
        }
       
     })}
        </div>
      </div>
                    <div className="pages">
                    <Stack spacing={2}>
      <Pagination count={10} />
    </Stack>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
