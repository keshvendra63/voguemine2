import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from 'react-elastic-carousel';
import home_benner from '../../images/home-banner.jpg'
import men from '../../images/men.jpg'
import women from '../../images/women.jpg'
import key1 from '../../images/key1.jpg'
import key2 from '../../images/key2.jpg'
import key3 from '../../images/key3.jpg'
import {Link} from 'react-router-dom'
import './homemain.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const HomeMain = () => {

  const breakpoints = [
    { width: 1, itemsToShow: 1.1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },

  ]

  return (
    <div className='homeMain'>
      <div className="hero-section">
        <img src={home_benner} alt="" />
      </div>
      <div className="categories">
        <div className="cate">
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709195919/1_y7676c.jpg" alt="" />
          <div className="content">

          </div>
        </div>
        <div className="cate">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709195921/2_jsp72s.jpg" alt="" />
            <div className="content">

            </div>
        </div>
      </div>
      <div className="margin-section">
      <div className="shoes-section">
        <div className="shoe-left">
          <Carousel>
            <Carousel.Item>
              <img src={key1} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key2} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key3} alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
        <div className="shoe-right">
          <p className='section-heading'>The Premium Shoes Collection</p>
          <p>Introducing our Premium Quality Men's Sneakers collection - the ultimate fusion of style and comfort. Crafted with precision and the finest materials, our sneakers redefine luxury footwear. Each pair exudes timeless elegance and durability, promising a perfect fit for your active lifestyle.</p>
          <a className='btn'>BUY NOW</a>
        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
        <div className="product-list">
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
   
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="trending-collections">
        <p className="section-heading">Men's Trending</p>
        <div className="trending-collection">
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
        </div>
      </div>
      <div className="shoes-section">
        
        <div className="shoe-right">
          <p className='section-heading'>The Premium Shoes Collection</p>
          <p>Introducing our Premium Quality Men's Sneakers collection - the ultimate fusion of style and comfort. Crafted with precision and the finest materials, our sneakers redefine luxury footwear. Each pair exudes timeless elegance and durability, promising a perfect fit for your active lifestyle.</p>
          <a className='btn'>BUY NOW</a>
        </div>
        <div className="shoe-left">
          <Carousel>
            <Carousel.Item>
              <img src={key1} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key2} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key3} alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
        <div className="product-list">
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
   
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="trending-collections">
        <p className="section-heading">Men's Trending</p>
        <div className="trending-collection">
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
          <div className="trending-card">
            <img src={men} alt="" />
          </div>
        </div>
      </div>
      <div className="shoes-section">
        <div className="shoe-left">
          <Carousel data-interval="100">
            <Carousel.Item>
              <img src={key1} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key2} alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={key3} alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
        <div className="shoe-right">
          <h1>The Premium Shoes Collection</h1>
          <p>Introducing our Premium Quality Men's Sneakers collection - the ultimate fusion of style and comfort. Crafted with precision and the finest materials, our sneakers redefine luxury footwear. Each pair exudes timeless elegance and durability, promising a perfect fit for your active lifestyle.</p>
          <a className='btn'>BUY NOW</a>
        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
        <div className="product-list">
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
   
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
          <div className="product-card">
            <div className="product-img">
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="product-img1"/>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365635/prada-white-black-premium-quality-shirt-442_o9oqfk.jpg" alt="" className="product-img2"/>
            </div>
            <p className="wish-icon"><FavoriteBorderOutlinedIcon className="cart-icon"/></p>
            <div className="product-content">
              <p className="title">Louis Vuitton White Premium Quality Shirt</p>
              <Stack spacing={1} className="stars">
      <Rating name="size-small" defaultValue={5} size="small" />

    </Stack>
    <div className="wish">
    <div>
    <p className="price">&#8377;1999</p>
    <p className="sale-price">&#8377;24000</p>
    </div>
    <div>
<FavoriteBorderOutlinedIcon className="cart-icon"/>
<AddShoppingCartOutlinedIcon className="cart-icon"/>
    </div>
    </div>
            </div>
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
            </div>
          </div>
        </div>
      </div>


<div className="collection-listing">
  <p>Featured Collection</p>
  <div className="collection-list">
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
    <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
    <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
    <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
    <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
    <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
    <div className="collection-card">
    <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1708365741/giorgio-armani-seaweed-green-premium-quality-shirt-448_oxomzr.png" alt="" className="collection-img"/>
  <div className="collection-content">  <p className="collection-title">Men's Premium Shirts</p>
    <Link to="#"><button>VIEW COLLECTION</button></Link></div>
    </div>
  </div>
</div>

      </div>

    </div>
  )
}

export default HomeMain
