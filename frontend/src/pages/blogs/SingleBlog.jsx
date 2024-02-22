import React,{useEffect} from 'react'
import img from '../../images/about-img.jpg'
import {Link} from 'react-router-dom'
import './blog.css'
import { useDispatch, useSelector } from 'react-redux'
import {getABlog } from '../../features/blogs/blogSlice';
import { useLocation } from 'react-router-dom';
const SingleBlog = () => {
    const singleBlogState=useSelector((state)=>state?.blog?.singleBlog)
    console.log(singleBlogState)
    const location =useLocation()
    const getBlogId=location.pathname.split("/")[2];
    const dispatch=useDispatch();
    useEffect(()=>{
        getBlog()
    },[])
    const getBlog=()=>{
        dispatch(getABlog(getBlogId))
    }

  return (
    <div className='margin-section' style={{marginTop:'100px'}}>
        <Link to="/blogs">Go Back</Link>
      <p className="section-heading">Blog</p>
      <div className="blog">
        <img src={img} alt="" />
        <p className="blog-title">{singleBlogState?.title}</p>
        <p className="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, vel ipsa, sint animi necessitatibus doloribus voluptates facilis laboriosam minima natus, sequi nostrum autem itaque. Quia quisquam dicta aut voluptates vero aliquid totam. Ut sequi consequuntur pariatur, voluptates iure, neque asperiores et, eius impedit provident inventore saepe doloremque itaque magnam. Ex.</p>
      </div>
    </div>
  )
}

export default SingleBlog
