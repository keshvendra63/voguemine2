import React, { useState, useEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
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
import {Link,useNavigate} from 'react-router-dom'
import './header.css'
import { registerUser,loginUser,forgotPasswordToken, getUserCartProduct } from '../../features/user/userSlice';
import {getAProduct, getAllProducts} from '../../features/products/productSlice'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
const delayExecution = (mls) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("ok"), mls);
  });
};

const signupSchema=yup.object({
  firstname:yup.string().required("First Name is required"),
  lastname:yup.string().required("Last Name is required"),
  email:yup.string().email("Email should be valid").required("Email is Required"),
  mobile:yup.string().required("Mobile number is required"),
  password:yup.string().required("Password is required")
})
const loginSchema=yup.object({
  email:yup.string().email("Email should be valid").required("Email is Required"),
  password:yup.string().required("Password is required")
})
const emailSchema=yup.object({
  email:yup.string().email("Email should be valid").required("Email is Required"),
})
const Header = () => {
  const [paginate, setPaginate] = useState(true);
  const [productOpt,setProductOpt]=useState([])
  const productState=useSelector((state)=>state?.product?.product)
  const placeholderText = ["Search Shirts", "Search Loafers", "Search Dresses"];
  const [state, setState] = useState("");
  const [search,setSearch] =useState("none")

const dispatch=useDispatch()

  const openSearch=()=>{
    setSearch("flex")
    setScrolled(true);
  }
  const closeSearch=()=>{
    setSearch("none")
    setScrolled(false);

  }
  useEffect(() => {
    const limit = 5000;
    const page = 1;
    const collectionName = ""; // Update this if needed

    const fetchData = async () => {
      try {
        if (collectionName) {
          await dispatch(getAllProducts({ limit, page, collectionName }));
        } else {
          await dispatch(getAllProducts({ limit, page }));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [dispatch])
const navigate=useNavigate()
  const changePlaceholder = async () => {
    for (let i = 0; ; i = (i + 1) % placeholderText.length) {
      await delayExecution(3000);
      setState(placeholderText[i]);
    }  
  };
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // Increment the image index to load the next image URL
    setImageIndex(prevIndex => prevIndex + 1);
  }; 
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      // Extracting all relevant product details for search
      const imageUrl = element?.images[imageIndex]?.url;
      const details = `${element.sku} ${element.title} ${element.description}`;
      data.push({ id: index, prod: element?._id, details,imageUrl }); // Include all relevant details
    }
    setProductOpt(data);
  }, [productState]);

useEffect(()=>{
  changePlaceholder()
})
  const hamClick=()=>{
    document.getElementById("head2").style.left=0
  }
  const closeClick=()=>{
    document.getElementById("head2").style.left="-100%"
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
            <li className='li-search'><Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          navigate(`/product/${selected[0]?.prod}`)
          dispatch(getAProduct(selected[0]?.prod))
        }}
        minLength={2}
        options={productOpt}
        labelKey={"details"}
        paginate={paginate}
        placeholder={state}
      /><SearchIcon /></li>
            <li><Link to="/wishlist"><FavoriteBorderIcon/></Link></li>
            <li><Link to="/cart"><LocalMallIcon/></Link></li>
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
              <li onClick={closeClick}><FavoriteBorderIcon/><Link to="/wishlist">Wishlist</Link></li>
              <li onClick={closeClick}><PersonOutlineIcon/><p onClick={loginOpen}>Login/Register</p></li>
              
            </ul>
        </div>
      </div>
      <div className="search" style={{display:search}}>
      <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          setSearch("none")
          setScrolled(false);
          navigate(`/product/${selected[0]?.prod}`)
          dispatch(getAProduct(selected[0]?.prod))
          
        }}
        minLength={2}
        options={productOpt}
        labelKey={"details"}
        paginate={paginate}
        placeholder="Search here"
        renderMenuItemChildren={(option) => (
          <div>
            <img src={option.imageUrl} alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} onError={handleImageError}/>
            <span>{option.details}</span>
          </div>
        )}
      />
          <li onClick={closeSearch}><ClearOutlinedIcon style={{cursor:'pointer'}}  /></li>
        </div>

    </div>
  )
}

export default Header
