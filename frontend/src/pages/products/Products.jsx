import React, { useEffect, useState } from 'react'
import './product.css'
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts } from '../../features/products/productSlice';
import {getUserWishlistProduct} from '../../features/user/userSlice'
import Product from '../../components/Product'
import { Button} from 'antd';
const Products = () => {
    const [collectionName,setCollectionName]=useState("")
    const [spinner,setSpinner]=useState("none")
    const [btn,setBtn]=useState("block")
  const [sort,setSort]=useState("-createdAt")
    const location=useLocation()
  const [limit,setLimit]=useState(28)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)

  const searchParams =location.search

// Get the value of the 'search' parameter
const searchValue = searchParams.split('=')[1];


useEffect(() => {
  // Set the collection name based on the current path
  const path = location.pathname;
  setCollectionName(getCollectionName(path));
}, [location.pathname]);

const getCollectionName = (path) => {
    if(path==="/collections/men-premium-shirt"){
        return("Men's Premium Shirts")
      }
      if(path==="/collections/t-shirts"){
        return("Men's Premium T Shirts")
      }
      if(path==="/collections/mens-sweatshirts"){
        return("Men's Sweatshirts")
      }
      if(path==="/collections/loafers-for-men"){
        return("Men's Loafers")
      }
      if(path==="/collections/floaters-slippers"){
        return("Men's Premium Slippers")
      }
      if(path==="/collections/mens-sneakers"){
        return("Men's Sneakers")
      }
      if(path==="/collections/mens-denim-jeans"){
        return("Men's Denim Jeans")
      }
      if(path==="/collections/mens-hoodies"){
        return("Men's Hoodies")
      }
      if(path==="/collections/mens-trackpants"){
        return("Men's Trackpants")
      }
      if(path==="/collections/combos"){
        return("men,s combos")
      }
      if(path==="/collections/mens-pullover-jackets"){
        return("Men's Jackets")
      }
      if(path==="/collections/mens-pullover"){
        return("Men's Pullover")
      }
      if(path==="/collections/mens-trackset"){
        return("Men's Track Set")
      }
      if(path==="/collections/womens-shirt-t-shirts"){
        return("Women's T-Shirt")
    }
    
    if(path==="/collections/womens-dress"){
    return("Women's Dresses")
    }
    
    if(path==="/collections/womens-co-ord-set"){
    return("Women's Co-ord set")
    }
    
    if(path==="/collections/flat-sandals"){
    return("Flat Sandals")
    }
    
    if(path==="/collections/heeled-sandals"){
    return("Heeled Sandals")
    }
    
    if(path==="/collections/womens-legging"){
    return("Women's Lower & Legging")
    }
    
    if(path==="/collections/womens-sweatshirt"){
    return("Women's Sweatshirts")
    }
    
    if(path==="/collections/womens-hoodie"){
    return("Women's Pullovers")
    }
    
    if(path==="/collections/womens-pullovers"){
    return("Women's Pullovers")
    }
    
    if(path==="/collections/womens-pullover-jackets"){
    return("Womens'Jackets")
    }
    
    if(path==="/collections/womens-winter-coats"){
    return("Women's Winter Coats")
    }
    
    if(path==="/collections/womens-track-sets"){
    return("Women's Track Sets")
    }
    
    if(path==="/collections/kids-tracksuit"){
    return("Kids Tracksuit")
    }
    
    if(path==="/collections/kids-boy-jacket"){
    return("Kid's Jackets")
    }
    
    if(path==="/collections/kids-girl-jacket"){
    return("Kid's Girl co-ord Set")
    }
    
    if(path==="/collections/kids-hoodie"){
    return("Kid's Boy's Cord-Set")
    }
    
    if(path==="/collections/kids-co-ord-set"){
    return("Kid's Girl co-ord Set")
    }
    
    if(path==="/collections/kids-shirt"){
    return("Kids Shirts")
    }
    
    if(path==="/collections/kid-girls-dress"){
    return("Kid Girl's Dress")
    }
    
    if(path==="/collections/kids-t-shirts"){
    return("Kid's T-Shirts")
    }
    
    if(path==="/collections/belts"){
    return("Men's Belt")
    }
    
    if(path==="/collections/towels"){
    return("Accessories Towel for Men and Women" || "Towels for Men & Women")
    }
    
    if(path==="/collections/under-garment"){
    return("Men's Accessories Under Garments" || "Men's Under Garments")
    }
    
    if(path==="/collections/no-show"){
    return("Ankle Socks")
    }
    
    if(path==="/collections/low-ankle"){
    return("Ankle Socks")
    }
    
    if(path==="/collections/low-cut"){
    return("Ankle Socks")
    }
    
    if(path==="/collections/anklet"){
    return("Ankle Socks")
    }
    
    if(path==="/collections/crew"){
    return("Men's Accessories Socks")
    }
    else{
      return ''
    }
    
    
}
    const productState=useSelector((state)=>state?.product?.product)
    const productState1=useSelector((state)=>state?.product?.prdt)
    const productStat = useSelector((state) => state?.product);

    const {isError,isLoading,isSuccess}=productStat
    const dispatch=useDispatch();
    
    useEffect(()=>{
      if(searchValue===undefined){
          dispatch(getAllProducts({sort,limit,page,collectionName}))
      }
    
    else{
        dispatch(getProducts({searchValue,limit,sort,page}))
    }
    },[collectionName,searchValue,page,limit,sort])
    const products=searchValue===undefined?(productState? productState:[]):(productState1? productState1:[])
      
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
    
    const sortChange = (e) => {
      const selectedSort = e.target.value; // Get the selected sorting order
      setSort(selectedSort); // Update the sort state variable
      if (searchValue === undefined) {
          dispatch(getAllProducts({ sort: selectedSort, limit, page, collectionName })); // Dispatch action with the updated sorting order
      } else {
          dispatch(getProducts({ searchValue, limit, sort: selectedSort, page })); // Dispatch action with the updated sorting order
      }
  };

  useEffect(()=>{
    if(isLoading && products){
      setLoading(true)
    }
    if(isSuccess && products){
      setLoading(false)
    }
  },[isLoading,isSuccess])

useEffect(()=>{
    if(products?.length<limit){
      setTimeout(()=>{
        setBtn("none")
      },3000)
    }
    else{
      setBtn("block")
    }
  
})



    return (
        <div className='Products'>
            <div className="category-banner">
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710505437/a36_ba131u.jpg" alt="" />
            </div>
            <div className="products-box margin-section">
 
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p>Filter</p>
                        </div>
                        <p style={{fontWeight:'bold'}}>{limit} Products</p>
                        <div className="sort">
                            <select name="" id="" style={{fontWeight:'bold'}} onChange={sortChange} value={sort} defaultValue="-createdAt">
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



                products.map((arm,index)=>{
                    return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm}/>    
                })
                
                    
            
}
      
        </div>
}

        

      </div>
                    <div className="pages">
                    <Button type="primary" loading={loadings[0]} onClick={loadMore} style={{display:btn}}>
          Load More
        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
