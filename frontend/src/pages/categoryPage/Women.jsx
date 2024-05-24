import React,{useEffect,useState} from 'react'
import './category.css'
import banner from '../../images/A17.jpg'
import w6 from '../../images/w6.jpg'
import w10 from '../../images/w10.jpg'
import w12 from '../../images/w12.jpg'
import { Link } from 'react-router-dom'
import {getAllCollection} from '../../features/collection/collectionSlice'
import { useDispatch, useSelector } from 'react-redux'
const Women = () => {
    const collectionState=useSelector((state)=>state?.collection?.collection)
    const bannerState=useSelector((state)=>state?.banner?.banner)

    return (
        <div className='categoryPage'>
            <div className="category-banner">
            <img src={bannerState[30]?.images[0]?.url || banner} alt={bannerState[30]?.alt} />
            </div>
            <div className="collections margin-section">
            <Link to={`/collections/${collectionState[18]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[18]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903477/t_shirt_1_ptzdm8.jpg"} alt="" />
                    <h2>{collectionState[18]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[22]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[22]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903480/dresses_gfrq47.jpg"} alt="" />
                    <h2>{collectionState[22]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[12]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[12]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903480/co_ord_set_groozl.jpg"} alt="" />
                    <h2>{collectionState[12]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[33]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[33]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903479/healed_sandles_jpdece.jpg"} alt="" />
                    <h2>{collectionState[33]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[23]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[23]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903479/flat_sandels_dqimu2.jpg"} alt="" />
                    <h2>{collectionState[23]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[35]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[35]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903478/track_suit_yqkvfe.jpg"} alt="" />
                    <h2>{collectionState[35]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[38]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[38]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903478/leggings_yknect.jpg"} alt="" />
                    <h2>{collectionState[38]?.category}</h2>
                </div></Link>
                
                <Link to={`/collections/${collectionState[39]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[39]?.images[0]?.url || w10} alt="" />
                    <h2>{collectionState[39]?.category}</h2>
                </div></Link>
                <Link to={`/collections/${collectionState[41]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[41]?.images[0]?.url || w12} alt="" />
                    <h2>{collectionState[41]?.category}</h2>
                </div></Link><Link to={`/collections/${collectionState[28]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[28]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903479/jackts_wjdi9n.jpg"} alt="" />
                    <h2>{collectionState[28]?.category}</h2>
                </div></Link><Link to={`/collections/${collectionState[30]?.handle}`}>
                <div className="collection-card">
                    <img src={collectionState[30]?.images[0]?.url || "https://res.cloudinary.com/keshvendra/image/upload/v1712903479/pullover_qkfg1s.jpg"} alt="" />
                    <h2>{collectionState[30]?.category}</h2>
                </div></Link>
                {/* <Link to="#">
                <div className="collection-card">
                    <img src={w6} alt="" />
                    <h2>Women's Hoodie</h2>
                </div></Link> */}
            </div>
        </div>
    )
}

export default Women
