import React from 'react'
import key1 from '../../images/mens-premium-shirts.jpeg'
import key2 from '../../images/mens-hoodies.jpeg'
import key3 from '../../images/mens-jackets.jpg'
import key4 from '../../images/mens-track-set.jpeg'
import main_img from '../../images/mens-premium-shirts.jpeg'
import './singleproduct.css'
const SingleProduct = () => {
  return (
    <div className='single-product'>
      <div className="product">
        <div className="prdt-left">

            <div className="main">
            <img src={main_img} alt="" />
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
            <h1 className="prdt-name">MEN'S BURBERRY WHITE PREMIUM QUALITY SHIRTS</h1>
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
            <div className="color prdt-variation">
                <p>COLOR :</p>
                <ul>
                    <li style={{backgroundColor:'red'}}></li>
                    <li style={{backgroundColor:'white'}}></li>
                    <li style={{backgroundColor:'blue'}}></li>
                    <li style={{backgroundColor:'grey'}}></li>
                </ul>
            </div>
            <div className="quantity">
                <button>-</button>
                <p>1</p>
                <button>+</button>
            </div>
            <div className="buy-btn">
                <button>ADD TO CART</button>
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
