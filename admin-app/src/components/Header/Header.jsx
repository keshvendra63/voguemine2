import React, {useState} from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import profile from '../../images/profile.png'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StyleIcon from '@mui/icons-material/Style';
import PersonIcon from '@mui/icons-material/Person';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import InsightsIcon from '@mui/icons-material/Insights';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import BalanceIcon from '@mui/icons-material/Balance';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
const Header = () => {
  const [menuVisibility, setMenuVisibility] = useState({
    orders: false,
    products: false,
    analytics: false,
    marketing: false,
    collections:false,
      
  });

  const handleSubMenuClick = (menu) => {
    if (menuVisibility[menu]) {
      return; // If submenu is already open, do nothing
    }
    toggleMenu(menu);
  };

  const toggleMenu = (menu) => {
    setMenuVisibility(prevState => ({
      ...Object.fromEntries(Object.entries(prevState).map(([key, value]) => [key, key === menu ? !value : false]))
    }));
  };
  const [openNav,setOpenNav]=useState("-100%")
  const [hamDisplay,setHamDisplay]=useState("block")
  const [closeDisplay,setCloseDisplay]=useState("none")
  const openNavbar=()=>{
    setOpenNav("0")
    setHamDisplay("none")
    setCloseDisplay("block")
  }
  const closeNavbar=()=>{
    setOpenNav("-100%")
    setHamDisplay("block")
    setCloseDisplay("none")
  }




  return (
    <>
    <div className="header">
        <div className="left">
          <div className="logo">
            <h1>VOGUEMINE</h1>
          </div>
          <div className="hamburger">
            <MenuIcon onClick={openNavbar} style={{display:hamDisplay}}/>
            <CloseIcon onClick={closeNavbar} style={{display:closeDisplay}}/>
          </div>
        </div>
        <div className="center">
            <div className="search">
              <input type="search" name="search" id="search" placeholder='Search Products'/>
              <SearchIcon/>
            </div>
        </div>
        <div className="right">
          <div className="profile">
            <img src={profile} alt="img" />
          </div>
        </div>
    </div>
    <div className="header2" style={{left:openNav}}>
      <ul>
        <li onClick={() => toggleMenu('home')}><Link to="/admin"><HomeIcon className='nav-icon'/>Home</Link>
        </li>
        <li onClick={() => toggleMenu('orders')}><Link to="/orders"><ListAltIcon className='nav-icon'/>Orders</Link></li>
        <li onClick={() => toggleMenu('products')}><Link to="/product"><StyleIcon className='nav-icon'/>Products</Link></li>
        <li onClick={() => toggleMenu('collections')}><Link to="/collection"><StyleIcon className='nav-icon'/>Collections</Link></li>
        <li onClick={() => toggleMenu('customers')}><Link to="/customer"><PersonIcon className='nav-icon'/>Customers</Link></li>
        <li onClick={() => toggleMenu('content')}><Link to="#"><ArtTrackIcon className='nav-icon'/>Content</Link></li>
        <li onClick={() => toggleMenu('analytics')}><Link to="#"><InsightsIcon className='nav-icon'/>Analytics</Link>
        <ul className='nav-menu' style={{ display: menuVisibility['analytics'] ? 'block' : 'none' }}>
          <li onClick={() => toggleMenu('analytics')}><Link to="">Reports</Link></li>
          <li onClick={() => toggleMenu('analytics')}><Link to="">Live View</Link></li>
        </ul></li>
        <li onClick={() => toggleMenu('discount')}><Link to="/discount"><BalanceIcon className='nav-icon'/>Discount</Link></li>
      </ul>
      <p className='setting'><SettingsIcon className='nav-icon'/>Setting</p>
    </div>
    
    </>
  )
}

export default Header
