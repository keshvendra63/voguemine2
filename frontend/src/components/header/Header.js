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

  const openSearch=()=>{
    setSearch("flex")
    setScrolled(true);
  }
  const closeSearch=()=>{
    setSearch("none")
    setScrolled(false);

  }
  useEffect(()=>{
    changePlaceholder()
  })
const navigate=useNavigate()
  const changePlaceholder = async () => {
    for (let i = 0; ; i = (i + 1) % placeholderText.length) {
      await delayExecution(3000);
      setState(placeholderText[i]);
    }  
  };
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      // Extracting all relevant product details for search
      const details = `${element.sku} ${element.description} ${element.title}`;
      data.push({ id: index, prod: element?._id, details }); // Include all relevant details
    }
    setProductOpt(data);
  }, [productState]);

  const [loginForm, setLoginForm] =useState("register")
  const loginClick=()=>{
    setLoginForm("login")
  }
  const registerClick=()=>{
    setLoginForm("register")
  }

  const forgotClick=()=>{
    setLoginForm("forgotPassword")
  }
  const [login,setLogin]= useState("none")
  const loginClose=()=>{
    setLogin("none")
  }
  const hamClick=()=>{
    document.getElementById("head2").style.left=0
  }
  const closeClick=()=>{
    document.getElementById("head2").style.left="-100%"
  }
const authState=useSelector(state=>state?.auth)
const loginOpen=()=>{
  if(authState?.user===null){
    setLogin("flex")
  }
  else{
    navigate("/profile")
  }
  
}
const dispatch=useDispatch()
const formik=useFormik({
  initialValues:{
    firstname:"",
    lastname:"",
    email:"",
    mobile:"",
    password:"",
  },
  validationSchema:signupSchema,
  onSubmit:(values)=>{
    dispatch(registerUser(values))
    setTimeout(()=>{
        navigate('/home')
        setLogin('none')
      
    },1000)
  }
})
const formik1=useFormik({
  initialValues:{
    email:"",
    password:"",
  },
  validationSchema:loginSchema,
  onSubmit:(values)=>{
    dispatch(loginUser(values))
    setTimeout(()=>{
      
        navigate('/home')
        setLogin('none')
      
    },1000)
  
  }
})

const formik2=useFormik({
  initialValues:{
    email:"",
  },
  validationSchema:emailSchema,
  onSubmit:(values)=>{
    dispatch(forgotPasswordToken(values))
        setLogin('none')
  }
})


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
        labelKey={"name"}
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
              <li onClick={closeClick}><PersonOutlineIcon/><Link onClick={loginOpen}>Login/Register</Link></li>
              
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
        labelKey={"sku"}
        paginate={paginate}
        placeholder="Search here"
      />
          <li onClick={closeSearch}><ClearOutlinedIcon style={{cursor:'pointer'}}  /></li>
        </div>
      <div className="login" style={{display:login}}>
        {
          loginForm==="register"?( <div className="login-box">
          <div className="login-left">
              <h1>Already a User ?</h1>
              <p>Thank you for be a family of Voguemine.</p>
              <button className='form-button' onClick={loginClick}>Login</button>
        </div>
        <div className="login-right">
            <h2 style={{textAlign:'center',marginBottom:'20px'}}>Register</h2>
            <ClearOutlinedIcon style={{position:'absolute',right:'10px',top:'10px',color:'black',cursor:'pointer'}} onClick={loginClose}/>
            <form action="" onSubmit={formik.handleSubmit}>
            <div className="first-name">
                <input type="text" name="firstname" id="first-name" placeholder='First Name' value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}/>
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
            </div>
            <div className="last-name">
                <input type="text" name="lastname" id="last-name" placeholder='Last Name' value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/>
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
            </div>
            <div className="email">
                <input type="email" name="email" id="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
            </div>
            <div className="phone-number">
                <input type="number" name="mobile" id="mobile" placeholder='Mobile' value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}/>
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
            </div>
            <div className="password">
                <input type="password" name="password" id="password" placeholder='Password' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}/>
               
  <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
            </div>
            <input type="submit" value="Register" />
            </form>
        </div>
          </div>)
          : loginForm==="login"?( <div className="login-box">
          <div className="login-left">
              <h1>New To Voguemine</h1>
              <p>Thank you for be a family of Voguemine.</p>
              <button className='form-button' onClick={registerClick}>Register</button>
        </div>
        <div className="login-right">
            <h2 style={{textAlign:'center',marginBottom:'20px'}}>Login</h2>
            <ClearOutlinedIcon style={{position:'absolute',right:'10px',top:'10px',color:'black',cursor:'pointer'}} onClick={loginClose}/>
            <form action="" onSubmit={formik1.handleSubmit}>
            <div className="email">
                <input type="email" name="email" id="email" placeholder='Email' value={formik1.values.email} onChange={formik1.handleChange("email")} onBlur={formik1.handleBlur("email")}/>
                <div className="error">
                    {formik1.touched.email && formik1.errors.email}
                  </div>
            </div>
            <div className="password">
                <input type="password" name="password" id="password" placeholder='Password' value={formik1.values.password} onChange={formik1.handleChange("password")} onBlur={formik1.handleBlur("password")}/>
                <div className="error">
                    {formik1.touched.password && formik1.errors.password}
                  </div>
               
            </div>
            <p style={{cursor:'pointer',color:'blue'}} onClick={forgotClick}>forgot password?</p>
            <input type="submit" value="Login" />
            </form>
        </div>
          </div>)
          : <div className="login-box forgot">
          
        <div className="login-right">
              <h1>Forgot Password</h1>
              <p>We will send you a link to your email to reset password.</p>
            <ClearOutlinedIcon style={{position:'absolute',right:'10px',top:'10px',color:'black',cursor:'pointer'}} onClick={loginClose}/>
            <form action="" onSubmit={formik2.handleSubmit}>
            <div className="email">
                <input type="email" name="email" id="email" placeholder='Email' value={formik2.values.email} onChange={formik2.handleChange("email")} onBlur={formik2.handleBlur("email")}/>
                <div className="error">
                    {formik2.touched.email && formik2.errors.email}
                  </div>
            </div>
            <input type="submit" value="Send Link" />
            </form>
            <button className='form-button' onClick={loginClick}>Back to Login</button>
        </div>
          </div>


        }
        
        
      

      </div>
    </div>
  )
}

export default Header
