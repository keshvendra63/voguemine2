import React, { useEffect, useState } from 'react'
import banner from '../../images/A21.jpg'
import './product.css'
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {Link, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, getAllProducts } from '../../features/products/productSlice';
import {addToCart} from '../../features/user/userSlice'
import Product from '../../components/Product'
import ProductD from '../../components/DetailProduct';
const Products = () => {
  const [sort,setSort]=useState(null)

  const [limit,setLimit]=useState(1000)
  const [page,setPage]=useState(1)
  const loadMore=()=>{
    setPage(page+1)
  }
    const productState=useSelector((state)=>state?.product?.product)
    console.log(productState)
    const location=useLocation()
    const urlPath=location.pathname
    const dispatch=useDispatch();
    useEffect(()=>{
        getProducts()
    },[sort,limit,page])
    const getProducts=()=>{
        dispatch(getAllProducts({sort,limit,page}))
    }
    const addToWish=(id)=>{
        dispatch(addToWishlist(id))
    }
    const addTocart=(id)=>{
        dispatch(addToCart(id))
    }
    const products=productState? productState:[]

      
      // Function to filter products by SKU containing "VMSI"
      const groupProductsBySKUAndHandle = (products) => {
        const groupedProducts = {};
        
        products.forEach(product => {
            
            if(product.sku && product.sku.indexOf(('VMSI'|| 'VMS-'))!==-1){
                const key = `${product.sku}-${product.handle}`;  
            if (!groupedProducts[key]) {
                groupedProducts[key] = [];
            }
            groupedProducts[key].push(product);
            }
        });
        return groupedProducts;
    };
    
    const allProductsBySKUAndHandle = groupProductsBySKUAndHandle(products);
    const arrayOfObjects = Object.entries(allProductsBySKUAndHandle).map(([key, value]) => ({ key, value }));
console.log(arrayOfObjects)





    return (
        <div className='Products'>
            <div className="product-banner">
                <img src={banner} alt="" />
            </div>
            <div className="products-box margin-section">
                {/* <div className="filter">
                    <div className="category">
                        <p>Availability</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />In Stock</li>
                            <li><input type="checkbox" name="" id="" />Out of Stock</li>
                        </ul>
                    </div>
                    <div className="price">
                        <p>Price</p>
                        <ul>
                            <li>min:<input type="number" /></li>
                            <li>max:<input type="number" /></li>
                        </ul>


                    </div>
                    <div className="size">
                        <p>Size</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>
                    <div className="color">
                        <p>Colour</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>

                </div> */}
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
                arrayOfObjects.map((arm,index)=>{
                    return <Product key={index}>
                        {arm?.value.map((arms)=>{
                          return <ProductD id={arms?._id} key={arms?._id} img={arms?.img_src} title={arms?.title} price={arms?.price} colors={arms?.colors} size={arms?.size}/>

                        })}
                        </Product>
                    
                })
            }
      
        </div>

      </div>
                    <div className="pages">
                    <button onClick={loadMore}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
