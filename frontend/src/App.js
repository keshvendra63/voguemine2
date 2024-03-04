import './App.css';
import React,{useEffect} from 'react';
import Home from './pages/home/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomeMain from './pages/homeMain/HomeMain'
import Header from '../src/components/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/footer/Footer';
import About from './pages/categoryPage/About';
import Men from './pages/categoryPage/Men';
import Women from './pages/categoryPage/Women';
import Kids from './pages/categoryPage/Kids';
import Accessories from './pages/categoryPage/Accessories';
import Cart from './pages/cart/Cart';
import SingleProduct from './pages/singleproduct/SingleProduct';
import Products from './pages/products/Products';
import Wishlist from './pages/Wishlist';
import Blogs from './pages/blogs/Blogs';
import SingleBlog from './pages/blogs/SingleBlog';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/profile/Profile';
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts } from './features/products/productSlice';

function App() {
  const productState=useSelector((state)=>state?.product?.product)
  const dispatch=useDispatch();
  useEffect(()=>{
      getProducts()
  },[])
  const getProducts=()=>{
      dispatch(getAllProducts())
  }
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<HomeMain/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/accessories' element={<Accessories/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/collections/men-premium-shirt" element={<Products/>}/>
        <Route path="/collections/t-shirts" element={<Products/>}/>
        <Route path="/collections/mens-sweatshirts" element={<Products/>}/>
        <Route path="/collections/loafers-for-men" element={<Products/>}/>
        <Route path="/collections/floaters-slippers" element={<Products/>}/>
        <Route path="/collections/mens-sneakers" element={<Products/>}/>
        <Route path="/collections/mens-denim-jeans" element={<Products/>}/>
        <Route path="/collections/mens-hoodies" element={<Products/>}/>
        <Route path="/collections/mens-trackpants" element={<Products/>}/>
        <Route path="/collections/combos" element={<Products/>}/>
        <Route path="/collections/mens-premium-shorts" element={<Products/>}/>
        <Route path="/collections/mens-pullover-jackets" element={<Products/>}/>
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path="/blog/:id" element={<SingleBlog/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
