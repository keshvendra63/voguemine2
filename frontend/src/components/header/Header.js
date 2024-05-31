import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import Carousel from 'react-bootstrap/Carousel';
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
import logo from '../../images/vlogo.png'
import {Link,useNavigate} from 'react-router-dom'
import './header.css'
import {getProducts} from '../../features/products/productSlice'
import {getAllBanner} from '../../features/banner/bannerSlice'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {getAllCollection} from '../../features/collection/collectionSlice'

const delayExecution = (mls) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), mls);
  });
};

const Header = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const productState=useSelector((state)=>state?.product?.prdt)
  const placeholderText = ["Search Shirts", "Search Loafers", "Search Dresses"];
  const [state, setState] = useState("");
  const [search,setSearch] =useState("none")
  const [svalue,setSvalue]=useState("")
  const [isHead2Open, setIsHead2Open] = useState(false); // Define isHead2Open state variable
  const bannerState=useSelector((state)=>state?.banner?.banner)

const dispatch=useDispatch()
useEffect(()=>{
  dispatch(getAllCollection())
  dispatch(getAllBanner())
},[dispatch])
  const openSearch=()=>{
    setSearch("flex")
    setScrolled(true);

  }
  const closeSearch=()=>{
    setSearch("none")
    setScrolled(false);


  }
  const cart=JSON.parse(localStorage.getItem("cart"))
  const wishlist=JSON.parse(localStorage.getItem("wishlist"))
const navigate=useNavigate()
  const changePlaceholder = async () => {
    for (let i = 0; ; i = (i + 1) % placeholderText.length) {
      await delayExecution(3000);
      setState(placeholderText[i]);
    }  
  };
  const [imageIndex, setImageIndex] = useState(0);


useEffect(()=>{
  dispatch(getProducts())
  changePlaceholder()
},[])
  const hamClick=()=>{
    document.getElementById("head2").style.left=0
    setIsHead2Open(true)
    document.body.classList.add('no-scroll'); // Add class to prevent scrolling

  }
  const closeClick=()=>{
    document.getElementById("head2").style.left="-100%"
    setIsHead2Open(false)
    document.body.classList.remove('no-scroll'); 

  }
const authState=useSelector(state=>state?.auth)
const loginOpen=()=>{
  if(authState?.user===null){
    navigate('/login')
  }
  else{
    navigate("/profile")
  }
  
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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      localStorage.setItem("search",JSON.stringify({
        mysearch:svalue
        
      }))
     
        navigate(`/products`)
        setSearch("none")
    setScrolled(false);
    }
    
};
const handleKeyDown1 = (event) => {
  localStorage.setItem("search",JSON.stringify({
    mysearch:svalue
  }))
      navigate(`/products`)
      setSearch("none")
  setScrolled(false);
  
  
};

  return (
    <>
    <div className="main-head">
    <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
      <Carousel.Item interval={3500}>
        <p style={{marginTop:'10px'}}>Get 10% Off + Free Shipping on Prepaid Orders</p>
      </Carousel.Item>
      <Carousel.Item interval={3500}>
      <p style={{marginTop:'10px'}}>    Use code "SAVE5" and get 15% off</p>
      </Carousel.Item>
  
    </Carousel>


    </div>
    <div className={`header ${scrolled ? 'scrolled' : ''}`} style={{backgroundColor:search==="flex"?'white':''}}>
    {isHead2Open && <div className="overlay" onClick={closeClick}></div>}
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
          <li onClick={openSearch}><SearchIcon className='s-icon'/></li>
            <li className='cart-len'>{
              wishlist && wishlist?.length>=1?<p className='cart-length'>{wishlist?.length}</p>
              :
              ""
            }<Link to="/wishlist"><FavoriteBorderIcon className='back-ic'/></Link></li>
            <li className='cart-len'>{
              cart && cart?.length>=1?<p className='cart-length'>{cart?.length}</p>
              :
              ""
            }<Link to="/cart"><LocalMallIcon className='back-ic'/></Link></li>
            <li onClick={loginOpen}>{
              authState?.user==null?<PersonOutlineIcon/>:<p style={{fontWeight:500,fontSize:'11px',marginBottom:0,display:'flex',justifyContent:'center',alignItems:'center',border:'2px solid black',borderRadius:'50%',width:'20px',height:'20px',marginTop:'3px',padding:'2px'}}>{authState?.user?.firstname.charAt(0).toUpperCase()}</p>
            }</li>
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
            <li onClick={openSearch}><SearchIcon className='mob-s'/></li>
            
            <li className="cart-len">{
              cart && cart?.length>=1?<p className='cart-length'>{cart?.length}</p>
              :
              ""
            }<Link to="/cart"><LocalMallIcon className='cart-i back-ic'/></Link></li>


          </ul>
              

        </div>
      </div>
      <div className='head2' style={{textAlign:'center'}} id='head2'>
      <div className='head1'>
            <Link to="/home"><img src={logo} alt=""/></Link>
        </div>
            <ClearOutlinedIcon className='cancel-icon' id="close-ham" onClick={closeClick}/>
            <ul>
              
              
              <li onClick={closeClick}><Link to="/home"><HomeOutlinedIcon/> Home</Link></li>
              <li onClick={closeClick}><Link to="/men"><Face6OutlinedIcon/> Mens</Link></li>
              <li onClick={closeClick}><Link to="/women"><Face4OutlinedIcon/> Womens</Link></li>
              <li onClick={closeClick}><Link to="/kids"><FaceOutlinedIcon/> Kids</Link></li>
              <li onClick={closeClick}><Link to="/accessories"><AutoAwesomeMosaicOutlinedIcon/> Accessories</Link></li>
              <li onClick={closeClick}><Link to="/blogs"><FaceOutlinedIcon/> Blogs</Link></li>
              <li onClick={closeClick}><Link to="/about"><InfoOutlinedIcon/> About</Link></li>
              <li onClick={closeClick}><Link to="/wishlist"><FavoriteBorderIcon/> Wishlist ( {wishlist?.length} )</Link></li>
              <li onClick={closeClick}><Link to="/profile"><PersonOutlineIcon/> Login/Register</Link></li>
              
            </ul>
        </div>
      </div>
      <div className="search" style={{display:search}}>
      <input type="search" placeholder={state} value={svalue} onChange={(e)=>setSvalue(e.target.value)} onKeyDown={handleKeyDown} />
          <li onClick={closeSearch}><ClearOutlinedIcon style={{cursor:'pointer'}}  /></li>
        </div>

    </div>
    </>
  )
}

export default Header
