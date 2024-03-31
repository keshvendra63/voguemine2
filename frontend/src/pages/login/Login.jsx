import React, { useState, useEffect } from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import './login.css'
import { registerUser,loginUser} from '../../features/user/userSlice';
import {Link,useNavigate} from 'react-router-dom'


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
const Login = () => {
    const [loginForm, setLoginForm] =useState("register")

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
              navigate('/')
            
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
            
              navigate('/')
            
          },300)
        
        }
      })
      
      
  return (
    <div className='logins'>
      <div className="login-box">
        {
            loginForm==="register"?         <div className="signup-details">
            <p>Register</p>
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
            <p style={{color:'blue',fontWeight:600,fontSize:'14px',cursor:'pointer'}} onClick={()=>setLoginForm("login")}>Already A User ? Login</p>
        </div>
        :




<div className="login-details">
            <p>Login</p>
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
            <input type="submit" value="Login" />
            </form>
            <p style={{color:'blue',fontWeight:600,fontSize:'14px',cursor:'pointer'}} onClick={()=>setLoginForm("register")}>New to Voguemine ? Register</p>
        </div>

        }
        
        
      </div>
    </div>
  )
}

export default Login
