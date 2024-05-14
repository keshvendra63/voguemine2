import React from 'react'
import './footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Link} from 'react-router-dom'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux'

const Footer = () => {
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Adds smooth scrolling effect
    });
  };
  const bannerState=useSelector((state)=>state?.banner?.banner)

  return (
    <div className='footer' style={{backgroundImage:`url("${bannerState && bannerState[40]?.images[0]?.url}")`}}>
        <Container>
      <Row>
        <Col className=''>
        <h2>Collection</h2>
        <ul>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
        </ul>
        </Col>
        <Col className=''>
        <h2>Useful Links</h2>
        <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/pages/contact">Contact Us</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>

            {/* <li><Link to="#">Track Order</Link></li>
            <li><Link to="#">Exchange Order</Link></li> */}
        </ul>
        </Col>
        <Col className=''>
        <h2>Policies</h2>
        <ul>
            <li><Link to="/pages/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/pages/refund-and-return-policy">Exchange Policy</Link></li>
            <li><Link to="/pages/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/pages/privacy-policy">Privacy Policy</Link></li>

        </ul>
        </Col>
        <Col className=''>
        <h2>Contact Information</h2>
        <ul>
            <li>Phone: <Link to="tel:+919899202079">+91 9899202079</Link></li>
            <li>Email: <Link to="mailto:customersupport@voguemine.com">customersupport@voguemine.com</Link></li>
            <li>Address:Noida, U.P, 201301</li>
            <ul>
                <li><Link to="https://www.instagram.com/voguemine_fashion/"><InstagramIcon/></Link></li>
                <li><Link to="https://www.facebook.com/vogueminefashion"><FacebookIcon/></Link></li>
            </ul>
        </ul>
        </Col>
      </Row>
    </Container>
    <hr style={{color:'white'}}/>
    <p className='copyright'>&copy; 2024, Voguemine</p>
    <div className="arrow-top">
      <ArrowUpwardIcon onClick={handleButtonClick} style={{fontSize:'25px'}}/>
      </div>
    </div>
  )
}

export default Footer
