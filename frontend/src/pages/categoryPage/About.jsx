import React from 'react'
import './category.css'
import banner from '../../images/A21.jpg'
import about_img from '../../images/about-img.jpg'
import owner from '../../images/owner.png'
const About = () => {
  return (
    <div className='categoryPage'>
            <div className="category-banner">
        <img src={banner} alt="" />
      </div>
      <div className="about">
        <div className="left-about">
            <img src={about_img} alt="" />
            
        </div>
        <div className="right-about">
            <p style={{color:'grey'}}>Voguemine</p>
            <h1>ABOUT VOGUEMINE</h1>
            <p>At the Voguemine, we understand, style is not just about what you wear, it's about how you feel. That's why we go above and beyond to provide an exceptional shopping experience, with attentive customer service and a user-friendly online platform that makes it easy to find the perfect addition of collection to your luxurious wardrobe.

Our team of fashion experts has scoured the globe to curate a stunning selection of authentic, pre-owned luxury products, from high-end designer apparel, accessories and footwear. Each piece has been carefully inspected to ensure that it meets our attentive standards of quality and authenticity.

</p>
<div className='about-content'>
                <div>
                    <h4>Customers</h4>
                    <p>3000+</p>
                </div>
                <div>
                    <h4>Customers</h4>
                    <p>3000+</p>
                </div>
                <div>
                    <h4>Customers</h4>
                    <p>3000+</p>
                </div>
                <div>
                    <h4>Customers</h4>
                    <p>3000+</p>
                </div>
            </div>
        </div>
      </div>
      <div className="employees">
        <h1>MEET OUR TEAM</h1>
        <div className="owners">
          <div className="ownercard">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="owner-position">Founder</p>
          </div>
          <div className="ownercard">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="owner-position">Founder</p>
          </div>
          <div className="ownercard">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="owner-position">Founder</p>
          </div>
        </div>
        <h1>MEET OUR EMPLOYEES</h1>
        <div className="employee">
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
          <div className="employee-card">
            <img src={owner} alt="" />
            <h4 className="name">Keshvendra</h4>
            <p className="position">IT MANAGER</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
