import React, { useEffect, useState } from 'react'
import './product.css'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts, resetState } from '../../features/products/productSlice';
import {getUserWishlistProduct} from '../../features/user/userSlice'
import {Button} from 'antd'
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
const Products = () => {
  const navigate=useNavigate()
  const [filter,setFilter]=useState(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
    const [collectionName,setCollectionName]=useState("")
    const [spinner,setSpinner]=useState("none")
    const [btn,setBtn]=useState("block")
  const [sort,setSort]=useState("-createdAt")
    const location=useLocation()
  const [limit,setLimit]=useState(700)
  const [page,setPage]=useState(1)
  const [loading,setLoading]=useState(true)
const [load,setLoad]=useState(28)
  const searchParams =location.search
  const dispatch=useDispatch();
  const queryParams = new URLSearchParams(location.search);
  let size = parseInt(queryParams.get('size')) || "";
// Get the value of the 'search' parameter
const searchValue = searchParams.split('=')[1];
useEffect(()=>{
  dispatch(resetState())
},[resetState])
const updateURL = (sizeNumber) => {
  const searchParams = new URLSearchParams();
  searchParams.set('size', sizeNumber);
  navigate(`${location.pathname}?${searchParams.toString()}`);
};
useEffect(()=>{
    if(location.pathname==="/collections/men-premium-shirt"){
        setCollectionName("Men's Premium Shirts")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])
      }
      if(location.pathname==="/collections/t-shirts"){
        setCollectionName("Men's Premium T Shirts")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/mens-sweatshirts"){
        setCollectionName("Men's Sweatshirts")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/loafers-for-men"){
        setCollectionName("Men's Loafers")
        setFilter(["UK-6","UK-7","UK-8","UK-9","UK-10","UK-11"])

      }
      if(location.pathname==="/collections/floaters-slippers"){
        setCollectionName("Men's Slippers")
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
        setFilter(["30","32","34","36","38","40","42"])

      }
      if(location.pathname==="/collections/mens-hoodies"){
        setCollectionName("Men's Hoodies")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/mens-trackpants"){
        setCollectionName("Men's Trackpants")
        setFilter(["L-40","XL-42","XXL-44","3XL-46"])
      }
      if(location.pathname==="/collections/combos"){
        setCollectionName("men,s combos")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46"])
      }
      if(location.pathname==="/collections/mens-pullover-jackets"){
        setCollectionName("Men's Jackets")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])

      }
      if(location.pathname==="/collections/mens-pullover"){
        setCollectionName("Men's Pullover")
        setFilter(["M-38","L-40","XL-42","XXL-44","3XL-46","4XL-48","5XL-50"])

      }
      if(location.pathname==="/collections/mens-trackset"){
        setCollectionName("Men's Track Set")
        setFilter(["L-40","XL-42","XXL-44","3XL-46"])

      }
      if(location.pathname==="/collections/womens-shirt-t-shirts"){
        setCollectionName("Women's T-Shirt")
        setFilter(["S 31-32","M 33-34","L 35-36","XL 37-38","XXl 39-40"])

    }
    
    if(location.pathname==="/collections/womens-dress"){
    setCollectionName("Women's Dresses")
    setFilter(["S 33-34","M 35-36","L 37-38","XL 39-40","XXl 41-42"])

    }
    
    if(location.pathname==="/collections/womens-co-ord-set"){
    setCollectionName("Women's Co-ord set")
    setFilter(["S 35-36","M 37-38","L 39-40","XL 41-42","XXl 43-44"])

    }
    
    if(location.pathname==="/collections/flat-sandals"){
    setCollectionName("Flat Sandals")
    setFilter(["37","38","39","40","41"])
    }
    
    if(location.pathname==="/collections/heeled-sandals"){
    setCollectionName("Heeled Sandals")
    setFilter(["37","38","39","40","41"])

    }
    
    if(location.pathname==="/collections/womens-legging"){
    setCollectionName("Women's Legging")
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
    setFilter(["2-90","4-100","6-110","8-120","10-130","12-140","14-150","16-160"])

    }
    
    if(location.pathname==="/collections/kids-co-ord-set"){
    setCollectionName("Kid's Girl co-ord Set")
    setFilter(["110-26","120-28","130-30","140-32","150-34","160-36"])

    }
    
    if(location.pathname==="/collections/kids-shirt"){
    setCollectionName("Kids Shirts")
    setFilter(["6-26","8-28","10-30","12-32","14-34","16-36"])

    }
    
    if(location.pathname==="/collections/kid-girls-dress"){
    setCollectionName("Kid Girl's Dress")
    setFilter(["6-110","8-120","10-130","12-140","14-150","16-160","4-100"])
    }
    
    if(location.pathname==="/collections/kids-t-shirts"){
    setCollectionName("Kid's T-Shirts")
    setFilter(["4-100","6-110","8-120","10-130","12-140","14-150","2-22","4-24","6-26","8-28","10-30","12-32","14-34","16-36"])

    }
    
    if(location.pathname==="/collections/belts"){
    setCollectionName("Men's Belt")
    setFilter(["85-30","90-32","95-34","100-36","105-38","110-40"])

    }
    
    if(location.pathname==="/collections/towels"){
    setCollectionName("Accessories Towel for Men and Women" || "Towels for Men & Women")
    setFilter([""])

    }
    
    if(location.pathname==="/collections/under-garment"){
    setCollectionName("Men's Accessories Under Garments" || "Men's Under Garments")
    setFilter(["L 33-34","XL 35-36","XXL 37-38","3XL 39-40"])
    }
    
    if(location.pathname==="/collections/no-show"){
    setCollectionName("Ankle Socks")
    setFilter([""])

    }
    
    if(location.pathname==="/collections/low-ankle"){
    setCollectionName("Ankle Socks")
    setFilter([""])

    }
    
    if(location.pathname==="/collections/low-cut"){
    setCollectionName("Ankle Socks")
    setFilter([""])

    }
    
    if(location.pathname==="/collections/anklet"){
    setCollectionName("Ankle Socks")
    setFilter([""])

    }
    
    if(location.pathname==="/collections/crew"){
    setCollectionName("Men's Accessories Socks")
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
    const loadMore=()=>{
    setLoad(load+28)
      // setLimit(limit+28)
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
    if(products?.length<load){
      setTimeout(()=>{
        setBtn("none")
      },3000)
    }
    else{
      setBtn("block")
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
  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
    while (fetchedProducts.length < 700) {
      const batch = await dispatch(getAllProducts({ sort, limit: 20, page, collectionName:"Men's Premium Shirts" }));
      if (!Array.isArray(batch)) {
        console.error('Error fetching products: Received non-array response');
        break;
      }
      fetchedProducts = [...fetchedProducts, ...batch];
      displayProducts(batch);
      if (fetchedProducts.length >= 700) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
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
}, []);



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
                        <p style={{fontWeight:'bold',marginBottom:0}}>{products?.length} Products</p>
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
        <p className="section-heading">{collectionName}</p>
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



                products?.slice(0,load)?.map((arm,index)=>{
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
