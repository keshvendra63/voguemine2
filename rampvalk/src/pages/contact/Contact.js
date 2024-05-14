import React from 'react'
import './contact.css'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import { Link} from 'react-router-dom';
const Contact = () => {

  return (
    <div className='contact margin-section'>
      <div className="contacts-page">
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
                </form>
            </div>
            <div className="blank">

            </div>
        </div>
        <div className="contact-right">
                <p>Contact Us</p>
                <div><LocationCityIcon/><p>Noida, U.P, 201301, India</p></div>
                <div><EmailIcon/><p>customersupport@voguemine.com</p></div>
                <div><PermPhoneMsgIcon/><p>+91 9899202079</p></div>
        </div>
      </div>
      <div className="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d448182.50738077075!2d77.0932634!3d28.6469655!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1715351721448!5m2!1sen!2sin" width="100%" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>      </div>
    </div>
  )
}

export default Contact
