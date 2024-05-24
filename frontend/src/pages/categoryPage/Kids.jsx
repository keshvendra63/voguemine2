import React,{useEffect,useState} from 'react'
import './category.css'
import banner from '../../images/A19.jpg'
import k1 from '../../images/k1.jpg'
import k4 from '../../images/k4.jpg'
import k6 from '../../images/k6.jpg'
import k8 from '../../images/k8.jpg'
import { Link } from 'react-router-dom'
import {getAllCollection} from '../../features/collection/collectionSlice'
import { useDispatch, useSelector } from 'react-redux'
const Kids = () => {
    const collectionState=useSelector((state)=>state?.collection?.collection)
    const bannerState=useSelector((state)=>state?.banner?.banner)

  return (
    <div className='categoryPage'>
    <div className="category-banner">
    <img src={bannerState[31]?.images[0]?.url || banner} alt={bannerState[31]?.alt} />
    </div>
    <div className="collections margin-section">
    <Link to={`/collections/${collectionState[16]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[16]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903902/shirts_vrsr9d.jpg"} alt="" />
          <h2>{collectionState[16]?.category}</h2>
      </div></Link>
      <Link to={`/collections/${collectionState[13]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[13]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903900/t_shirts_cid2m0.jpg"} alt="" />
          <h2>{collectionState[13]?.category}</h2>
      </div></Link>
      <Link to={`/collections/${collectionState[36]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[36]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903902/girl_dresses_mkrgau.jpg"} alt="" />
          <h2>{collectionState[36]?.category}</h2>
      </div></Link>
      
      <Link to={`/collections/${collectionState[24]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[24]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903902/co_ord_set_1_rn0pvi.jpg"} alt="" />
          <h2>{collectionState[24]?.category}</h2>
      </div></Link>
      <Link to={`/collections/${collectionState[34]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[34]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903902/co_ord_set_1_rn0pvi.jpg"} alt="" />
          <h2>{collectionState[34]?.category}</h2>
      </div></Link>
      <Link to={`/collections/${collectionState[21]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[21]?.images[0]?.url || k8} alt="" />
          <h2>{collectionState[21]?.category}</h2>
      </div></Link>
      {/* <Link to={`/collections/${collectionState[32]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[32]?.images[0]?.url || k1} alt="" />
          <h2>Kid's Hoodie</h2>
      </div>
</Link> */}
<Link to={`/collections/${collectionState[29]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[29]?.images[0]?.url || k4} alt="" />
          <h2>{collectionState[29]?.category}</h2>
      </div></Link>
      {/* <Link to="#">
      <div className="collection-card">
          <img src={k6} alt="" />
          <h2>Kid's Girl's Jackets</h2>
      </div></Link> */}

    </div>
  </div>
  )
}

export default Kids
