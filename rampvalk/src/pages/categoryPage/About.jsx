import React from 'react'
import './category.css'
import banner from '../../images/A21.jpg'
import about_img from '../../images/about-img.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {

  return (
    <div className='categoryPage'>
            <div className="category-banner">
        <img src={banner} alt="" />
      </div>
      <div className="about margin-section">
        <div className="left-about">
            <img src={about_img} alt="" />
            
        </div>
        <div className="right-about">
            <h1>ABOUT RAMPVALK</h1>
            <p>At Rampvalk by Voguemine, we understand, style is not just about what you wear, it's about how you feel. That's why we go above and beyond to provide an exceptional shopping experience, with attentive customer service and a user-friendly online platform that makes it easy to find the perfect addition of collection to your luxurious wardrobe.



</p>
<p>Our team of fashion experts has carefully handpicked a stunning collection of authentic store articles of luxury high-end designer apparel, accessories, and footwear. Each piece has been carefully inspected to ensure that it meets our attentive standards of quality and authenticity.</p>
{/* <div className='about-content'>
                <div>
                    <h4>Customers</h4>
                    <p>3000+</p>
                </div>
                <div>
                    <h4>Orders</h4>
                    <p>12000+</p>
                </div>
                <div>
                    <h4>Products</h4>
                    <p>22000+</p>
                </div>
                <div>
                    <h4>Employees</h4>
                    <p>50+</p>
                </div>
            </div> */}
        </div>
      </div>

{/* <div className="c-banner" style={{marginBottom:'50px'}}>
  <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514549/00005_qdvxte.jpg" alt="" style={{width:'100%'}}/>
</div> */}

      <div className="ourteam">
    <h2>Meet Our Team</h2>
   </div>
    <div className='teams'>
       
        <div className="team">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713513971/0003_dadj7d.jpg" alt="" />
          <p className='name'>Mohinder Bisht</p>
          <p className='detail'>CEO</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
        <div className="team">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713513971/0002_kucqzz.jpg" alt="" />
          <p className='name'>Monika Bisht</p>
          <p className='detail'>Co-founder</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
        <div className="team">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713513971/001_ppofc5.jpg" alt="" />
          <p className='name'>Daljeet Kaur</p>
          <p className='detail'>HR Manager</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>


          </div>
        </div>
        <div className="team">
          <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713513971/00004_hxog8e.jpg" alt="" />
          <p className='name'>Mukhtesh Rawat</p>
          <p className='detail'>Logistic Manager</p>
          <p className='detail'></p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
      
    </div>
    </div>
  )
}

export default About
