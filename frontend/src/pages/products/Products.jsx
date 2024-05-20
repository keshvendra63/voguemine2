import React, { useEffect, useState } from 'react'
import './product.css'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts, resetState } from '../../features/products/productSlice';
import { getACollection } from '../../features/collection/collectionSlice';
import {Button} from 'antd'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Product from '../../components/Product'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CircularProgress from '@mui/material/CircularProgress';

const Products = () => {
  const collectionState=useSelector((state)=>state?.collection?.singleCollection)
  const bannerState=useSelector((state)=>state?.banner?.banner)
  const navigate=useNavigate()
  const [filter,setFilter]=useState(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
    const [collectionName,setCollectionName]=useState("")
    const [spinner,setSpinner]=useState("none")
    const [btn,setBtn]=useState("flex")
  const [sort,setSort]=useState("-createdAt")
    const location=useLocation()
  const [limit,setLimit]=useState(28)
  const [loading,setLoading]=useState(true)
  const [searchValue,setSearchvalue]=useState(undefined)
  const [load, setLoad] = useState(28)
  const [fload,setFload]=useState(0)
  const searchParams =location.search
  const dispatch=useDispatch();
  const queryParams = new URLSearchParams(location.search);
  let page = parseInt(queryParams.get('page')) || 1;
const search = JSON.parse(localStorage.getItem("search"))
useEffect(()=>{
if(search){
  if(location.pathname==="/products")
  setSearchvalue(search.mysearch)
}
},[search])

const pathname = location.pathname; // Gives "/collections/men-premium-shirt"
const segments = pathname.split('/'); // Splits the pathname into segments
const collection = segments[2]; // Gets "men-premium-shirt" assuming it's always in this position

console.log(collectionState)
useEffect(()=>{
  if(location?.pathname!=="/products"){
    localStorage.removeItem("search")

  }
},[location])
useEffect(()=>{
  dispatch(resetState())
},[dispatch])
const updateURL = (sizeNumber) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', sizeNumber);
  navigate(`${location.pathname}?${searchParams.toString()}`);
};

    const productState=useSelector((state)=>state?.product?.product)
    const productState1=useSelector((state)=>state?.product?.prdt)
    const productStat = useSelector((state) => state?.product);

    const {isError,isLoading,isSuccess}=productStat
    const getcollection=async()=>{
    dispatch(getACollection(collection))
      setCollectionName(collectionState?.title)
    }
    useEffect(()=>{
      getcollection()

      if(searchValue===undefined){
          dispatch(getAllProducts({sort,limit,page,collectionName:collectionState?.title}))
      }
    else{
        dispatch(getProducts({searchValue,limit,sort,page}))
    }
    },[searchValue,page,limit,collectionState?.title])
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
      }, 2000);
    };
 
  
    // Effect to reset load to 28 when the pathname changes
 

    const loadMore=()=>{
      if(page>0){
        page--
      updateURL(page)
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Smooth scrolling animation
      });

      // setLimit(limit+28)
      enterLoading(0)
      }
    }
    const loadMore1=()=>{
      page++
      updateURL(page)

      // setLimit(limit+28)
      enterLoading(0)
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Smooth scrolling animation
      });
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
      setTimeout(()=>{
        setLoading(false)

      },2000)
    }
  },[isLoading,isSuccess,products])

useEffect(()=>{
    if(products?.length<load){
      setTimeout(()=>{
        setBtn("none")
      },3000)
    }
    else{
      setBtn("flex")
    }
  
})
const [open, setOpen] = React.useState(false);

const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};
const liItem=(text)=>{
  dispatch(getAllProducts({collectionName,size:text,sort,limit,page}))

}


// const fetchProducts = async () => {
//   try {
//     let fetchedProducts = [];
//     let totalFetched = 0;
//     while (totalFetched < 700) {
//       const batch = await dispatch(getAllProducts({ sort, limit:56, page, collectionName }));
//       if (!Array.isArray(batch)) {
//         console.error('Error fetching products: Received non-array response');
//         break;
//       }
//       fetchedProducts = [...fetchedProducts, ...batch];
//       totalFetched += batch.length;
//       displayProducts(batch);
//       await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 1 second before fetching next batch
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// };
// // Function to display products to the user
// const displayProducts = (prdts) => {
//   console.log('Displayed products:', prdts);
//   // Implement your logic to display products in the UI
// };

// useEffect(() => {
//   fetchProducts();
// }, [collectionName,limit,sort]);



    return (
        <div className='Products'>
            <div className="category-banner">
                <img src={bannerState[35]?.images[0]?.url || "https://res.cloudinary.com/dqh6bd766/image/upload/v1712382538/a36_f0eblb.jpg"} alt={bannerState[35]?.alt} />
            </div>
            <div className="products-box margin-section">
 
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p style={{fontWeight:500,cursor:'pointer'}} onClick={toggleDrawer(true)}>Filter</p>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="filter-div">
          <p className='filter-head'>Filter</p>
          <div className="avail">
            <p>Availability</p>
            <p>in stock : 0</p>
            <p>out of stock : 0</p>
          </div>
          <div className="category">
              <p>Category</p>
              <ul>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>
                <li>cat1</li>

              </ul>
          </div>
          <div className="brand">
<p>Brand</p>
<ul>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>
  <li>Brand1</li>

</ul>
          </div>
          <div className="price">
            <p>Price</p>
..................
          </div>
          <div className="color">
<p>Color</p>
<ul>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>
  <li>c1</li>

</ul>
          </div>
          <div className="size">
<p>Size</p>
<ul>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>
  <li>Size1</li>

</ul>
          </div>
        </div>
      </Drawer>
                        </div>
                       
                     
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
        <h1 className="section-heading">{collectionState?.category}</h1>
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



                products?.map((arm,index)=>{
                    return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>    
                })
                
                    
            
}
      
        </div>
}



      </div>



                    <div className="pages">
                      {
                        loading===true? <CircularProgress/>:
                        <div className='handle-buttons'>
                           <Button type="primary" loading={loadings[0]} onClick={loadMore} style={{backgroundColor:page===1?"black":"",cursor:'auto'}}>
          <ArrowBackIosIcon/>
        </Button>
        <p>{page}</p>
        <Button type="primary" loading={loadings[0]} onClick={loadMore1} style={{display:btn}}>
          <ArrowForwardIosIcon/>
        </Button>
                        </div>
                       
        
                      }
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
