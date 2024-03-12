import React from 'react'
import './category.css'
import banner from '../../images/A17.jpg'
import prdt from '../../images/key5.jpeg'
import w1 from '../../images/w1.jpg'
import w2 from '../../images/w2.jpg'
import w3 from '../../images/w3.jpg'
import w4 from '../../images/w4.jpg'
import w5 from '../../images/w5.jpg'
import w6 from '../../images/w6.jpg'
import w7 from '../../images/w7.jpg'
import w8 from '../../images/w8.jpg'
import w9 from '../../images/w9.jpg'
import w10 from '../../images/w10.jpg'
import w11 from '../../images/w11.jpg'
import w12 from '../../images/w12.jpg'
import { Link } from 'react-router-dom'
const Women = () => {
    return (
        <div className='categoryPage'>
            <div className="category-banner">
                <img src={banner} alt="" />
            </div>
            <div className="collections">
                <Link to="/collections/womens-winter-coats">
                <div className="collection-card">
                    <img src={w12} alt="" />
                    <h2>Women's Winter Coats</h2>
                </div></Link><Link to="/collections/womens-pullover-jackets">
                <div className="collection-card">
                    <img src={w9} alt="" />
                    <h2>Women's Jackets</h2>
                </div></Link><Link to="/collections/womens-sweatshirt">
                <div className="collection-card">
                    <img src={w10} alt="" />
                    <h2>Women' Sweatshirts</h2>
                </div></Link><Link to="/collections/womens-track-sets">
                <div className="collection-card">
                    <img src={w4} alt="" />
                    <h2>Women' Tracksets</h2>
                </div></Link><Link to="/collections/womens-co-ord-set">
                <div className="collection-card">
                    <img src={w3} alt="" />
                    <h2>Women's Co-Ord Sets</h2>
                </div></Link><Link to="/collections/womens-pullovers">
                <div className="collection-card">
                    <img src={w2} alt="" />
                    <h2>Women's Pullovers</h2>
                </div></Link><Link to="/collections/womens-dress">
                <div className="collection-card">
                    <img src={w8} alt="" />
                    <h2>Women's Dresses</h2>
                </div></Link><Link to="/collections/womens-hoodie">
                <div className="collection-card">
                    <img src={w6} alt="" />
                    <h2>Women's Hoodies</h2>
                </div></Link><Link to="/collections/womens-shirt-t-shirts">
                <div className="collection-card">
                    <img src={w5} alt="" />
                    <h2>Women's T-Shirts</h2>
                </div></Link><Link to="/collections/womens-legging">
                <div className="collection-card">
                    <img src={w7} alt="" />
                    <h2>Women's Leggings</h2>
                </div></Link><Link to="">
                <div className="collection-card">
                    <img src={w1} alt="/collections/flat-sandals" />
                    <h2>Women's Flat Sandals</h2>
                </div></Link><Link to="/collections/heeled-sandals">
                <div className="collection-card">
                    <img src={w11} alt="" />
                    <h2>Women's Heeled Sandals</h2>
                </div></Link>
            </div>
        </div>
    )
}

export default Women
