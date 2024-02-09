import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from 'react-elastic-carousel';
import home_benner from '../../images/home-banner.jpg'
import men from '../../images/men.jpg'
import women from '../../images/women.jpg'
import key1 from '../../images/key1.jpg'
import key2 from '../../images/key2.jpg'
import key3 from '../../images/key3.jpg'
import { useSnapCarousel } from 'react-snap-carousel';

import './homemain.css'
const HomeMain = () => {
  const { scrollRef } = useSnapCarousel();

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
      <div className="category-devide">
        <div className="men-category cate">
          <div className='cat-img'>
            <img src={men} alt="" />
          </div>
          <div>
            <h1 className='cat-head'>Discover Men</h1>
          </div>

        </div>
        <div className="women-category cate">
          <div className='cat-img'><img src={women} alt="" /></div>
          <div className='cat-head'><h1>Discover Women</h1></div>

        </div>
      </div>
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
          <h1>The Premium Shoes Collection</h1>
          <p>Introducing our Premium Quality Men's Sneakers collection - the ultimate fusion of style and comfort. Crafted with precision and the finest materials, our sneakers redefine luxury footwear. Each pair exudes timeless elegance and durability, promising a perfect fit for your active lifestyle.</p>
          <a className='btn'>BUY NOW</a>
        </div>
      </div>
      <div className="shoes-items">
        <Carousel1 itemsToShow={5} enableAutoPlay breakPoints={breakpoints} itemPadding={[10, 20]} >
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
        </Carousel1>

      </div>
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
          <h1>The Premium Shoes Collection</h1>
          <p>Introducing our Premium Quality Men's Sneakers collection - the ultimate fusion of style and comfort. Crafted with precision and the finest materials, our sneakers redefine luxury footwear. Each pair exudes timeless elegance and durability, promising a perfect fit for your active lifestyle.</p>
          <a className='btn'>BUY NOW</a>
        </div>
      </div>
      <div className="shoes-items">
        <Carousel1 itemsToShow={5} enableAutoPlay breakPoints={breakpoints} itemPadding={[10, 20]} >
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
        </Carousel1>

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
      <div className="shoes-items">
        <Carousel1 itemsToShow={5} enableAutoPlay breakPoints={breakpoints} itemPadding={[10, 20]} >
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
          <div className="shoes-product">
            <img src={key1} alt="" />
            <div className="product-content">
              <p className="title">Premium quality shoes</p>
              <p className="price">Rs. 10,699</p>
            </div>
          </div>
        </Carousel1>

      </div>

    </div>
  )
}

export default HomeMain
