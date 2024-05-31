import React, { useEffect, useState } from 'react'
import ScrollCarousel from 'scroll-carousel-react';
import Carousel from 'react-bootstrap/Carousel';
import home_benner from '../../images/home-banner.jpg'
import Carousel1 from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link, Navigate,useNavigate } from 'react-router-dom'
import './homemain.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../features/products/productSlice';
import Product from '../../components/Product'
import Reviews from './Reviews';

const HomeMain = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const navigate=useNavigate()
  const bannerState=useSelector((state)=>state?.banner?.banner)
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const collections = ["Men's Premium T Shirts", "Women's Dresses", "Men's Belt","Kid's T-Shirts"];
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const page = 1;
  const limit = 10;
  const productState = useSelector((state) => state?.product?.product);
  const productStat = useSelector((state) => state?.product);

  const { isError, isLoading, isSuccess } = productStat
  const sort = "-createdAt"
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = collections.map((collectionName) => dispatch(getAllProducts({ limit, collectionName, page, sort })));

        const results = await Promise.all(promises);
        
        // Logging results to check the structure
        console.log('Results:', results);

        const combinedPayArray = results.reduce((accumulator, currentObject) => {
          // Check if payload exists and is an array
          if (Array.isArray(currentObject.payload.products)) {
            return [...accumulator, ...currentObject.payload.products];
          } else {
            console.warn('Payload is not an array:', currentObject.payload);
            return accumulator;
          }
        }, []);

        setData(combinedPayArray);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [dispatch, limit, page, sort]);
  const products = productState ? productState : [];

  const shirts = data.filter(object => object.collectionName && object.collectionName === "Men's Premium T Shirts").slice(0, 4);
  const tshirt = data.filter(object => object.collectionName && object.collectionName === "Women's Dresses").slice(0, 4);
  const jeans = data.filter(object => object.collectionName && object.collectionName === "Men's Belt").slice(0, 4);
  const kids = data.filter(object => object.collectionName && object.collectionName === "Kid's T-Shirts").slice(0, 4);



  useEffect(() => {
    if (isLoading && data) {
      setLoading(true)
    }
    if (isSuccess && data) {
      setLoading(false)
    }
  }, [isLoading, isSuccess])

  const collectionState=useSelector((state)=>state?.collection?.collection)
  const modifyCloudinaryUrl = (url) => {
    const urlParts = url?.split('/upload/');
    return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
  };
  return (
    <div className='homeMain'>
      <div className="hero-section">
      <Carousel activeIndex={index} onSelect={handleSelect} fade controls={false}>
      <Carousel.Item interval={2500}>
        <img src={modifyCloudinaryUrl(bannerState[0]?.images[0]?.url)} alt=""/>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img src={modifyCloudinaryUrl(bannerState[38]?.images[0]?.url)} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img src={modifyCloudinaryUrl(bannerState[39]?.images[0]?.url)} alt="" />
      </Carousel.Item>
      
    </Carousel>
      </div>
      <div className="categories">
        <ScrollCarousel
          autoplay
          autoplaySpeed={5}
          speed={4}
        >
          <Link to="/men">
            <div className="cate">
              <img src={modifyCloudinaryUrl(bannerState[1]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1716445897/tlmdpqkm5719udhno6kd.jpg")} alt={bannerState[1]?.alt} />
            </div>
          </Link><Link to="/women">
            <div className="cate">
              <img src={modifyCloudinaryUrl(bannerState[2]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1716445919/tusfaj3nuvqqwqr1kjz2.jpg")} alt={bannerState[2]?.alt} />
            </div>
          </Link><Link to="/kids">
            <div className="cate">
              <img src={modifyCloudinaryUrl(bannerState[3]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1716445944/zasszxgbvzqowaanb8ah.jpg")} alt={bannerState[3]?.alt} />
            </div>
          </Link><Link to="/accessories">
            <div className="cate">
              <img src={modifyCloudinaryUrl(bannerState[4]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1716445956/felldjkeyt9ho7rxudou.jpg")} alt={bannerState[4]?.alt} />
            </div>
          </Link>

        </ScrollCarousel>



      </div>

      <div className="margin-section">
        <div className="shoes-section">
          <div className="shoe-left">
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[5]?.images[0]?.url)} alt={bannerState[5]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[6]?.images[0]?.url) } alt={bannerState[6]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[7]?.images[0]?.url)} alt={bannerState[7]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[8]?.images[0]?.url)} alt={bannerState[8]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[9]?.images[0]?.url)} alt={bannerState[9]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[10]?.images[0]?.url)} alt={bannerState[10]?.alt} />
              </Carousel.Item>
            </Carousel>

          </div>
          <div className="shoe-right">
            <p>Introducing our premium men's footwear collection</p>
            <p>style and comfort with our exceptional range of men's footwear that will keep you walking in confidence.</p>
            <Link to={`/collections/${collectionState[0]?.handle}`} className='btn'>BUY NOW</Link>
          </div>
        </div>
        <div className="products-listing">
          <p className="section-heading">Men's Featured Products</p>


          {
            loading ? <div className="skeleton">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
              :
              <div className="product-list pl1">


{
                  shirts?.map((arm, index) => {

                    return <Product key={index} keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>


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
                <img src={bannerState[11]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a28_ywebvi.jpg"} alt={bannerState[11]?.alt} />
              </div>
            </Link><Link to="/collections/t-shirts">
              <div className="trending-card">
                <img src={bannerState[12]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a29_e50fly.jpg"} alt={bannerState[12]?.alt} />
              </div>
            </Link><Link to="/collections/mens-denim-jeans">
              <div className="trending-card">
                <img src={bannerState[13]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341077/a27_juuuzb.jpg"} alt={bannerState[13]?.alt} />
              </div>
            </Link>
          </div>
        </div>
        <div className="shoes-section">

          <div className="shoe-right">
            <p >Ladies Premium Sandals and Heels</p>
            <p>Style like a Queen with our gorgeous selection of Premium Sandals and Heels for Women.</p>
            <Link to={`/collections/${collectionState[33]?.handle}`} className='btn'>BUY NOW</Link>
          </div>
          <div className="shoe-left">
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[14]?.images[0]?.url)} alt={bannerState[14]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[15]?.images[0]?.url)} alt={bannerState[15]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[16]?.images[0]?.url)} alt={bannerState[16]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[17]?.images[0]?.url)} alt={bannerState[17]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[18]?.images[0]?.url)} alt={bannerState[18]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={bannerState && modifyCloudinaryUrl(bannerState[19]?.images[0]?.url)} alt={bannerState[19]?.alt} />
              </Carousel.Item>
            </Carousel>

          </div>
        </div>
        <div className="products-listing">
          <p className="section-heading">Women's Featured Products</p>

          {
            loading ? <div className="skeleton">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
              :
              <div className="product-list">
                {

                  tshirt.map((arm, index) => {

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>


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
                <img src={bannerState[20]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341073/a31_kv2mnb.jpg"} alt={bannerState[20]?.alt} />
              </div>
            </Link><Link to="/collections/womens-shirt-t-shirts">
              <div className="trending-card">
                <img src={bannerState[21]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341073/a30_g0wu0m.jpg"} alt={bannerState[21]?.alt} />
              </div>
            </Link>
            <Link to="/collections/womens-co-ord-set">
              <div className="trending-card">
                <img src={bannerState[22]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1710341072/a32_l5be5c.jpg"} alt={bannerState[22]?.alt} />
              </div>
            </Link>
          </div>
        </div>


        <div className="shoes-section">
          <div className="shoe-left">
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[41]?.images[0]?.url)} alt={bannerState[41]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[42]?.images[0]?.url)} alt={bannerState[42]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[43]?.images[0]?.url)} alt={bannerState[43]?.alt} />
              </Carousel.Item>
            </Carousel>

          </div>
          <div className="shoe-right">
            <p>Elegant Kids' Clothing Because Fancy Is Fun</p>
            <p>Get fancy with our elegant kids' clothing and give you child a special sense of fashion.</p>
            <Link to={`/kids`} className='btn'>BUY NOW</Link>
          </div>
        </div>
        <div className="products-listing">
          <p className="section-heading">Kid's Featured Products</p>


          {
            loading ? <div className="skeleton">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
              :
              <div className="product-list pl1">


{
                  kids.map((arm, index) => {

                    return <Product key={index} keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>


                  })
                }

               

              </div>
          }




        </div>




        <div className="shoes-section">
          <div className="shoe-left">
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[23]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712578479/09_k8f2tm.jpg")} alt={bannerState[23]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[24]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712578475/011_njreib.jpg")} alt={bannerState[24]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[25]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712578475/010_czuutf.jpg")} alt={bannerState[25]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[26]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/keshvendra/image/upload/v1713516029/towel_wpf5nn.jpg")} alt={bannerState[26]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[27]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712578475/010_czuutf.jpg")} alt={bannerState[27]?.alt} />
              </Carousel.Item>
              <Carousel.Item>
                <img src={modifyCloudinaryUrl(bannerState[28]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/keshvendra/image/upload/v1713516029/towel_wpf5nn.jpg")} alt={bannerState[28]?.alt} />
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
          <p className="section-heading">Featured Accessories</p>
          {
            loading ? <div className="skeleton">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
              :
              <div className="product-list">
                {

                  jeans.map((arm, index) => {

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>


                  })
                }

              </div>
          }



        </div>

        {/* <div className="ratings">
          <Reviews/>
        </div> */}

<p style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Secure With Voguemine</p>

        <div className="icon-footer">
          <div>
          <img src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712582661/FREE_FAST_SHIPPING_IN_INDIA_qug5zj.png")} alt="" />
<p>Fast Shipping</p>
          </div>
          <div>
          <img src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712582661/SECURE_PAYMENT_eblv7s.png")} alt="" />
<p>Secure Payment</p>
          </div>
          <div>
          <img src={modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712582665/Easy_Exchange_gfloux.png")} alt="" />

<p>Easy Exchange</p>
          </div>
        </div>




      </div>

    </div>
  )
}

export default HomeMain
