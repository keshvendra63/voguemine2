import React,{useEffect} from 'react'
import img from '../../images/about-img.jpg'
import {Link} from 'react-router-dom'
import './blog.css'
import { useDispatch, useSelector } from 'react-redux'
import {getABlog } from '../../features/blogs/blogSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const SingleBlog = () => {
  const { handle } = useParams()

    const singleBlogState=useSelector((state)=>state?.blog?.singleBlog)
    const location =useLocation()
    const getBlogId=location.pathname.split("/")[2];
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(getABlog(handle))
    },[handle])
    useEffect(() => {
      if (singleBlogState?.metaTitle!=="" || singleBlogState?.metaTitle!==undefined) {
          document.title = singleBlogState?.metaTitle;
      }
      else{
        document.title =`${singleBlogState?.title}`;
      }
  
  }, [singleBlogState?.metaTitle]);
  useEffect(() => {
    if (singleBlogState?.metaDesc!=="" || singleBlogState?.metaDesc!==undefined) {
        document.querySelector('meta[name="description"]').setAttribute('content',singleBlogState?.metaDesc);
    }
    else{
      document.querySelector('meta[name="description"]').setAttribute('content',singleBlogState?.description);
    }
  
  }, [singleBlogState?.metaDesc]);  
  
  return (
    <div className='margin-section' style={{marginTop:'100px'}}>
      <p className="section-heading">{singleBlogState?.title}</p>
      <div className="blog">
        <p className="desc" dangerouslySetInnerHTML={{ __html: singleBlogState?.description }}></p>
      </div>
    </div>
  )
}

export default SingleBlog
