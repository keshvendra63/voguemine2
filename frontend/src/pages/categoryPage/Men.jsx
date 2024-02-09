import React from 'react'
import './category.css'
import {Link} from 'react-router-dom'
import banner from '../../images/A18.jpg'
import img1 from '../../images/mens-premium-shirts.jpeg'
import img2 from '../../images/mens-t-shirts.jpeg'
import img3 from '../../images/mens-combos.jpeg'
import img4 from '../../images/mens-loafers.jpeg'
import img5 from '../../images/mens-sneakers.jpeg'
import img6 from '../../images/men-slippers.jpg'
import img7 from '../../images/mens-hoodies.jpeg'
import img8 from '../../images/mens-sweatshirts.jpeg'
import img9 from '../../images/mens-pullover.jpeg'
import img10 from '../../images/mens-denim-jeans.jpeg'
import img11 from '../../images/mens-track-set.jpeg'
import img12 from '../../images/mens-jackets.jpg'
const Men = () => {
  return (
    <div className='categoryPage'>
      <div className="category-banner">
        <img src={banner} alt="" />
      </div>
      <div className="collections">
        <div className="collection-card">
            <Link to="/products">
            <img src={img1} alt="" />
            <h2>Men's Premium Shirts</h2></Link>
        </div>
        <div className="collection-card">
            <img src={img2} alt="" />
            <h2>Men's T-Shirt</h2>
        </div>
        <div className="collection-card">
            <img src={img3} alt="" />
            <h2>Men's Combos</h2>
        </div>
        <div className="collection-card">
            <img src={img4} alt="" />
            <h2>Men's Loafers</h2>
        </div>
        <div className="collection-card">
            <img src={img5} alt="" />
            <h2>Men's Sneakers</h2>
        </div>
        <div className="collection-card">
            <img src={img6} alt="" />
            <h2>Men's Slippers</h2>
        </div>
        <div className="collection-card">
            <img src={img7} alt="" />
            <h2>Men's Hoodie</h2>
        </div>
        <div className="collection-card">
            <img src={img8} alt="" />
            <h2>Men's Sweatshirt</h2>
        </div>
        <div className="collection-card">
            <img src={img9} alt="" />
            <h2>Men's Pullover</h2>
        </div>
        <div className="collection-card">
            <img src={img10} alt="" />
            <h2>Men's Denim Jeans</h2>
        </div>
        <div className="collection-card">
            <img src={img11} alt="" />
            <h2>Men's Tracksets</h2>
        </div>
        <div className="collection-card">
            <img src={img12} alt="" />
            <h2>Men's Jackets</h2>
        </div>
      </div>
    </div>
  )
}

export default Men
