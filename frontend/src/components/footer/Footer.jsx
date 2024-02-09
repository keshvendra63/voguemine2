import React from 'react'
import './footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link} from 'react-router-dom'
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
const Footer = () => {
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Adds smooth scrolling effect
    });
  };

  return (
    <div className='footer'>
        <Container>
      <Row>
        <Col className='my-2 mx-2'>
        <h2>Collection</h2>
        <ul>
            <li><Link to="#">Men</Link></li>
            <li><Link to="#">Women</Link></li>
            <li><Link to="#">Kids</Link></li>
            <li><Link to="#">Accessories</Link></li>
        </ul>
        </Col>
        <Col className='my-2 mx-2'>
        <h2>Useful Links</h2>
        <ul>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Contact Us</Link></li>
            <li><Link to="#">Track Order</Link></li>
            <li><Link to="#">Exchange Order</Link></li>
        </ul>
        </Col>
        <Col className='my-2 mx-2'>
        <h2>Policies</h2>
        <ul>
            <li><Link to="#">Shipping Policy</Link></li>
            <li><Link to="#">Exchange Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
        </ul>
        </Col>
        <Col className='my-2 mx-2'>
        <h2>Contact Information</h2>
        <ul>
            <li>Phone: <Link to="tel:+919899202079">+91 9899202079</Link></li>
            <li>Email: <Link to="mailto:customersupport@voguemine.com">customersupport@voguemine.com</Link></li>
            <ul>
                <li><Link to="#"><InstagramIcon/></Link></li>
                <li><Link to="#"><FacebookIcon/></Link></li>
                <li><Link to="#"><LinkedInIcon/></Link></li>
            </ul>
        </ul>
        </Col>
      </Row>
    </Container>
    <hr style={{color:'white'}}/>
    <p>&copy; 2024, Voguemine</p>
    <div className="arrow-top" style={{position:'fixed',bottom:'20px',right:'20px', backgroundColor:'grey',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',cursor:'pointer'}}>
      <KeyboardDoubleArrowUpOutlinedIcon onClick={handleButtonClick} style={{fontSize:'30px'}}/>
      </div>
    </div>
  )
}

export default Footer
