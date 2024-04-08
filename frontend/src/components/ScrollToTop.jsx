import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {getAllProducts,getAProduct} from '../features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const dispatch =useDispatch()

  useEffect(() => {
    const element = document.scrollingElement || document.documentElement;
    element.style.scrollBehavior = 'auto'; // Disable smooth scrolling
    element.scrollTop = 0; // Scroll to the top instantly
    element.style.scrollBehavior = 'auto'; // Re-enable smooth scrolling (optional)
    // dispatch(getAllProducts({collectionName:''}))
    // dispatch(getAProduct({handle:""}))
  }, [pathname]);

  return null;
};

export default ScrollToTop;