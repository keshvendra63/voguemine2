import React from 'react'
import './category.css'
import banner from '../../images/A21.jpg'
import about_img from '../../images/about-img.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux'

const About = () => {
  const bannerState=useSelector((state)=>state?.banner?.banner)
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };

  return (
    <div className='categoryPage'>
            <div className="category-banner">
            <img src={modifyCloudinaryUrl(bannerState[33]?.images[0]?.url) || banner} alt={bannerState[33]?.alt} />
      </div>
      <div className="about margin-section">
        <div className="left-about">
            <img src={modifyCloudinaryUrl(bannerState[37]?.images[0]?.url) || about_img} alt={bannerState[39]?.alt} />
            
        </div>
        <div className="right-about">
            <h1>ABOUT RAMPVALK</h1>
            <p>At Rampvalk, we understand, style is not just about what you wear, it's about how you feel. That's why we go above and beyond to provide an exceptional shopping experience, with attentive customer service and a user-friendly online platform that makes it easy to find the perfect addition of collection to your luxurious wardrobe.



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
  <img src={bannerState[34]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1713514549/00005_qdvxte.jpg"} alt={bannerState[34]?.alt} style={{width:'100%'}}/>
</div> */}

    </div>
  )
}

export default About
