import React from 'react'
import './category.css'
import banner from '../../images/A19.jpg'
import prdt from '../../images/key5.jpeg'
import k1 from '../../images/k1.jpg'
import k2 from '../../images/k2.jpg'
import k3 from '../../images/k3.jpg'
import k4 from '../../images/k4.jpg'
import k5 from '../../images/k5.jpg'
import k6 from '../../images/k6.jpg'
import k7 from '../../images/k7.jpg'
import k8 from '../../images/k8.jpg'
import { Link } from 'react-router-dom'
const Kids = () => {
  return (
    <div className='categoryPage'>
    <div className="category-banner">
      <img src={banner} alt="" />
    </div>
    <div className="collections">
      <Link to="/collections/kids-hoodie">
      <div className="collection-card">
          <img src={k1} alt="" />
          <h2>Kid's Hoodie</h2>
      </div>
</Link><Link to="/collections/kids-co-ord-set">
      <div className="collection-card">
          <img src={k2} alt="" />
          <h2>Kid's Girl Co-Ord Set</h2>
      </div></Link><Link to="/collections/kids-t-shirts">
      <div className="collection-card">
          <img src={k3} alt="" />
          <h2>Kid's T-shirts</h2>
      </div></Link><Link to="/collections/kids-boy-jacket">
      <div className="collection-card">
          <img src={k4} alt="" />
          <h2>Kid's Boy Jackets</h2>
      </div></Link><Link to="/collections/kids-shirt">
      <div className="collection-card">
          <img src={k5} alt="" />
          <h2>Kid's Shirts</h2>
      </div></Link><Link to="/collections/kids-girl-jacket">
      <div className="collection-card">
          <img src={k6} alt="" />
          <h2>Kid's Girl Jackets</h2>
      </div></Link><Link to="/collections/kid-girls-dress">
      <div className="collection-card">
          <img src={k7} alt="" />
          <h2>Kid's Girl Dresses</h2>
      </div></Link><Link to="/collections/kids-tracksuit">
      <div className="collection-card">
          <img src={k8} alt="" />
          <h2>Kid's Tracksuit</h2>
      </div></Link>

    </div>
  </div>
  )
}

export default Kids
