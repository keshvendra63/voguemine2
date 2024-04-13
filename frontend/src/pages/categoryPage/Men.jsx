import React from 'react'
import './category.css'
import {Link} from 'react-router-dom'
import banner from '../../images/A18.jpg'
import img11 from '../../images/mens-track-set.jpeg'
import img12 from '../../images/mens-jackets.jpg'
const Men = () => {
  return (
    <div className='categoryPage'>
      <div className="category-banner">
        <img src={banner} alt="" />
      </div>
      <div className="collections margin-section">
      <Link to="/collections/men-premium-shirt">
        <div className="collection-card">
            
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902115/shirt_qniodl.jpg" alt="" className='col-img'/>
            <h2>Men's Premium Shirts</h2>
        </div>
        </Link>
        <Link to="/collections/t-shirts">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902079/t_shirt_wzguwp.jpg" alt="" />
            <h2>Men's T-Shirt</h2>
        </div>
        </Link>
        <Link to="/collections/men-premium-half-sleeve-shirt">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713028400/WhatsApp_Image_2024-04-13_at_16.41.36_4da1adcf_rkwgco.jpg" alt="" />
            <h2>Men's Premium Half Sleeve Shirt</h2>
        </div>
        </Link>
        <Link to="/collections/combos">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902099/combo_cyftbh.jpg" alt="" />
            <h2>Men's Combos</h2>
        </div>
        </Link>
        <Link to="/collections/loafers-for-men">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902105/loafers_suldb8.jpg" alt="" />
            <h2>Men's Loafers</h2>
        </div>
        </Link>
        <Link to="/collections/mens-sneakers-firstcopyshoes">

        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902081/sneaker_twwejr.jpg" alt="" />
            <h2>Men's Sneakers</h2>
        </div>
        </Link>
        <Link to="/collections/floaters-slippers">

        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902079/flipflop_fp4mgz.jpg" alt="" />
            <h2>Men's Slippers</h2>
        </div>
        </Link>
        <Link to="/collections/mens-denim-jeans">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902106/jeans_dtflbu.jpg" alt="" />
            <h2>Men's Denim Jeans</h2>
        </div>
        </Link>
        <Link to="/collections/mens-trackpants">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902072/track_pant_zuxcpj.jpg" alt="" />
            <h2>Men's Trackpants</h2>
        </div>
        </Link>
        <Link to="/collections/mens-premium-shorts">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902093/shorts_cm2unp.jpg" alt="" />
            <h2>Men's Premium Shorts</h2>
        </div>
        </Link>
        <Link to="/collections/mens-hoodies">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902090/hoody_k8jth2.jpg" alt="" />
            <h2>Men's Hoodie</h2>
        </div>
        </Link>
        <Link to="/collections/mens-sweatshirts">
        <div className="collection-card">
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712902078/swetshirt_c7ojeh.jpg" alt="" />
            <h2>Men's Sweatshirt</h2>
        </div>
        </Link>


        <Link to="/collections/mens-trackset">
        <div className="collection-card">
            <img src={img11} alt="" />
            <h2>Men's Tracksets</h2>
        </div>
        </Link>

        <Link to="/collections/mens-pullover-jackets">
        <div className="collection-card">
            <img src={img12} alt="" />
            <h2>Men's Jackets</h2>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Men
