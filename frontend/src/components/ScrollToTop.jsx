import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const element = document.scrollingElement || document.documentElement;
    element.style.scrollBehavior = 'auto'; // Disable smooth scrolling
    element.scrollTop = 0; // Scroll to the top instantly
    element.style.scrollBehavior = 'auto'; // Re-enable smooth scrolling (optional)
  }, [pathname]);

  return null;
};

export default ScrollToTop;