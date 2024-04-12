import React from 'react'
import './category.css'
import banner from '../../images/A19.jpg'
import k1 from '../../images/k1.jpg'
import k4 from '../../images/k4.jpg'
import k6 from '../../images/k6.jpg'
import k8 from '../../images/k8.jpg'
import { Link } from 'react-router-dom'
const Kids = () => {
  return (
    <div className='categoryPage'>
    <div className="category-banner">
      <img src={banner} alt="" />
    </div>
    <div className="collections margin-section">
    <Link to="/collections/kids-shirt">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903902/shirts_vrsr9d.jpg" alt="" />
          <h2>Kid's Shirts</h2>
      </div></Link>
      <Link to="/collections/kids-t-shirts">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903900/t_shirts_cid2m0.jpg" alt="" />
          <h2>Kid's T-shirts</h2>
      </div></Link>
      <Link to="/collections/kid-girls-dress">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903902/girl_dresses_mkrgau.jpg" alt="" />
          <h2>Kid's Girl Dresses</h2>
      </div></Link>
      
      <Link to="/collections/kids-co-ord-set">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712903902/co_ord_set_1_rn0pvi.jpg" alt="" />
          <h2>Kid's Girl Co-Ord Set</h2>
      </div></Link>
      <Link to="/collections/kids-tracksuit">
      <div className="collection-card">
          <img src={k8} alt="" />
          <h2>Kid's Tracksuit</h2>
      </div></Link>
      <Link to="/collections/kids-hoodie">
      <div className="collection-card">
          <img src={k1} alt="" />
          <h2>Kid's Hoodie</h2>
      </div>
</Link><Link to="/collections/kids-boy-jacket">
      <div className="collection-card">
          <img src={k4} alt="" />
          <h2>Kid's Boy Jackets</h2>
      </div></Link><Link to="/collections/kids-girl-jacket">
      <div className="collection-card">
          <img src={k6} alt="" />
          <h2>Kid's Girl Jackets</h2>
      </div></Link>

    </div>
  </div>
  )
}

export default Kids
