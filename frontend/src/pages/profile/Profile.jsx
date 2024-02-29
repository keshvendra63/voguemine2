import React, { useEffect, useState } from 'react'
import './profile.css'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useFormik} from 'formik'
import TextField from '@mui/material/TextField';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../images/mens-premium-shirts.jpeg'
import {getUserOrders} from '../../features/user/userSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {updateProfile} from '../../features/user/userSlice'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


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
          console.log(values)

        }
      });
      const orderState=useSelector((state)=>state?.auth?.getOrderedProduct?.orders)
      
      useEffect(()=>{
        dispatch(getUserOrders())
        
      },[])


  return (
    <div className='margin-section profile'>
      <div className="profile-info">
        <div className="left-profile">
            <div className="info">
                <img src={img} alt="" />
                <p className="name">{authState?.firstname+" "+authState?.lastname}</p>
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
      </div>
      <hr />
      <div className="orders">
        <p className="section-heading">Orders</p>
        <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="left">Products</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderState?.map((row,index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="left">{(row.orderItems.map((ite)=>{return ite.product.title})).join(",")}</StyledTableCell>
              <StyledTableCell align="right">{row.finalAmount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
  )
}

export default Profile
