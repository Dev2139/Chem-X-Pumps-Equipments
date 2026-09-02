import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight, FaArrowRight, FaTag, FaImages } from 'react-icons/fa';
import { galleryItems } from '../data/galleryData';

export default function GallerySection({ limit = 6, showHeader = true, title = "Factory & Operations Gallery", subtitle = "Visual insights into our manufacturing plant, mounting procedures, dispatch operations, and team." }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayItems = limit ? galleryItems.slice(0, limit) : galleryItems;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev + 1) % displayItems.length);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeader && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="text-left max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-widest">
                <FaImages size={12} /> Chem-X Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                {title}
              </h2>
              <p className="text-slate-600 text-sm md:text-base">
                {subtitle}
              </p>
            </div>
            
            <Link 
              to="/gallery" 
              className="btn-primary py-2.5 px-5 text-xs uppercase tracking-wider font-bold shrink-0 flex items-center gap-2 cursor-pointer"
            >
              View Full Gallery <FaArrowRight size={12} />
            </Link>
          </div>
        )}

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayItems.map((item, index) => (
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
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Label Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange text-white text-xs font-extrabold uppercase tracking-wider rounded-sm shadow-md">
                    <FaTag size={10} /> {item.label}
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="p-3 bg-white/90 text-brand-navy rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FaExpand size={16} />
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-5 text-left flex-grow flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-base font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 mt-3 flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">
                    {item.category}
                  </span>
                  <button 
                    onClick={() => setLightboxIndex(index)}
                    className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1"
                  >
                    View <FaArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link on mobile */}
        {showHeader && (
          <div className="mt-10 text-center md:hidden">
            <Link 
              to="/gallery" 
              className="btn-primary py-3 px-6 text-sm uppercase tracking-wider font-bold inline-flex items-center gap-2"
            >
              Explore Full Gallery <FaArrowRight size={12} />
            </Link>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && displayItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <FaTimes size={22} />
          </button>

          <button 
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Previous Image"
          >
            <FaChevronLeft size={24} />
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Next Image"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center p-2">
            <div className="relative overflow-hidden rounded-sm border-2 border-white/20 shadow-2xl">
              <img 
                src={displayItems[lightboxIndex].image} 
                alt={displayItems[lightboxIndex].title} 
                className="max-h-[70vh] max-w-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                {displayItems[lightboxIndex].label}
              </div>
            </div>

            <div className="mt-4 text-white space-y-1 max-w-2xl">
              <h3 className="text-xl font-extrabold">{displayItems[lightboxIndex].title}</h3>
              <p className="text-xs md:text-sm text-slate-300">{displayItems[lightboxIndex].description}</p>
              <div className="text-[11px] text-slate-400 pt-1">
                Photo {lightboxIndex + 1} of {displayItems.length}
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
