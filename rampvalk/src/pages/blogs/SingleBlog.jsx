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
      if (singleBlogState?.metaTitle1!=="" || singleBlogState?.metaTitle1!==undefined) {
          document.title = singleBlogState?.metaTitle1;
      }
      else{
        document.title =`${singleBlogState?.title}`;
      }
  
  }, [singleBlogState?.metaTitle1]);
  useEffect(() => {
    if (singleBlogState?.metaDesc1!=="" || singleBlogState?.metaDesc1!==undefined) {
        document.querySelector('meta[name="description"]').setAttribute('content',singleBlogState?.metaDesc1);
    }
    else{
      document.querySelector('meta[name="description"]').setAttribute('content',singleBlogState?.description);
    }
  
  }, [singleBlogState?.metaDesc1]);  
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
