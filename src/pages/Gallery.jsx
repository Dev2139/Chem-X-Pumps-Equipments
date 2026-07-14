import React, { useState } from 'react';
import { FaEye, FaImages } from 'react-icons/fa';
import SEO from '../components/SEO';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Workshop', 'Pump Units', 'Spare Parts', 'Foundry'];

  const galleryItems = [
    { title: "Induction Melting Foundry", category: "Foundry", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" },
    { title: "Casing Casting Preparation", category: "Foundry", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" },
    
    { title: "CNC Impeller Profile Machining", category: "Workshop", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
    { title: "Dynamic Rotor Assembly balancing", category: "Workshop", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" },
    
    { title: "Finished CCPP Centrifugal Pump Unit", category: "Pump Units", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&w=800&q=80" },
    { title: "Solid PP Monoblock CMPP Assembly", category: "Pump Units", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80" },
    
    { title: "High Consistency SS316 Impellers", category: "Spare Parts", image: "https://images.unsplash.com/photo-1530124560072-aae8d56b0adec?auto=format&fit=crop&w=800&q=80" },
    { title: "Precision Ground Shaft Sleeves", category: "Spare Parts", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80" },
    { title: "Cartridge Mechanical Seal Stock", category: "Spare Parts", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" }
  ];

  const filteredItems = activeTab === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div className="pt-24 bg-white text-left">
      <SEO 
        title="Industrial Plant Gallery" 
        description="View photos of our manufacturing workshop, pump units, foundry operations, and precision spare parts inventory at Chem-X."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Media Center</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Product & Workshop Gallery</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            A visual showcase of our ISO certified production shop, castings foundry, test bed loops, and finished equipment.
          </p>
        </div>
      </section>

      {/* Gallery Filters */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer border ${
                activeTab === tab
                  ? 'bg-brand-navy border-brand-navy text-white'
                  : 'bg-white border-slate-300 text-brand-navy hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry-like Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="border border-slate-200 p-2 rounded-sm bg-white hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              
              {/* Image box */}
              <div className="aspect-4/3 overflow-hidden relative bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category tag */}
                <div className="absolute top-2 left-2 bg-brand-navy/90 text-white text-[9px] font-bold py-0.5 px-2 uppercase tracking-wider rounded-xs">
                  {item.category}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white text-brand-navy rounded-full shadow-lg">
                    <FaEye size={16} />
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="p-3 text-left">
                <h4 className="text-sm font-bold text-brand-navy">{item.title}</h4>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
