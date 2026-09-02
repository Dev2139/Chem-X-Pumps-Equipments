import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QuoteModalProvider } from './context/QuoteModalContext';
import { ProductsProvider } from './context/ProductsContext';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Industries from './pages/Industries';
import Services from './pages/Services';
import Contact from './pages/Contact';
import WhyUs from './pages/WhyUs';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ProductsProvider>
        <QuoteModalProvider>
          <div className="flex flex-col min-h-screen bg-white">
            
            {/* Scroll reset utility */}
            <ScrollToTop />
            
            {/* Header Sticky Navbar */}
            <Navbar />
            
            {/* Main Application Routes */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
                <Route path="/products" element={<RouteTransition><Products /></RouteTransition>} />
                <Route path="/product/:productId" element={<RouteTransition><ProductDetails /></RouteTransition>} />
                <Route path="/industries" element={<RouteTransition><Industries /></RouteTransition>} />
                <Route path="/services" element={<RouteTransition><Services /></RouteTransition>} />
                <Route path="/why-us" element={<RouteTransition><WhyUs /></RouteTransition>} />
                <Route path="/gallery" element={<RouteTransition><Gallery /></RouteTransition>} />
                <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
                
                {/* Admin panel (MongoDB product management) */}
                <Route path="/admin" element={<Admin />} />
                
                {/* Fallback redirect */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />

            {/* Floating WhatsApp Button */}
            <WhatsAppButton />

          </div>
        </QuoteModalProvider>
        </ProductsProvider>
      </Router>
    </HelmetProvider>
  );
}

// Minimal, clean route animation transition wrapper (using standard React components to keep bundle light and fast)
function RouteTransition({ children }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
}
