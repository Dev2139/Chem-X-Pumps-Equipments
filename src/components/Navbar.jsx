import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useQuoteModal } from '../context/QuoteModalContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const location = useLocation();

  // Highlight active links based on current path
  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Industries', path: '/industries' },
    { name: 'Services', path: '/services' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 md:bg-white py-4 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group focus:outline-none">
            <img 
              src={logo} 
              alt="Chem-X Pumps & Equipment" 
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105 object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isHash = link.path.startsWith('/#');
              const active = isActive(link.path);
              
              if (isHash) {
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="px-3 py-2 text-sm font-semibold text-brand-navy hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                    active 
                      ? 'text-brand-orange border-b-2 border-brand-orange' 
                      : 'text-brand-navy hover:text-brand-orange'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+919879884153" 
              className="flex items-center gap-2 text-brand-navy hover:text-brand-orange font-bold text-sm transition-colors"
            >
              <span className="bg-slate-100 p-2 rounded-full text-brand-blue group-hover:bg-brand-orange/10">
                <FaPhoneAlt size={12} />
              </span>
              <div className="flex flex-col text-left">
                <span>+91 98798 84153</span>
                <span className="text-[10px] text-slate-500 font-medium">+91 93289 46682</span>
              </div>
            </a>
            <button 
              onClick={() => openQuoteModal()}
              className="btn-primary py-2 px-5 text-sm uppercase tracking-wider font-bold cursor-pointer"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <a 
              href="tel:+919879884153"
              className="bg-slate-100 p-2.5 rounded-sm text-brand-navy hover:text-brand-orange transition-colors"
              aria-label="Call Chem-X"
            >
              <FaPhoneAlt size={14} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-navy hover:text-brand-orange transition-colors rounded-sm focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-100 shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img 
                  src={logo} 
                  alt="Chem-X Pumps & Equipment" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-brand-navy hover:text-brand-orange"
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isHash = link.path.startsWith('/#');
                
                if (isHash) {
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-bold text-brand-navy hover:text-brand-orange py-1"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-base font-bold py-1 border-b border-transparent ${
                      isActive(link.path) ? 'text-brand-orange border-brand-orange' : 'text-brand-navy hover:text-brand-orange'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <a 
              href="tel:+919879884153" 
              className="flex flex-col items-center gap-1 text-brand-navy font-bold text-sm justify-center py-2 bg-slate-50 rounded-sm"
            >
              <div className="flex items-center gap-2">
                <FaPhoneAlt size={12} className="text-brand-blue" />
                <span>+91 98798 84153</span>
              </div>
              <span className="text-xs font-normal text-slate-500">+91 93289 46682</span>
            </a>
            <button 
              onClick={() => { setIsOpen(false); openQuoteModal(); }}
              className="w-full btn-primary py-3 uppercase text-sm font-bold tracking-wider cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
