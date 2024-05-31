import React,{useEffect,useState} from 'react'
import './category.css'
import {Link, useLocation} from 'react-router-dom'
import banner from '../../images/A18.jpg'
import img11 from '../../images/mens-track-set.jpeg'
import img12 from '../../images/mens-jackets.jpg'
import {getAllCollection} from '../../features/collection/collectionSlice'
import { useDispatch, useSelector } from 'react-redux'
const Men = () => {
    const collectionState=useSelector((state)=>state?.collection?.collection)
    const bannerState=useSelector((state)=>state?.banner?.banner)
    const modifyCloudinaryUrl = (url) => {
        const urlParts = url?.split('/upload/');
        return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
      };
  return (
    <div className='categoryPage'>
      <div className="category-banner">
        <img src={modifyCloudinaryUrl(bannerState[29]?.images[0]?.url) || banner} alt={bannerState[29]?.alt} />
      </div>
      <div className="collections margin-section">
      <Link to={`/collections/${collectionState[2]?.handle}`} >
        <div className="collection-card">
            
            <img src={modifyCloudinaryUrl(collectionState[2]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902115/shirt_qniodl.jpg"} alt="" className='col-img'/>
            <h2>{collectionState[2]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[3]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[3]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902079/t_shirt_wzguwp.jpg"} alt="" />
            <h2>{collectionState[3]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[43]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[43]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1713028400/WhatsApp_Image_2024-04-13_at_16.41.36_4da1adcf_rkwgco.jpg"} alt="" />
            <h2>{collectionState[43]?.category}</h2>
        </div>
        </Link>
       
        <Link to={`/collections/${collectionState[0]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[0]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902105/loafers_suldb8.jpg"} alt="" />
            <h2>{collectionState[0]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[6]?.handle}`} >

        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[6]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902081/sneaker_twwejr.jpg"} alt="" />
            <h2>{collectionState[6]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[5]?.handle}`} >

        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[5]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902079/flipflop_fp4mgz.jpg"} alt="" />
            <h2>{collectionState[5]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[1]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[1]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902106/jeans_dtflbu.jpg"} alt="" />
            <h2>{collectionState[1]?.category}</h2>
        </div>
        </Link>
        
        <Link to={`/collections/${collectionState[10]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[10]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902093/shorts_cm2unp.jpg"} alt="" />
            <h2>{collectionState[10]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[8]?.handle}`}>
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[8]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902072/track_pant_zuxcpj.jpg"} alt="" />
            <h2>{collectionState[8]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[17]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[17]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902099/combo_cyftbh.jpg"} alt="" />
            <h2>{collectionState[17]?.category}</h2>
        </div>
        </Link>
       
        <Link to={`/collections/${collectionState[4]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[4]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902078/swetshirt_c7ojeh.jpg"} alt="" />
            <h2>{collectionState[4]?.category}</h2>
        </div>
        </Link>


        <Link to={`/collections/${collectionState[20]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[20]?.images[0]?.url) || img11} alt="" />
            <h2>{collectionState[20]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[7]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[7]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1712902090/hoody_k8jth2.jpg"} alt="" />
            <h2>{collectionState[7]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[11]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[11]?.images[0]?.url) || img12} alt="" />
            <h2>{collectionState[11]?.category}</h2>
        </div>
        </Link>
        <Link to={`/collections/${collectionState[19]?.handle}`} >
        <div className="collection-card">
            <img src={modifyCloudinaryUrl(collectionState[19]?.images[0]?.url) || "https://res.cloudinary.com/keshvendra/image/upload/v1713512952/pullover-_cqzzw1.jpg"} alt="" />
            <h2>{collectionState[19]?.category}</h2>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Men
