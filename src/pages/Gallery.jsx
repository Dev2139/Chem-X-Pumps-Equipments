import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaPhoneAlt, FaImages, FaArrowRight, FaTag } from 'react-icons/fa';
import { galleryItems } from '../data/galleryData';
import SEO from '../components/SEO';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function Gallery() {
  const { openQuoteModal } = useQuoteModal();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Extract unique categories
  const categories = ['All', 'Dispatching', 'Owner', 'Mounting', 'Testing & Confirmation', 'Manufacturing', 'Products', 'Servicing'];

  // Filter gallery items
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory || item.label === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Factory & Operations Gallery | Chem-X Pumps" 
        description="Explore Chem-X Pumps factory manufacturing, baseplate mounting, dispatching, leadership, and operational gallery."
      />

      {/* Hero Header */}
      <section className="bg-brand-navy text-white py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-orange">Gallery</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-sm mb-3">
                <FaImages size={12} /> Visual Showcase
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Factory & Operational Gallery
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl mt-3 leading-relaxed">
                Take a look inside Chem-X manufacturing facility, mounting procedures, dispatch operations, leadership, and quality testing.
              </p>
            </div>

            <button 
              onClick={() => openQuoteModal()}
              className="btn-primary py-3 px-6 text-sm uppercase font-bold tracking-wider shrink-0 cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid Section */}
      <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs md:text-sm font-bold rounded-sm border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-navy border-brand-navy text-white shadow-sm scale-105'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-4/3 bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Label Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold uppercase tracking-wider rounded-sm shadow-md">
                      <FaTag size={10} /> {item.label}
                    </span>
                  </div>

                  {/* Zoom Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="p-3 bg-white/90 text-brand-navy rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FaExpand size={18} />
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 text-left space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Chem-X Facility
                    </span>
                    <button 
                      onClick={() => setLightboxIndex(index)}
                      className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 group/btn"
                    >
                      View Photo <FaArrowRight size={10} className="transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy text-white py-16 text-center border-t-4 border-brand-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Interested in Our Manufacturing Capabilities?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Contact our engineering sales team to request technical datasheets, CAD drawings, or custom pump specifications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a href="tel:+919328946682" className="btn-primary flex items-center justify-center gap-2 font-bold cursor-pointer">
              <FaPhoneAlt size={12} /> Call Service Desk
            </a>
            <button 
              onClick={() => openQuoteModal()}
              className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy cursor-pointer"
            >
              Request a Technical Quote
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <FaTimes size={22} />
          </button>

          {/* Prev Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <FaChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <FaChevronRight size={24} />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center p-2">
            <div className="relative overflow-hidden rounded-sm border-2 border-white/20 shadow-2xl">
              <img 
                src={filteredItems[lightboxIndex].image} 
                alt={filteredItems[lightboxIndex].title} 
                className="max-h-[70vh] max-w-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                {filteredItems[lightboxIndex].label}
              </div>
            </div>

            <div className="mt-4 text-white space-y-1 max-w-2xl">
              <h3 className="text-xl font-extrabold">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-xs md:text-sm text-slate-300">{filteredItems[lightboxIndex].description}</p>
              <div className="text-[11px] text-slate-400 pt-1">
                Image {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
