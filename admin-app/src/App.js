import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import Orders from './pages/Order/Orders'
import Products from './pages/product/Products'
import Collections from './pages/collections/Collections'
import Customers from './pages/customer/Customers'
import Discount from './pages/discount/Discounts'
import Login from './pages/login/Login';
function App() {
  return (
    <>
    <Router>
    <Header/>
      <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<Home/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/product' element={<Products/>}/>
        <Route path='/collection' element={<Collections/>}/>
        <Route path='/customer' element={<Customers/>}/>
        <Route path='/discount' element={<Discount/>}/>
      </Routes>
      
      </Router>
    </>
  );
}

export default App;
