import React, { useEffect, useState } from 'react'
import './profile.css'
import {useNavigate} from 'react-router-dom'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useFormik} from 'formik'
import TextField from '@mui/material/TextField';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {getUserOrders} from '../../features/user/userSlice'
import { styled } from '@mui/material/styles';
import {updateProfile} from '../../features/user/userSlice'
const profileSchema=yup.object({
    firstname:yup.string().required("First Name is required"),
    lastname:yup.string().required("Last Name is required"),
    email:yup.string().required("Email is Required"),
    mobile:yup.number().required("Mobile number is required"),
  })

const Profile = () => {
  const navigate=useNavigate()
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const config2 = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
const prdt=JSON.parse(localStorage.getItem("orderId"))
  const [edit,setEdit]=useState(true)
  const [bg,setBg]=useState("white")
  const [color,setColor]=useState("black")
  const editProfile=()=>{
    setEdit(false)
    setBg("black")
    setColor("white")
  }
  const orders=JSON.parse(localStorage.getItem("orders"))
  const dispatch=useDispatch()
    const authState=useSelector(state=>state?.auth?.user)
    const formik = useFormik({
        initialValues: {
          firstname:authState?.firstname,
          lastname:authState?.lastname,
          email:authState?.email,
          mobile:authState?.mobile        
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
          dispatch(updateProfile({data:values,config2:config2}))
          setEdit(true)
          setBg("white")
          setColor("black")

        }
      });
      const orderState=useSelector((state)=>state?.auth?.getOrderedProduct?.orders)
      
      useEffect(()=>{
        dispatch(getUserOrders())
        
      },[])

      const modifyCloudinaryUrl = (url) => {
        const urlParts = url?.split('/upload/');
        return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
      };
  return (
    <div className='margin-section profile'>
      {
        authState!==null?
        <div className="profile-info">
        <div className="left-profile">
            <div className="info">
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713513706/Ghim_c%E1%BB%A7a_Vanessa_Soares_tr%C3%AAn_hajgdhv___Avatar_%E1%BA%A2nh_t%C6%B0%E1%BB%9Dng_cho_%C4%91i%E1%BB%87n_tho%E1%BA%A1i_%C4%90%E1%BB%99ng_v%E1%BA%ADt.jpeg_mhfwka.jpg" alt="" />
                <p className="name" style={{fontWeight:600}}>{authState?.firstname+" "+authState?.lastname}</p>
                <p className="email">{authState?.email}</p>
            </div>
        </div>
        <div className="right-profile">
            <div className="form">
                <p style={{textAlign:'right',color:'blue'}} onClick={editProfile}><BorderColorIcon style={{cursor:'pointer'}}/></p>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="email input">
                        <TextField
                            label="Email"
                            type="email"
                            name='email'
                            value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")}
                            InputProps={{
                                readOnly:edit,
                              }}
                        />
                        <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                    </div>
                    <div className="name input">
                        <div className='input'>
                        <TextField
                            label="First Name"
                            type="text"
                            name='firstname'
                            value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")}
                            InputProps={{
                                readOnly:edit,
                              }}
                        />
                        <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                        </div>                    
                    <div className='input'><TextField
                            label="Last Name"
                            type="text"
                            name='lastname'
                            value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}
                            InputProps={{
                                readOnly:edit,
                              }}
                        /> <div className="error">
                        {formik.touched.lastname && formik.errors.lastname}
                      </div></div>  
                       
                    </div>
                    <div className="mobile input">
                    <TextField
                            label="Phone"
                            type="number"
                            name='mobile'
                            value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")}
                            InputProps={{
                                readOnly:edit,
                              }}
                        /> <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>

                    </div>
                    <div>
                    <input type="submit" value="Save" className='pay' style={{padding:'5px 20px',fontWeight:500,border:'2px solid black',backgroundColor:bg,color:color}}/>
                    </div>
                </form>
            </div>
        </div>
      </div>:
      <p>Please Login to View or Edit your Profile</p>
      }
      <hr />
      <div className="orders">
        <p className="section-heading" style={{textTransform:'capitalize',color:"green",fontSize:'20px',textAlign:'center'}}>your order has been placed. thank you for shopping.</p>
        <p style={{textAlign:'center'}}>*Oops! You missed out on top deals by choosing COD. Next time, opt for prepaid to unlock unbeatable offers and heartfelt savings! Alternatively, reach out to our customer support for personalized deals crafted just for you. 😊</p>
        <button style={{color:'white',backgroundColor:'black',fontWeight:500,margin:'15px 0',border:'none',padding:'8px 15px'}} onClick={()=>navigate("/")}>Continue Shopping</button>
          <div className="order-list">
            <div className="order-card">
                {
                  prdt?.orderItems?.map((prdts,idx)=>{
                    return <div className="prdts">
                  <img src={modifyCloudinaryUrl(prdts?.product?.images[0]?.url)} alt="" />
                  <div className="detail">
                    <p className="title">{prdts?.product?.title}</p>
                    <p className="variant"><span>{prdts?.color}</span> / <span>{prdts?.size}</span></p>
                    <p className="price">&#8377; {prdts?.price}</p>
                    <p className="qty">Quantity :{prdts?.quantity}</p>
                  </div>
                </div>
                  })
                }
                <div className="total">
                  <div className="left">
                    <p>Order Number</p>
                    <p>Discount</p>
                    <p>Amount</p>
                  </div>
                  <div className="right">
                    <p>{prdt?.orderId}</p>
                    <p>&#8377; {prdt?.discount}</p>
                    <p>&#8377; {prdt?.finalAmount}</p>
                  </div>
                </div>
              </div>
              
           
          </div>
      </div>
    </div>
  )
}

export default Profile
