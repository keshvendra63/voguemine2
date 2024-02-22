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
  return (
    <div className='margin-section' style={{marginTop:'100px'}}>
      <p className="section-heading">Our Blogs</p>
      <div className="blogs">
        {
         blogs?.map((item,index)=>{
            return(
              <div className="blog" key={index}>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={img}
      />
      <p>{moment(item?.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/blog/${item?._id}`}><Button size="small">Learn More</Button></Link>
        
      </CardActions>
    </Card>
        </div>
            )
          })
        }
        


      </div>
    </div>
  )
}

export default Blog
