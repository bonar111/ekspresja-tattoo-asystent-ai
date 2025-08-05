import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import { useSiteView } from '../../lib/useSiteView';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 1️⃣  Jednorazowy eventt „AISiteView”
  useSiteView();

  // 2️⃣  Klasyczny Meta Pixel „PageView” przy każdej zmianie URL-a
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  // 3️⃣  Cienie / zmiana tła navbaru przy scrollu
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
