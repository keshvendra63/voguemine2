import React,{useEffect,useState} from 'react'
import './category.css'
import banner from '../../images/A20.jpg'
import a3 from '../../images/a3.jpeg'
import a8 from '../../images/a8.jpg'
import { Link } from 'react-router-dom'
import {getAllCollection} from '../../features/collection/collectionSlice'
import { useDispatch, useSelector } from 'react-redux'
const Accessories = () => {
  const collectionState=useSelector((state)=>state?.collection?.collection)
  const bannerState=useSelector((state)=>state?.banner?.banner)

  return (
    <div className='categoryPage'>
    <div className="category-banner">
    <img src={bannerState[32]?.images[0]?.url || banner} alt={bannerState[32]?.alt} />
    </div>
    <div className="collections margin-section">
      <Link to={`/collections/${collectionState[14]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[14]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904161/belts_lkrnce.jpg"} alt="" />
          <h2>{collectionState[14]?.category}</h2>
      </div>
      </Link><Link to={`/collections/${collectionState[25]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[25]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904156/towel_jj6yuz.jpg"} alt="" />
          <h2>{collectionState[15]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[15]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[15]?.images[0]?.url || a3} alt="" />
          <h2>{collectionState[15]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[46]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[46]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904156/no_show_auziaa.jpg"} alt="" />
          <h2>{collectionState[46]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[45]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[45]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904170/ankel_socks_ynk1cs.jpg"} alt="" />
          <h2>{collectionState[45]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[44]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[44]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904157/low_cut_lizngm.jpg"} alt="" />
          <h2>{collectionState[44]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[47]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[47]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712904170/anklet_vento7.jpg"} alt="" />
          <h2>{collectionState[47]?.category}</h2>
      </div></Link><Link to={`/collections/${collectionState[48]?.handle}`}>
      <div className="collection-card">
          <img src={collectionState[48]?.images[0]?.url || a8} alt="" />
          <h2>{collectionState[48]?.category}</h2>
      </div>
      </Link>
    </div>
  </div>
  )
}

export default Accessories
