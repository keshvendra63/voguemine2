import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Face6OutlinedIcon from '@mui/icons-material/Face6Outlined';
import Face4OutlinedIcon from '@mui/icons-material/Face4Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import './header.css'
const delayExecution = (mls) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), mls);
  });
};
const Header = () => {
  const placeholderText = ["Search Shirts", "Search Loafers", "Search Dresses"];
  const [state, setState] = useState("");
  const [search,setSearch] =useState("none")
  const openSearch=()=>{
    setSearch("flex")
  }
  const closeSearch=()=>{
    setSearch("none")

  }

  const changePlaceholder = async () => {
    for (let i = 0; ; i = (i + 1) % placeholderText.length) {
      await delayExecution(3000);
      setState(placeholderText[i]);
    }  
  };

  useEffect(() => {
    changePlaceholder();
  },[]);

  const [loginForm, setLoginForm] =useState("register")
  const [password,setPassword] = useState("password")
  const [show,setShow] = useState("show")
  const showClick=()=>{
    setPassword("text")
    setShow("Hide")
  }
  const hideClick=()=>{
    setPassword("password")
    setShow("Show")
  }
  const loginClick=()=>{
    setLoginForm("login")
  }
  const registerClick=()=>{
    setLoginForm("register")
  }
  const [login,setLogin]= useState("none")
  const loginOpen=()=>{
    setLogin("flex")
  }
  const loginClose=()=>{
    setLogin("none")
  }
  const hamClick=()=>{
    document.getElementById("head2").style.left=0
  }
  const closeClick=()=>{
    document.getElementById("head2").style.left="-100%"
  }
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  return (
    <div className={`header ${scrolled ? 'scrolled' : ''}`}>
      
      <div className="headerdiv">
        <div className='head1'>
            <Link to="/home"><img src={logo} alt="" style={{width:'180px'}}/></Link>
        </div>
        <div className='head2' style={{textAlign:'center'}}>
            <ul>
            <li><Link to="/home">Home</Link></li>
              <li><Link to="/men">Mens</Link></li>
              <li><Link to="/women">Womens</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
        </div>
        <div className='head3' style={{textAlign:'right'}}>
          <ul>
            <li className='li-search'><input type="search" name="" id="" placeholder={state}/><SearchIcon /></li>
            <li><Link to="product"><FavoriteBorderIcon/></Link></li>
            <li><Link to="/cart"><LocalMallIcon/></Link></li>
            <li onClick={loginOpen}><PersonOutlineIcon/></li>
          </ul>
              

        </div>
       
      </div>
      
      <div className="header1">
      <div className="headerdiv1">
      <div className="hamburger">
        <MenuOutlinedIcon className='icon' id="hamburger" onClick={hamClick} />
      </div>
        <div className='head1'>
            <Link to="/home"><img src={logo} alt=""/></Link>
        </div>
        
        <div className='head3' style={{textAlign:'right'}}>
          <ul>
            <li onClick={openSearch}><SearchIcon/></li>
            
            <li><Link to="/cart"><LocalMallIcon/></Link></li>


          </ul>
              

        </div>
      </div>
      <div className='head2' style={{textAlign:'center'}} id='head2'>
      <div className='head1'>
            <Link to="/home"><img src={logo} alt=""/></Link>
        </div>
            <ClearOutlinedIcon className='cancel-icon' id="close-ham" onClick={closeClick}/>
            <ul>
              
              
              <li onClick={closeClick}><HomeOutlinedIcon/><Link to="/home">Home</Link></li>
              <li onClick={closeClick}><InfoOutlinedIcon/><Link to="/about">About</Link></li>
              <li onClick={closeClick}><Face6OutlinedIcon/><Link to="/men">Mens</Link></li>
              <li onClick={closeClick}><Face4OutlinedIcon/><Link to="/women">Womens</Link></li>
              <li onClick={closeClick}><FaceOutlinedIcon/><Link to="/kids">Kids</Link></li>
              <li onClick={closeClick}><AutoAwesomeMosaicOutlinedIcon/><Link to="/accessories">Accessories</Link></li>
              <li onClick={closeClick}><FavoriteBorderIcon/><Link to="/product">Wishlist</Link></li>
              <li onClick={closeClick}><PersonOutlineIcon/><Link onClick={loginOpen}>Login/Register</Link></li>
              
            </ul>
        </div>
      </div>
      <div className="search" style={{display:search}}>
          <input type="search" name="" id="" placeholder='Search'/>
          <li onClick={closeSearch}><ClearOutlinedIcon style={{cursor:'pointer'}}  /></li>
        </div>
      <div className="login" style={{display:login}}>
        {
          loginForm==="register"? <div className="login-box">
          <div className="login-left">
              <h1>Already a User ?</h1>
              <p>Thank you for be a family of Voguemine.</p>
              <button className='form-button' onClick={loginClick}>Login</button>
        </div>
        <div className="login-right">
            <h2 style={{textAlign:'center',marginBottom:'20px'}}>Register</h2>
            <ClearOutlinedIcon style={{position:'absolute',right:'-30px',top:'-30px',color:'white',cursor:'pointer'}} onClick={loginClose}/>
            <div className="first-name">
                <input type="text" name="firstname" id="first-name" placeholder=' Name'/>
            </div>
            <div className="email">
                <input type="email" name="email" id="email" placeholder='Email'/>
            </div>
            <div className="phone-number">
                <input type="number" name="phone" id="phone" placeholder='Phone'/>
            </div>
            <div className="password">
                <input type={password} name="password" id="password" placeholder='Password'/>
                {
                  show==="Show"? <p onClick={showClick}>
                    {
                      password==="password"?"Show":"Hide"
                    }
                  </p> :  <p onClick={hideClick}>
                  {
                      password==="password"?"Show":"Hide"
                    }
                  </p>
                }

            </div>
            <div className="password">
                <input type="text" name="confirm-password" id="confirm-password" placeholder='Confirm Password'/>
                
            </div>
            <button className='form-button'>Register</button>
        </div>
          </div>
          :
          <div className="login-box">
        <div className="login-left">
            <h1>New To Voguemine</h1>
            <p>Thank you for be a family of Voguemine.</p>
            <button className='form-button' onClick={registerClick}>Register</button>
      </div>
      <div className="login-right">
          <h2 style={{textAlign:'center',marginBottom:'20px'}}>Login</h2>
          <ClearOutlinedIcon style={{position:'absolute',right:'-30px',top:'-30px',color:'white',cursor:'pointer'}} onClick={loginClose}/>
          <div className="email">
              <input type="email" name="email" id="email" placeholder='Email'/>
          </div>
          <div className="password">
              <input type={password} name="password" id="password" placeholder='Password'/>
              {
                  show==="Show"? <p onClick={showClick}>
                    {
                      password==="password"?"Show":"Hide"
                    }
                  </p> :  <p onClick={hideClick}>
                  {
                      password==="password"?"Show":"Hide"
                    }
                  </p>
                }
          </div>
          <button className='form-button'>Login</button>
      </div>
        </div>

        }
        
        
      

      </div>
    </div>
  )
}

export default Header
