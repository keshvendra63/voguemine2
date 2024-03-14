import React, { useEffect, useState } from 'react'
import banner from '../../images/A21.jpg'
import './product.css'
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts } from '../../features/products/productSlice';
import Product from '../../components/Product'
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
const Products = () => {
    const [collectionName,setCollectionName]=useState("")
    const [spinner,setSpinner]=useState("none")
    const [btn,setBtn]=useState("block")
  const [sort,setSort]=useState(null)
    const location=useLocation()
  const [limit,setLimit]=useState(21)
  const [page,setPage]=useState(1)

useEffect(()=>{
    if(location.pathname==="/collections/men-premium-shirt"){
        setCollectionName("Men's Premium Shirts")
      }
      if(location.pathname==="/collections/t-shirts"){
        setCollectionName("Men's Premium T Shirts")
      }
      if(location.pathname==="/collections/mens-sweatshirts"){
        setCollectionName("Men's Sweatshirts")
      }
      if(location.pathname==="/collections/loafers-for-men"){
        setCollectionName("Men's Loafers")
      }
      if(location.pathname==="/collections/floaters-slippers"){
        setCollectionName("Men's Premium Slippers")
      }
      if(location.pathname==="/collections/mens-sneakers"){
        setCollectionName("Men's Sneakers")
      }
      if(location.pathname==="/collections/mens-denim-jeans"){
        setCollectionName("Men's Denim Jeans")
      }
      if(location.pathname==="/collections/mens-hoodies"){
        setCollectionName("Men's Hoodies")
      }
      if(location.pathname==="/collections/mens-trackpants"){
        setCollectionName("Men's Trackpants")
      }
      if(location.pathname==="/collections/combos"){
        setCollectionName("men,s combos")
      }
      if(location.pathname==="/collections/mens-pullover-jackets"){
        setCollectionName("Men's Jackets")
      }
      if(location.pathname==="/collections/mens-pullover"){
        setCollectionName("Men's Pullover")
      }
      if(location.pathname==="/collections/mens-trackset"){
        setCollectionName("Men's Track Set")
      }
      if(location.pathname==="/collections/womens-shirt-t-shirts"){
        setCollectionName("Women's T-Shirt")
    }
    
    if(location.pathname==="/collections/womens-dress"){
    setCollectionName("Women's Dresses")
    }
    
    if(location.pathname==="/collections/womens-co-ord-set"){
    setCollectionName("Women's Co-ord set")
    }
    
    if(location.pathname==="/collections/flat-sandals"){
    setCollectionName("Flat Sandals")
    }
    
    if(location.pathname==="/collections/heeled-sandals"){
    setCollectionName("Heeled Sandals")
    }
    
    if(location.pathname==="/collections/womens-legging"){
    setCollectionName("Women's Lower & Legging")
    }
    
    if(location.pathname==="/collections/womens-sweatshirt"){
    setCollectionName("Women's Sweatshirts")
    }
    
    if(location.pathname==="/collections/womens-hoodie"){
    setCollectionName("Women's Pullovers")
    }
    
    if(location.pathname==="/collections/womens-pullovers"){
    setCollectionName("Women's Pullovers")
    }
    
    if(location.pathname==="/collections/womens-pullover-jackets"){
    setCollectionName("Womens'Jackets")
    }
    
    if(location.pathname==="/collections/womens-winter-coats"){
    setCollectionName("Women's Winter Coats")
    }
    
    if(location.pathname==="/collections/womens-track-sets"){
    setCollectionName("Women's Track Sets")
    }
    
    if(location.pathname==="/collections/kids-tracksuit"){
    setCollectionName("Kids Tracksuit")
    }
    
    if(location.pathname==="/collections/kids-boy-jacket"){
    setCollectionName("Kid's Jackets")
    }
    
    if(location.pathname==="/collections/kids-girl-jacket"){
    setCollectionName("Kid's Girl co-ord Set")
    }
    
    if(location.pathname==="/collections/kids-hoodie"){
    setCollectionName("Kid's Boy's Cord-Set")
    }
    
    if(location.pathname==="/collections/kids-co-ord-set"){
    setCollectionName("Kid's Girl co-ord Set")
    }
    
    if(location.pathname==="/collections/kids-shirt"){
    setCollectionName("Kids Shirts")
    }
    
    if(location.pathname==="/collections/kid-girls-dress"){
    setCollectionName("Kid Girl's Dress")
    }
    
    if(location.pathname==="/collections/kids-t-shirts"){
    setCollectionName("Kid's T-Shirts")
    }
    
    if(location.pathname==="/collections/belts"){
    setCollectionName("Men's Belt")
    }
    
    if(location.pathname==="/collections/towels"){
    setCollectionName("Accessories Towel for Men and Women" || "Towels for Men & Women")
    }
    
    if(location.pathname==="/collections/under-garment"){
    setCollectionName("Men's Accessories Under Garments" || "Men's Under Garments")
    }
    
    if(location.pathname==="/collections/no-show"){
    setCollectionName("Anklet Socks")
    }
    
    if(location.pathname==="/collections/low-ankle"){
    setCollectionName("Anklet Socks")
    }
    
    if(location.pathname==="/collections/low-cut"){
    setCollectionName("Anklet Socks")
    }
    
    if(location.pathname==="/collections/anklet"){
    setCollectionName("Anklet Socks")
    }
    
    if(location.pathname==="/collections/crew"){
    setCollectionName("Men's Trackpants")
    }
    
    
})
    const productState=useSelector((state)=>state?.product?.product)
    const dispatch=useDispatch();
    useEffect(()=>{
        getProducts()
    },[sort,limit,page,collectionName])
    const getProducts=()=>{
        dispatch(getAllProducts({sort,limit,page,collectionName}))
    }
    const products=productState? productState:[]
      

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 3000);
    };
    const loadMore=()=>{
    
      setLimit(limit+21)
      enterLoading(0)
    }
    return (
        <div className='Products'>
            <div className="product-banner">
                <img src={banner} alt="" />
            </div>
            <div className="products-box margin-section">
 
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p>Filter</p>
                        </div>
                        <p style={{fontWeight:'bold'}}>1000 Products</p>
                        <div className="sort">
                            <select name="" id="" style={{fontWeight:'bold'}} onChange={(e)=>setSort(e.target.value)}>
                                <option value="title">Alphabet A-Z</option>
                                <option value="-title">Alphabet Z-A</option>
                                <option value="price">Price Low to High</option>
                                <option value="-price">Price High to Low</option>
                                <option value="createdAt">Old to New</option>
                                <option value="-createdAt">New to Old</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="products-listing">
        <p className="section-heading">Featured Products</p>
                

        <div className="product-list">
            {



                products.map((arm,index)=>{
                    return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle}/>    
                })
                
                    
            
}
      
        </div>

      </div>
                    <div className="pages">
                    <Button type="primary" loading={loadings[0]} onClick={loadMore}>
          Load More
        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
