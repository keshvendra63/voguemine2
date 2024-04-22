import React from 'react'
import './category.css'
import banner from '../../images/A20.jpg'
import a3 from '../../images/a3.jpeg'
import a8 from '../../images/a8.jpg'
import { Link } from 'react-router-dom'
const Accessories = () => {
  return (
    <div className='categoryPage'>
    <div className="category-banner">
      <img src={banner} alt="" />
    </div>
    <div className="collections margin-section">
      <Link to="/collections/belts">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904161/belts_lkrnce.jpg" alt="" />
          <h2>Belts</h2>
      </div>
      </Link><Link to="/collections/towels">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904156/towel_jj6yuz.jpg" alt="" />
          <h2>Towels</h2>
      </div></Link><Link to="/collections/under-garment">
      <div className="collection-card">
          <img src={a3} alt="" />
          <h2>Under Garments</h2>
      </div></Link><Link to="/collections/no-show">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904156/no_show_auziaa.jpg" alt="" />
          <h2>No Show</h2>
      </div></Link><Link to="/collections/low-ankle">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904170/ankel_socks_ynk1cs.jpg" alt="" />
          <h2>Low Ankle</h2>
      </div></Link><Link to="/collections/low-cut">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904157/low_cut_lizngm.jpg" alt="" />
          <h2>Low Cut</h2>
      </div></Link><Link to="/collections/anklet">
      <div className="collection-card">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1712904170/anklet_vento7.jpg" alt="" />
          <h2>Anklet</h2>
      </div></Link><Link to="/collections/crew">
      <div className="collection-card">
          <img src={a8} alt="" />
          <h2>Crew</h2>
      </div>
      </Link>
    </div>
  </div>
  )
}

export default Accessories
