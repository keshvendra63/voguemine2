import './App.css';
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
function App() {
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
        <Route path="/product" element={<SingleProduct/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path="/blog/:id" element={<SingleBlog/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
