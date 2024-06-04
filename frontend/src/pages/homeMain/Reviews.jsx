import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallratings } from '../../features/products/productSlice'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './homemain.css'
const Reviews = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 550 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 2
    }
  };
  const dispatch=useDispatch()
  const getRatings=useSelector((state)=>state?.product?.getratings)
  useEffect(()=>{
    dispatch(getallratings())
  },[])
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  return (
    <div className='reviews'>
      <p className='head'>Let Our Customer Speak for Us</p>
      <div className="r-sec">
        {
          getRatings && <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={10000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
        {
                  getRatings && getRatings?.map((item,index)=>{
                    return  <div className="rev" key={index}>
                    <img src={modifyCloudinaryUrl(item?.productImages && item?.productImages[0]?.url)} alt="review" />
                    <Stack spacing={1} className="stars">
                  <Rating name="size-small" value={item?.star} size="small" />
            
                </Stack>
                    <p className="name">{item?.name}</p>
                    <p className="para">{item?.comment}</p>
                  </div>
                  })
                }
        </Carousel>
        }
      
        
       
      </div>
    </div>
  )
}

export default Reviews
