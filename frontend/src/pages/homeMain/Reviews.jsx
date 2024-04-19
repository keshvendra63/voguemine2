import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallratings } from '../../features/products/productSlice'
const Reviews = () => {
  const dispatch=useDispatch()
  const getRatings=useSelector((state)=>state?.product?.getratings)
  console.log(getRatings)
  useEffect(()=>{
    dispatch(getallratings())
  },[])
  return (
    <div className='reviews'>
      
    </div>
  )
}

export default Reviews
