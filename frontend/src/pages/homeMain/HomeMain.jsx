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

const HomeMain = () => {
  const navigate=useNavigate()
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
  const collections = ["Men's Premium Shirts", "Flat Sandals", "Men's Belt"];
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
      const promises = collections.map((collectionName) => dispatch(getAllProducts({ limit, collectionName, page, sort })));

      const dat = await Promise.all(promises)
      const combinedPayArray = dat.reduce((accumulator, currentObject) => {
        return [...accumulator, ...currentObject.payload];
      }, []);

      setData(combinedPayArray)

    };

    fetchProducts();
  }, [limit, page]);
  const products = productState ? productState : [];

  const shirts = data.filter(object => object.collectionName && object.collectionName === "Men's Premium Shirts").slice(0, 4);
  const tshirt = data.filter(object => object.collectionName && object.collectionName === "Flat Sandals").slice(0, 4);
  const jeans = data.filter(object => object.collectionName && object.collectionName === "Men's Belt").slice(0, 4);


  useEffect(() => {
    if (isLoading && data) {
      setLoading(true)
    }
    if (isSuccess && data) {
      setLoading(false)
    }
  }, [isLoading, isSuccess])


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
        >
          <Link to="/men">
            <div className="cate">
              <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516229/0006_u5fiek.jpg" alt="" />
            </div>
          </Link><Link to="/women">
            <div className="cate">
              <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516229/0007_bld8nf.jpg" alt="" />
            </div>
          </Link><Link to="/kids">
            <div className="cate">
              <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516229/0008_w3hlql.jpg" alt="" />
            </div>
          </Link><Link to="/accessories">
            <div className="cate">
              <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516229/00009_kwerwy.jpg" alt="" />
            </div>
          </Link>

        </ScrollCarousel>



      </div>

      <div className="margin-section">
        <div className="shoes-section">
          <div className="shoe-left">
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514808/413_o7fvvx.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514808/360_pjxrdj.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514809/431_dg5dmr.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514807/330_dxuvta.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514812/443_ajzh9b.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713514807/310_gblgew.jpg" alt="" />
              </Carousel.Item>
            </Carousel>

          </div>
          <div className="shoe-right">
            <p>Introducing our premium men's footwear collection</p>
            <p>style and comfort with our exceptional range of men's footwear that will keep you walking in confidence.</p>
            <Link to="/collections/loafers-for-men" className='btn'>BUY NOW</Link>
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
                  shirts.map((arm, index) => {

                    return <Product key={index} keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm}/>


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
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516021/90_ouuogk.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516022/95_o6hsau.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516023/37_dxuah4.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516021/67_nkoy08.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516026/107_ybacx7.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516025/137_gna4np.jpg" alt="" />
              </Carousel.Item>
            </Carousel>

          </div>
        </div>
        <div className="products-listing">
          <p className="section-heading">Featured Products</p>

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

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm}/>


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
            <Carousel controls={false} indicators={false} interval={700} slide={false}>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712578479/09_k8f2tm.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712578475/011_njreib.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712578475/010_czuutf.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://res.cloudinary.com/keshvendra/image/upload/v1713516029/towel_wpf5nn.jpg" alt="" />
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

                    return <Product key={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm}/>


                  })
                }

              </div>
          }



        </div>

<p style={{textAlign:'center',fontSize:'30px',fontWeight:500}}>Secure With Voguemine</p>

        <div className="icon-footer">
          <div>
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712582661/FREE_FAST_SHIPPING_IN_INDIA_qug5zj.png" alt="" />
<p>Fast Shipping</p>
          </div>
          <div>
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712582661/SECURE_PAYMENT_eblv7s.png" alt="" />
<p>Secure Payment</p>
          </div>
          <div>
          <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712582665/Easy_Exchange_gfloux.png" alt="" />

<p>Easy Exchange</p>
          </div>
        </div>




      </div>

    </div>
  )
}

export default HomeMain
