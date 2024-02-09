import React from 'react'
import './category.css'
import banner from '../../images/A20.jpg'
import prdt from '../../images/key5.jpeg'
import a1 from '../../images/a1.jpeg'
import a2 from '../../images/a2.jpg'
import a3 from '../../images/a3.jpeg'
import a4 from '../../images/a4.jpg'
import a5 from '../../images/a5.jpg'
import a6 from '../../images/a6.jpg'
import a7 from '../../images/a7.jpg'
import a8 from '../../images/a8.jpg'
const Accessories = () => {
  return (
    <div className='categoryPage'>
    <div className="category-banner">
      <img src={banner} alt="" />
    </div>
    <div className="collections">
      <div className="collection-card">
          <img src={a1} alt="" />
          <h2>Belts</h2>
      </div>
      <div className="collection-card">
          <img src={a2} alt="" />
          <h2>Towels</h2>
      </div>
      <div className="collection-card">
          <img src={a3} alt="" />
          <h2>Under Garments</h2>
      </div>
      <div className="collection-card">
          <img src={a4} alt="" />
          <h2>No Show</h2>
      </div>
      <div className="collection-card">
          <img src={a5} alt="" />
          <h2>Low Ankle</h2>
      </div>
      <div className="collection-card">
          <img src={a6} alt="" />
          <h2>Low Cut</h2>
      </div>
      <div className="collection-card">
          <img src={a7} alt="" />
          <h2>Anklet</h2>
      </div>
      <div className="collection-card">
          <img src={a8} alt="" />
          <h2>Crew</h2>
      </div>
    </div>
  </div>
  )
}

export default Accessories
