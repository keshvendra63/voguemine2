import './newlogin.css';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import MailSharpIcon from '@mui/icons-material/MailSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import AddIcCallSharpIcon from '@mui/icons-material/AddIcCallSharp';
import React, { useState, useEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser,loginUser} from '../../features/user/userSlice';
import {Link,useNavigate} from 'react-router-dom'
import logo from '../../images/logo.png'
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
function Newlogin() {
  const [showPassword, setShowPassword] = useState(false);
const [login,setLogin]=useState(true)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    
      setShowPassword(!showPassword);
    };
  
    const authState=useSelector(state=>state?.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
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
                
              },300)
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
                
              },300)
            
            }
          })
          
  return (
    <div className='newlogin'>
      <div className="loginpage">
        <div className='background'>
            <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516920/00010_fwk3rg.jpg" alt="" />
          <div className="icon">
            <div className="welcome">
            <p className='title' style={{fontSize:'30px',fontWeight:'600'}}>Welcome to Voguemine</p>
          </div>
          </div>
          
        </div>
        {
          login?<div className="form">
                    <form action="" onSubmit={formik.handleSubmit}>
          <div className="form-detail">
            <p className='register'>Register</p>
            <div className="input">
              <div className="inputbox">
                <PersonSharpIcon className='profileicon'/>
                <input type="text" name='firstname' placeholder='First Name' value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}/><br />
              </div>
              <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

              <div className="inputbox">
                <PersonSharpIcon className='profileicon'/>
                <input type="text" name='lastname' placeholder='Last Name' value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/><br />
              </div>
              <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

            <div className="inputbox">
                <MailSharpIcon className='profileicon'/>
                <input type="email" name='email' placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}/><br />
              </div>
              <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
            
              <div className="inputbox">
                <AddIcCallSharpIcon className='profileicon'/>
                <input 
                  type='number' 
                  name='password'
                  placeholder='Phone'
                  value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}
                  
                />
                
              </div>
              <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

              <div className="inputbox">
                <LockSharpIcon className='profileicon'/>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='password'
                  value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")}
                />
                <RemoveRedEyeSharpIcon 
                  className='visibilityicon' 
                  onClick={togglePasswordVisibility} 
                />
              </div>
              <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <input type="submit" value="Register" />
            <p className='new-account' onClick={()=>setLogin(false)}>Already a User? Login</p> 
            
            </div>
           
          </div> 
          </form>
        </div>
        :
<div className="form">
<form action="" onSubmit={formik1.handleSubmit}>

          <div className="form-detail">
            <p className='login'>Log In</p>
            <div className="input">
              <div className="inputbox">
                <PersonSharpIcon className='profileicon'/>
                <input type="text" name='email' placeholder='Email' value={formik1.values.email} onChange={formik1.handleChange("email")} onBlur={formik1.handleBlur("email")}/><br />
              </div>
              <div className="error">
                    {formik1.touched.email && formik1.errors.email}
                  </div>
              <div className="inputbox">
                <LockSharpIcon className='profileicon'/>
                <input 
                name='password'
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='Password'
                  value={formik1.values.password} onChange={formik1.handleChange("password")} onBlur={formik1.handleBlur("password")}
                />
                <VisibilitySharpIcon 
                  className='visibilityicon' 
                  onClick={togglePasswordVisibility} 
                />
              </div>
              <div className="error">
                    {formik1.touched.password && formik1.errors.password}
                  </div>
               
              <p className='forgot-password'>Forgot password</p>   
              <input type="submit" value="Login" />
            <p className='new-account' onClick={()=>setLogin(true)}>Create a new account?</p> 
            </div>
           
          </div> 
          </form>
        </div>
        }
       
      </div>
    </div>
    
  );
}

export default Newlogin;
