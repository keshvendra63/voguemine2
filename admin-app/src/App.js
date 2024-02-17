import './App.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/home/Home';
import Orders from './pages/Order/Orders'
function App() {
  return (
    <>
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      
      </Router>
    </>
  );
}

export default App;
