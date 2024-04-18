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
import Login from './pages/login/Login';
import Policies from './pages/policies/Policies';
import Contact from './pages/contact/Contact';
function App() {

  return (
    <>
    <Router basename='/'>
    <Header/>
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<HomeMain/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/accessories' element={<Accessories/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/collections/men-premium-shirt" element={<Products/>}/>
        <Route path="/collections/men-premium-half-sleeve-shirt" element={<Products/>}/>
        <Route path="/collections/t-shirts" element={<Products/>}/>
        <Route path="/collections/mens-sweatshirts" element={<Products/>}/>
        <Route path="/collections/loafers-for-men" element={<Products/>}/>
        <Route path="/collections/floaters-slippers" element={<Products/>}/>
        <Route path="/collections/mens-sneakers-firstcopyshoes" element={<Products/>}/>
        <Route path="/collections/mens-denim-jeans" element={<Products/>}/>
        <Route path="/collections/mens-hoodies" element={<Products/>}/>
        <Route path="/collections/mens-trackpants" element={<Products/>}/>
        <Route path="/collections/combos" element={<Products/>}/>
        <Route path="/collections/mens-pullover-jackets" element={<Products/>}/>
        <Route path="/collections/mens-premium-shorts" element={<Products/>}/>
        <Route path="/collections/mens-trackset" element={<Products/>}/>
        <Route path="/collections/womens-shirt-t-shirts" element={<Products/>}/>
        <Route path="/collections/womens-dress" element={<Products/>}/>
        <Route path="/collections/womens-co-ord-set" element={<Products/>}/>
        <Route path="/collections/flat-sandals" element={<Products/>}/>
        <Route path="/collections/heeled-sandals" element={<Products/>}/>
        <Route path="/collections/womens-legging" element={<Products/>}/>
        <Route path="/collections/womens-sweatshirt" element={<Products/>}/>
        <Route path="/collections/womens-hoodie" element={<Products/>}/>
        <Route path="/collections/womens-pullovers" element={<Products/>}/>
        <Route path="/collections/womens-pullover-jackets" element={<Products/>}/>
        <Route path="/collections/womens-winter-coats" element={<Products/>}/>
        <Route path="/collections/womens-track-sets" element={<Products/>}/>
        <Route path="/collections/kids-tracksuit" element={<Products/>}/>
        <Route path="/collections/kids-boy-jacket" element={<Products/>}/>
        <Route path="/collections/kids-girl-jacket" element={<Products/>}/>
        <Route path="/collections/kids-hoodie" element={<Products/>}/>
        <Route path="/collections/kids-co-ord-set" element={<Products/>}/>
        <Route path="/collections/kids-shirt" element={<Products/>}/>
        <Route path="/collections/kid-girls-dress" element={<Products/>}/>
        <Route path="/collections/kids-t-shirts" element={<Products/>}/>
        <Route path="/collections/belts" element={<Products/>}/>
        <Route path="/collections/towels" element={<Products/>}/>
        <Route path="/collections/under-garment" element={<Products/>}/>
        <Route path="/collections/no-show" element={<Products/>}/>
        <Route path="/collections/low-ankle" element={<Products/>}/>
        <Route path="/collections/low-cut" element={<Products/>}/>
        <Route path="/collections/anklet" element={<Products/>}/>
        <Route path="/collections/crew" element={<Products/>}/>
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
