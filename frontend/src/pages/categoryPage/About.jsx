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
            <h1>ABOUT VOGUEMINE</h1>
            <p>At the Voguemine, we understand, style is not just about what you wear, it's about how you feel. That's why we go above and beyond to provide an exceptional shopping experience, with attentive customer service and a user-friendly online platform that makes it easy to find the perfect addition of collection to your luxurious wardrobe.



</p>
<p>Our team of fashion experts has scoured the globe to curate a stunning selection of authentic, pre-owned luxury products, from high-end designer apparel, accessories and footwear. Each piece has been carefully inspected to ensure that it meets our attentive standards of quality and authenticity.</p>
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
      <div className="ourteam">
    <h2>Meet Our Team</h2>
   </div>
    <div className='teams'>
        <div className="team">
          <img src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwZGV2bG9wZXJ8ZW58MHx8MHx8fDA%3D" alt="" />
          <p className='name'>Raj Bisht</p>
          <p className='detail'>Managing Director</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
        <div className="team">
          <img src="https://media.istockphoto.com/id/960588036/photo/thinking.jpg?s=1024x1024&w=is&k=20&c=Qf5bxGaqNWwEnyvZppQqWjj9PyGwM3S5yt_5GVtXNQs=" alt="" />
          <p className='name'>Mohinder Bisht</p>
          <p className='detail'>CEO</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
        <div className="team">
          <img src="https://media.istockphoto.com/id/1450969750/photo/colleagues-working-over-new-software.jpg?s=1024x1024&w=is&k=20&c=WTt54WE6FR8DOHQYWpdL9inxIEELJ32VKjKV2QSy8fc=" alt="" />
          <p className='name'>Monika Bisht</p>
          <p className='detail'>Co-founder</p>
          <div className="icons">
          <FacebookIcon  className='icon'/> 
          <InstagramIcon className='icon'/>
          <LinkedInIcon className='icon'/>

          </div>
        </div>
        <div className="team">
          <img src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYm95fGVufDB8fDB8fHww" alt="" />
          <p className='name'>Daljeet Kaur</p>
          <p className='detail'>HR Manager</p>
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
