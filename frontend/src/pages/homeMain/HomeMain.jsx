import React, { useEffect, useState } from 'react'
import ScrollCarousel from 'scroll-carousel-react';
import Carousel from 'react-bootstrap/Carousel';
import Carousel1 from 'react-elastic-carousel';
import home_benner from '../../images/home-banner.jpg'

import {Link} from 'react-router-dom'
import './homemain.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts } from '../../features/products/productSlice';
import Product from '../../components/Product'

const HomeMain = () => {
  const collections = ["Men's Premium Shirts", "Men's Premium T Shirts", "Men's Denim Jeans"];
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(true)
  const page = 1;
  const limit = 6;
  const productState = useSelector((state) => state?.product?.product);
  const productStat = useSelector((state) => state?.product);

  const {isError,isLoading,isSuccess}=productStat
  const sort="-createdAt"
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const promises = collections.map((collectionName) =>dispatch(getAllProducts({ limit, collectionName, page,sort })));
      
      const dat=await Promise.all(promises)
      const combinedPayArray = dat.reduce((accumulator, currentObject) => {
        return [...accumulator, ...currentObject.payload];
    }, []);
    
    setData(combinedPayArray)

    };
  
    fetchProducts();
  }, [limit, page]);
  const products = productState ? productState : [];

  const shirts = data.filter(object => object.collectionName && object.collectionName==="Men's Premium Shirts").slice(0, 6);
  const tshirt = data.filter(object => object.collectionName && object.collectionName === "Men's Premium T Shirts").slice(0, 6);
  const jeans = data.filter(object => object.collectionName && object.collectionName === "Men's Denim Jeans").slice(0, 6);
   const breakpoints = [
    { width: 1, itemsToShow: 1.1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },

  ]


  useEffect(()=>{
    if(isLoading && data){
      setLoading(true)
    }
    if(isSuccess && data){
      setLoading(false)
    }
  },[isLoading,isSuccess])
  

  return (
    <div className='homeMain'>
      <div className="hero-section">
        <img src={home_benner} alt="" />
      </div>
      <div className="categories">
      <ScrollCarousel
        autoplay
        autoplaySpeed={5}
        speed={4}
        onReady={() => console.log('I am ready')}
      >
        <Link to="/men">
        <div className="cate">
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709559213/01_1_w4dkso.jpg" alt="" />
        </div>
        </Link><Link to="/women">
        <div className="cate">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709559213/02_k9jteu.jpg" alt="" />
        </div>
        </Link><Link to="/kids">
        <div className="cate">
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709559217/03_uxilkl.jpg" alt="" />
        </div>
        </Link><Link to="/accessories">
        <div className="cate">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709559212/05_ba3kea.jpg" alt="" />
        </div>
        </Link>
        
      </ScrollCarousel>
   
        
       
      </div>
      
      <div className="margin-section">
      <div className="shoes-section">
        <div className="shoe-left">
          <Carousel>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435068/02_1_b3pb1b.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435064/03_1_vl6zcn.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435065/01_2_u32eu9.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435057/04_qr04zp.jpg" alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
        <div className="shoe-right">
          <p className='section-heading'>Introducing our premium men's footwear collection</p>
          <p>style and comfort with our exceptional range of men's footwear that will keep you walking in confidence.</p>
          <Link to="/collections/loafers-for-men" className='btn'>BUY NOW</Link>
        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Men's Featured Products</p>


        {
          loading? <div className="skeleton">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        :
<div className="product-list">

         
{
    shirts.map((arm,index)=>{

            return <Product key={index} keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle}/>
       
        
    })
}

</div>
        }
                
        
        

      </div>
      <div className="trending-collections">
        <p className="section-heading">Men's Trending</p>
        <div className="trending-collection">
          <Link to="/collections/men-premium-shirt">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a28_ywebvi.jpg" alt="" />
          </div>
          </Link><Link to="/collections/t-shirts">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a29_e50fly.jpg" alt="" />
          </div>
          </Link><Link to="/collections/mens-denim-jeans">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341077/a27_juuuzb.jpg" alt="" />
          </div>
          </Link>
        </div>
      </div>
      <div className="shoes-section">
        
        <div className="shoe-right">
          <p >Ladies Premium Sandals and Heels</p>
          <p>Style like a Queen with our gorgeous selection of Premium Sandals and Heels for Women.</p>
          <Link to="/collections/heeled-sandals" className='btn'>BUY NOW</Link>
        </div>
        <div className="shoe-left">
          <Carousel>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435076/5_bectm1.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435069/8_elliue.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435069/6_frkrlu.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710435065/7_avg0cf.jpg" alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
                
        {
          loading? <div className="skeleton">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        :
        <div className="product-list">
        {
            
            tshirt.map((arm,index)=>{

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle}/>
               
                
            })
        }
  
    </div>
}
       

      </div>
      <div className="trending-collections">
        <p className="section-heading">Women's Trending</p>
        <div className="trending-collection">
          <Link to="/collections/womens-dress">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341073/a31_kv2mnb.jpg" alt="" />
          </div>
          </Link><Link to="/collections/womens-shirt-t-shirts">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341073/a30_g0wu0m.jpg" alt="" />
          </div>
          </Link>
          <Link to="/collections/womens-co-ord-set">
          <div className="trending-card">
            <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a32_l5be5c.jpg" alt="" />
          </div>
          </Link>
        </div>
      </div>
      <div className="shoes-section">
        <div className="shoe-left">
          <Carousel data-interval="100">
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709558912/louis-vuitton-premium-quality-towel-set-of-2-523_yasoy7.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709558912/gucci-premium-quality-loafer-socks-pack-of-5-643_uze4fs.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709558905/gucci-black-premium-quality-belt-512_cvsizj.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1709558906/21_u8hfyb.jpg" alt="" />
            </Carousel.Item>
          </Carousel>

        </div>
        <div className="shoe-right">
          <p>Luxury Accessories for Everlasting Grace</p>
          <p>Experience everlasting grace through our collection of luxurious accessories, adding a touch of timeless elegance to your style.</p>
          <Link to="/accessories" className='btn'>BUY NOW</Link>
        </div>
      </div>
      <div className="products-listing">
        <p className="section-heading">Featured Products</p>
        {
          loading? <div className="skeleton">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        :
        <div className="product-list">
        {
            
            jeans.map((arm,index)=>{

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle}/>
               
                
            })
        }
  
    </div>
}   

       

      </div>




      </div>

    </div>
  )
}

export default HomeMain
