import React from 'react'
import './category.css'
import banner from '../../images/A17.jpg'
import w6 from '../../images/w6.jpg'
import w10 from '../../images/w10.jpg'
import w12 from '../../images/w12.jpg'
import { Link } from 'react-router-dom'
const Women = () => {
    return (
        <div className='categoryPage'>
            <div className="category-banner">
                <img src={banner} alt="" />
            </div>
            <div className="collections margin-section">
            <Link to="/collections/womens-shirt-t-shirts">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903477/t_shirt_1_ptzdm8.jpg" alt="" />
                    <h2>Women's T-Shirts</h2>
                </div></Link>
                <Link to="/collections/womens-dress">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903480/dresses_gfrq47.jpg" alt="" />
                    <h2>Women's Dresses</h2>
                </div></Link>
                <Link to="/collections/womens-co-ord-set">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903480/co_ord_set_groozl.jpg" alt="" />
                    <h2>Women's Co-Ord Sets</h2>
                </div></Link>
                <Link to="/collections/heeled-sandals">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903479/healed_sandles_jpdece.jpg" alt="" />
                    <h2>Women's Heeled Sandals</h2>
                </div></Link>
                <Link to="/collections/flat-sandals">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903479/flat_sandels_dqimu2.jpg" alt="" />
                    <h2>Women's Flat Sandals</h2>
                </div></Link>
                <Link to="/collections/womens-track-sets">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903478/track_suit_yqkvfe.jpg" alt="" />
                    <h2>Women' Tracksets</h2>
                </div></Link>
                <Link to="/collections/womens-legging">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903478/leggings_yknect.jpg" alt="" />
                    <h2>Women's Leggings</h2>
                </div></Link>
                
                <Link to="/collections/womens-sweatshirt">
                <div className="collection-card">
                    <img src={w10} alt="" />
                    <h2>Women' Sweatshirts</h2>
                </div></Link>
                <Link to="/collections/womens-winter-coats">
                <div className="collection-card">
                    <img src={w12} alt="" />
                    <h2>Women's Winter Coats</h2>
                </div></Link><Link to="/collections/womens-pullover-jackets">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903479/jackts_wjdi9n.jpg" alt="" />
                    <h2>Women's Jackets</h2>
                </div></Link><Link to="/collections/womens-pullovers">
                <div className="collection-card">
                    <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903479/pullover_qkfg1s.jpg" alt="" />
                    <h2>Women's Pullovers</h2>
                </div></Link><Link to="/collections/womens-hoodie">
                <div className="collection-card">
                    <img src={w6} alt="" />
                    <h2>Women's Hoodies</h2>
                </div></Link>
            </div>
        </div>
    )
}

export default Women
