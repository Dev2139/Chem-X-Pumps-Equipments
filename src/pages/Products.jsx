import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaChevronRight, FaTimes, FaFilePdf } from 'react-icons/fa';
import SEO from '../components/SEO';
import productsData from '../data/products.json';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { openQuoteModal } = useQuoteModal();

  const products = productsData.products;

  // Sync category filter from URL search parameters (e.g. /products?category=Centrifugal+Process+Pumps)
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  // Extract all unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="pt-24 bg-white min-h-screen flex flex-col">
      <SEO 
        title="Industrial Pump Catalog" 
        description="Browse our range of heavy-duty industrial process pumps, monoblock chemical pumps, hot oil thermic fluid pumps, and dynamic spare parts."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Industrial Catalog</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Our Products</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            Filter through our range of ISO 2858 process pumps, chemical Transfer systems, and replacement spare parts.
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <FaSearch size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pumps by name, model, specs..."
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-sm bg-white outline-none text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={12} />
                </button>
              )}
            </div>

            {/* Total Results & Clear */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Found {filteredProducts.length} Pumps</span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button 
                  onClick={clearFilters}
                  className="text-brand-orange hover:text-brand-orange/80 flex items-center gap-1 cursor-pointer"
                >
                  <FaTimes size={10} /> Clear Filters
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Categories Tabs & Products Grid */}
      <section className="py-12 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Categories */}
          <div className="space-y-4 lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaFilter size={12} /> Pump Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-bold text-left transition-colors duration-200 cursor-pointer w-full ${
                      selectedCategory === cat
                        ? 'bg-brand-navy text-white'
                        : 'bg-white border border-slate-200 text-brand-navy hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-300 rounded-sm bg-slate-50">
                <p className="text-slate-500 text-sm">No pumps match your active filters or search term.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 btn-secondary text-xs uppercase font-bold py-2 cursor-pointer"
                >
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow rounded-sm overflow-hidden group bg-white"
                  >
                    {/* Image Area */}
                    <div className="relative bg-slate-50 p-4 aspect-4/3 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-brand-navy text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                        {product.model}
                      </div>
                    </div>

                    {/* Details Area */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider block">
                          {product.category}
                        </span>
                        <h3 className="text-sm font-bold text-brand-navy leading-snug group-hover:text-brand-orange transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Technical Ranges snippet */}
                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="text-slate-400 block">Capacity</span>
                          <span className="font-bold text-brand-navy">{product.operatingRange.Capacity || "Custom"}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Head</span>
                          <span className="font-bold text-brand-navy">{product.operatingRange.Head || "Custom"}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 group/btn"
                        >
                          View Details <FaChevronRight size={9} className="transition-transform group-hover/btn:translate-x-0.5" />
                        </Link>
                        <button 
                          onClick={() => openQuoteModal(`${product.name} (${product.model})`)}
                          className="text-xs font-bold text-brand-orange hover:text-brand-orange/80 cursor-pointer"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
