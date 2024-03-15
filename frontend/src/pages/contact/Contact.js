import React from 'react'
import './contact.css'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { Link} from 'react-router-dom';
const Contact = () => {

  return (
    <div className='contact'>
      <div className="contacts-page margin-section">
        <div className="contact-left">
            <div className="form">
                <p>Get in Touch</p>
                <p>Feel free to drop us a line below!</p>
                <form action="">
                    <div className="name">
                        <input type="text" name="" id="" placeholder='Your Name'/>
                    </div>
                    <div className="email">
                        <input type="email" name="" id="" placeholder='Your Email'/>
                    </div>
                    <div className="msg">
                        <textarea name="" id="" cols="30" placeholder='Typing your message here....'></textarea>
                    </div>
                    <input type="submit" value="SEND" className='submit-btn'/>
                    <Link to="tel:+919899202079" className='call'>Call Now</Link>
                </form>
            </div>
            <div className="blank">

            </div>
        </div>
        <div className="contact-right">
                <p>Contact Us</p>
                <div><LocationCityIcon/><p>H-119, Sector 63, Noida, U.P, 201301, India</p></div>
                <div><EmailIcon/><p>customersupport@voguemine.com</p></div>
                <div><PermPhoneMsgIcon/><p>+91 9899202079</p></div>
        </div>
      </div>
    </div>
  )
}

export default Contact
