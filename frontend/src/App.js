import './App.css';
import React,{useEffect} from 'react';
import Home from './pages/home/Home'
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
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
import ScrollToTop from './components/ScrollToTop';
import RedirectUri from './pages/Testing';
import Policies from './pages/policies/Policies';
import Contact from './pages/contact/Contact';
import Newlogin from './pages/login/Newlogin';
function App() {

  return (
    <>
    <Router basename='/'>
    <Header/>
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Newlogin/>}/>
        <Route path='/home' element={<HomeMain/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/accessories' element={<Accessories/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/collections/:handle" element={<Products/>}/>
        <Route path="/products/:handle" element={<SingleProduct/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path="/blogs/news/:handle" element={<SingleBlog/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/success' element={<RedirectUri/>}/>
        <Route path='/pages/shipping-policy' element={<Policies/>}/>
        <Route path='/pages/refund-and-return-policy' element={<Policies/>}/>
        <Route path='/pages/terms-of-service' element={<Policies/>}/>
        <Route path='/pages/privacy-policy' element={<Policies/>}/>
        <Route path='/pages/contact' element={<Contact/>}/>

      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
