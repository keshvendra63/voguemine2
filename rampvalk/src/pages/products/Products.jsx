import React, { useEffect, useState } from 'react'
import './product.css'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts, resetState } from '../../features/products/productSlice';
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
  const navigate=useNavigate()
  const [filter,setFilter]=useState(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
    const [collectionName,setCollectionName]=useState("")
    const [spinner,setSpinner]=useState("none")
    const [btn,setBtn]=useState("flex")
  const [sort,setSort]=useState("-createdAt")
    const location=useLocation()
  const [limit,setLimit]=useState(700)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
  const [searchValue,setSearchvalue]=useState(undefined)
  const [load, setLoad] = useState(28)
  const [fload,setFload]=useState(0)
  const searchParams =location.search
  const dispatch=useDispatch();
  const queryParams = new URLSearchParams(location.search);
  let slace = parseInt(queryParams.get('slace')) || 0;
// Get the value of the 'search' parameter
const search = JSON.parse(localStorage.getItem("search"))
useEffect(()=>{
if(search){
  setSearchvalue(search.mysearch)
}
},[search])
useEffect(()=>{
localStorage.removeItem("search")
},[location.pathname])
useEffect(()=>{
  dispatch(resetState())
},[resetState])
const updateURL = (sizeNumber) => {
  const searchParams = new URLSearchParams();
  searchParams.set('slace', sizeNumber);
  navigate(`${location.pathname}?${searchParams.toString()}`);
};
console.log(location.pathname)
useEffect(()=>{
    if(location.pathname==="/collections/men-premium-shirt"){
        setCollectionName("Men's Premium Shirts")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
      }
      if(location.pathname==="/collections/men-premium-half-sleeve-shirt"){
        setCollectionName("Men's Premium Half Sleeve Shirt")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
      }
      if(location.pathname==="/collections/t-shirts"){
        setCollectionName("Men's Premium T Shirts")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/mens-sweatshirts"){
        setCollectionName("Men's Sweatshirts")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/loafers-for-men"){
        setCollectionName("Men's Loafers")
        document.title=collectionName

        setFilter(["UK-6","UK-7","UK-8","UK-9","UK-10","UK-11"])

      }
      if(location.pathname==="/collections/floaters-slippers"){
        setCollectionName("Men's Slippers")
        document.title=collectionName

        setFilter(["UK-6","UK-7","UK-8","UK-9","UK-10","UK-11"])
      }
      if(location.pathname==="/collections/mens-sneakers-firstcopyshoes"){
        setCollectionName("Men's Sneakers")
        document.title = "Buy Premium First Copy Shoes: Best Brands & Latest Trends - Vogue Mine"
        document.querySelector('meta[name="description"]').setAttribute('content',"Shop first copy shoes from Vogue Mine: Get premium, top-quality designs from brands like Dior, Gucci, & more. Latest trends await you!");
        setFilter(["UK-6","UK-7","UK-8","UK-9","UK-10","UK-11"])
      }
      if(location.pathname==="/collections/mens-denim-jeans"){
        setCollectionName("Men's Denim Jeans")
        document.title=collectionName

        setFilter(["30","32","34","36","38","40","42"])

      }
      if(location.pathname==="/collections/mens-hoodies"){
        setCollectionName("Men's Hoodies")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/mens-trackpants"){
        setCollectionName("Men's Trackpants")
        document.title=collectionName

        setFilter(["L-40","XL-42","XXL-44","3XL-46"])
      }
      if(location.pathname==="/collections/combos"){
        setCollectionName("men,s combos")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])
      }
      if(location.pathname==="/collections/mens-pullover-jackets"){
        setCollectionName("Men's Jackets")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])

      }
      if(location.pathname==="/collections/mens-pullover"){
        setCollectionName("Men's Pullover")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])

      }
      if(location.pathname==="/collections/mens-premium-shorts"){
        setCollectionName("Men's Premium Shorts")
        document.title=collectionName

        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])

      }
      if(location.pathname==="/collections/mens-trackset"){
        setCollectionName("Men's Track Set")
        document.title=collectionName

        setFilter(["L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/womens-shirt-t-shirts"){
        setCollectionName("Women's T-Shirt")
        document.title=collectionName

        setFilter(["S 31-32","M 33-34","L 35-36","XL 37-38","XXl 39-40"])

    }
    
    if(location.pathname==="/collections/womens-dress"){
    setCollectionName("Women's Dresses")
    document.title=collectionName

    setFilter(["S 33-34","M 35-36","L 37-38","XL 39-40","XXl 41-42"])

    }
    
    if(location.pathname==="/collections/womens-co-ord-set"){
    setCollectionName("Women's Co-ord set")
    document.title=collectionName

    setFilter(["S 35-36","M 37-38","L 39-40","XL 41-42","XXl 43-44"])

    }
    
    if(location.pathname==="/collections/flat-sandals"){
    setCollectionName("Flat Sandals")
    document.title=collectionName

    setFilter(["37","38","39","40","41"])
    }
    
    if(location.pathname==="/collections/heeled-sandals"){
    setCollectionName("Heeled Sandals")
    document.title=collectionName

    setFilter(["37","38","39","40","41"])

    }
    
    if(location.pathname==="/collections/womens-legging"){
    setCollectionName("Women's Legging")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-sweatshirt"){
    setCollectionName("Women's Sweatshirts")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-hoodie"){
    setCollectionName("Women's Pullovers")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-pullovers"){
    setCollectionName("Women's Pullovers")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-pullover-jackets"){
    setCollectionName("Womens'Jackets")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-winter-coats"){
    setCollectionName("Women's Winter Coats")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/womens-track-sets"){
    setCollectionName("Women's Track Sets")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/kids-tracksuit"){
    setCollectionName("Kids Tracksuit")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/kids-boy-jacket"){
    setCollectionName("Kid's Jackets")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/kids-girl-jacket"){
    setCollectionName("Kid's Girl co-ord Set")
    document.title=collectionName

    }
    
    if(location.pathname==="/collections/kids-hoodie"){
    setCollectionName("Kid's Boy's Cord-Set")
    document.title=collectionName

    setFilter(["2-90","4-100","6-110","8-120","10-130","12-140","14-150","16-160"])

    }
    
    if(location.pathname==="/collections/kids-co-ord-set"){
    setCollectionName("Kid's Girl co-ord Set")
    document.title=collectionName

    setFilter(["110-26","120-28","130-30","140-32","150-34","160-36"])

    }
    
    if(location.pathname==="/collections/kids-shirt"){
    setCollectionName("Kids Shirts")
    document.title=collectionName

    setFilter(["6-26","8-28","10-30","12-32","14-34","16-36"])

    }
    
    if(location.pathname==="/collections/kid-girls-dress"){
    setCollectionName("Kid Girl's Dress")
    document.title=collectionName

    setFilter(["6-110","8-120","10-130","12-140","14-150","16-160","4-100"])
    }
    
    if(location.pathname==="/collections/kids-t-shirts"){
    setCollectionName("Kid's T-Shirts")
    document.title=collectionName

    setFilter(["4-100","6-110","8-120","10-130","12-140","14-150","2-22","4-24","6-26","8-28","10-30","12-32","14-34","16-36"])

    }
    
    if(location.pathname==="/collections/belts"){
    setCollectionName("Men's Belt")
    document.title=collectionName

    setFilter(["85-30","90-32","95-34","100-36","105-38","110-40"])

    }
    
    if(location.pathname==="/collections/towels"){
    setCollectionName("Accessories Towel for Men and Women" || "Towels for Men & Women")
    document.title=collectionName

    setFilter([""])

    }
    
    if(location.pathname==="/collections/under-garment"){
    setCollectionName("Men's Accessories Under Garments" || "Men's Under Garments")
    document.title=collectionName

    setFilter(["L 33-34","XL 35-36","XXL 37-38","3XL 39-40"])
    }
    
    if(location.pathname==="/collections/no-show"){
    setCollectionName("No Show")
    document.title=collectionName

    setFilter([""])

    }
    
    if(location.pathname==="/collections/low-ankle"){
    setCollectionName("Low Ankle") 
     document.title=collectionName


    setFilter([""])

    }
    
    if(location.pathname==="/collections/low-cut"){
    setCollectionName("Low Cut")
    document.title=collectionName

    setFilter([""])

    }
    
    if(location.pathname==="/collections/anklet"){
    setCollectionName("Anklet")
    document.title=collectionName

    setFilter([""])

    }
    
    if(location.pathname==="/collections/crew"){
    setCollectionName("Crew")
    document.title=collectionName

    setFilter([""])

    }
    
    
},[location])
    const productState=useSelector((state)=>state?.product?.product)
    const productState1=useSelector((state)=>state?.product?.prdt)
    const productStat = useSelector((state) => state?.product);

    const {isError,isLoading,isSuccess}=productStat
    
    useEffect(()=>{
      if(searchValue===undefined){
          dispatch(getAllProducts({sort,limit,page,collectionName}))
      }
    else{
        dispatch(getProducts({searchValue,limit,sort,page}))
    }
    },[collectionName,searchValue,page,limit])
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
 
  
    // Effect to reset load to 28 when the pathname changes
 
    useEffect(() => {
      const slaceFromURL = parseInt(queryParams.get('slace')) || 0;
      setFload(slaceFromURL * 28);
      setLoad((slaceFromURL+1) * 28);

    }, []);
    
    // Effect to update fload when slace changes
    useEffect(() => {
      setFload(slace * 28);
      setLoad((slace+1) * 28);

    }, [slace]);
    const loadMore=()=>{
      if(slace>0){
        slace--
      updateURL(slace)
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Smooth scrolling animation
      });

      // setLimit(limit+28)
      enterLoading(0)
      }
    }
    const loadMore1=()=>{
      slace++
      updateURL(slace)

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

const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} className="filter-box">
    <p style={{fontSize:'20px',marginBottom:'20px',fontWeight:500}}>Select Size</p>
    <List>
      {filter?.map((text) => (
        <ListItem key={text} disablePadding onClick={()=>liItem(text)}>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);


const fetchProducts = async () => {
  try {
    let fetchedProducts = [];
    let totalFetched = 0;
    while (totalFetched < 700) {
      const batch = await dispatch(getAllProducts({ sort, limit:56, page, collectionName }));
      if (!Array.isArray(batch)) {
        console.error('Error fetching products: Received non-array response');
        break;
      }
      fetchedProducts = [...fetchedProducts, ...batch];
      totalFetched += batch.length;
      displayProducts(batch);
      await new Promise(resolve => setTimeout(resolve, 200)); // Wait for 1 second before fetching next batch
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
// Function to display products to the user
const displayProducts = (prdts) => {
  console.log('Displayed products:', prdts);
  // Implement your logic to display products in the UI
};

useEffect(() => {
  fetchProducts();
}, [collectionName,limit,sort]);



    return (
        <div className='Products'>
            <div className="category-banner">
                <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1712382538/a36_f0eblb.jpg" alt="" />
            </div>
            <div className="products-box margin-section">
 
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p style={{fontWeight:500,cursor:'pointer'}} onClick={toggleDrawer(true)}>Filter</p>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
                        </div>
                        {
                          loading===true? <p style={{marginBottom:0}}>
                          Loading.....</p>:
                           <p style={{marginBottom:0}}>
                           {products?.length} Products</p>
                        }
                        {/* <p style={{fontWeight:'bold',marginBottom:0}}>
                          {products?.length} Products</p> */}
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
        <h1 className="section-heading">{collectionName}</h1>
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



                products?.slice(fload,load)?.map((arm,index)=>{
                    return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm}/>    
                })
                
                    
            
}
      
        </div>
}



      </div>



                    <div className="pages">
                      {
                        loading===true? <CircularProgress/>:
                        <div className='handle-buttons'>
                           <Button type="primary" loading={loadings[0]} onClick={loadMore} style={{backgroundColor:slace===0?"black":"",cursor:'auto'}}>
          <ArrowBackIosIcon/>
        </Button>
        <p>{slace+1}</p>
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