import React ,{useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img from '../../images/about-img.jpg'
import moment from 'moment'
import './blog.css'
import { useDispatch, useSelector } from 'react-redux'
import {getAllBlogs } from '../../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
const Blog = () => {
  const blogState=useSelector((state)=>state?.blog?.blog)
    const dispatch=useDispatch();
    useEffect(()=>{
        getBlogs()
    },[])
    const getBlogs=()=>{
        dispatch(getAllBlogs())
    }
    const blogs=blogState? blogState :[]
    const modifyCloudinaryUrl = (url) => {
      const urlParts = url?.split('/upload/');
      return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
    };
  return (
    <div className='margin-section' style={{marginTop:'100px'}}>
      <p className="section-heading">Our Blogs</p>
      <div className="blogs">
        {
         blogs?.map((item,index)=>{
            return(
              <Link to={`/blogs/news/${item?.handle}`} className='blog-card'>

              <div className="blog" key={index}>
                <img src={modifyCloudinaryUrl(item?.images[0]?.url)} alt={item?.title} />
                <p className='title'> {item?.title}</p>
        <p className='desc' variant="body2" color="text.secondary" style={{height:'100px',overflow:'hidden',textOverflow:'ellipsis'}} dangerouslySetInnerHTML={{ __html: item?.description }}>
        </p>
       <button size="small">Learn More</button>
                </div>
                </Link>

                
            )
          })
        }
        


      </div>
      
    </div>

  )
}

export default Blog
