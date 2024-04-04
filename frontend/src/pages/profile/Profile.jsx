import React, { useEffect, useState } from 'react'
import './profile.css'
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


  return (
    <div className='margin-section profile'>
      {
        authState!==null?
        <div className="profile-info">
        <div className="left-profile">
            <div className="info">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXNauy1n3zSAGCX3pWg1xnKeFOjSgG1MVQwQ&usqp=CAU" alt="" />
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
      <p>Please Login</p>
      }
      <hr />
      <div className="orders">
        <p className="section-heading">Orders</p>
          <div className="order-list">
            {
              orders.map((item,index)=>{
               return <div className="order-card">
                {
                  item?.orderItems?.map((prdt,idx)=>{
                    return <div className="prdts">
                  <img src={prdt?.product?.images[0]?.url} alt="" />
                  <div className="detail">
                    <p className="title">{prdt?.product?.title}</p>
                    <p className="variant"><span>{prdt?.color}</span> / <span>{prdt?.size}</span></p>
                    <p className="price">&#8377; {prdt?.price}</p>
                    <p className="qty">Quantity :{prdt?.quantity}</p>
                  </div>
                </div>
                  })
                }
                <div className="total">
                  <div className="left">
                    <p>Subtotal</p>
                    <p>Discount</p>
                    <p>Total</p>
                  </div>
                  <div className="right">
                    <p>&#8377; {item?.totalPrice}</p>
                    <p>&#8377; {item?.discount}</p>
                    <p>&#8377; {item?.finalAmount}</p>
                  </div>
                </div>
              </div>
              })
            }
           
          </div>
      </div>
    </div>
  )
}

export default Profile
