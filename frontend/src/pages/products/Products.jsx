import React, { useEffect, useState } from 'react'
import banner from '../../images/A21.jpg'
import './product.css'
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts } from '../../features/products/productSlice';
import Product from '../../components/Product'
const Products = () => {
  const [sort,setSort]=useState(null)
    const location=useLocation()
  const [limit,setLimit]=useState(100)
  const [page,setPage]=useState(1)
  const loadMore=()=>{
    setPage(page+1)
  }
    const productState=useSelector((state)=>state?.product?.product)
    const dispatch=useDispatch();
    useEffect(()=>{
        getProducts()
    },[sort,limit,page])
    const getProducts=()=>{
        dispatch(getAllProducts({sort,limit,page}))
    }
    const products=productState? productState:[]
      
    const shirts = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -')) 
    const tshirt = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const jeans = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const loafers = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const jackets = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const hoodies = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const slippers = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const combo = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const trackset = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const trackpants = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const sweatshirt = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    const pullover = products.filter(object => object.sku && object.sku.includes('VMSI' || "vms-" || 'vms -'))
    // .slice(0, 100);

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
                
                shirts.map((arm,index)=>{
                    if(location.pathname==="/collections/men-premium-shirt"){

                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants}/>
                    
                }
                if(location.pathname==="/collections/t-shirts"){
                    if(arm.collectionName==="Men's Premium T Shirts"){
                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants}/>
                    
                    }
                }
                   
                if(location.pathname==="/collections/loafers-for-men"){
                    if(arm.collectionName==="Men's Loafers"){
                        return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants}/>
                    
                    }
                }
                   
                    
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
