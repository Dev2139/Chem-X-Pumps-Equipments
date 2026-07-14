import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaFilePdf, FaCheck, FaPhoneAlt, FaChevronRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO';
import productsData from '../data/products.json';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { openQuoteModal } = useQuoteModal();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const products = productsData.products;

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
      setFormSubmitted(false);
      reset(); // Reset form when product changes
    } else {
      // Redirect to catalog if not found
      navigate('/products');
    }
  }, [productId, products, navigate, reset]);

  if (!product) return null;

  // Extract related products in same category
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const onInquirySubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Product Specific Inquiry Submitted:', { productModel: product.model, ...data });
    setFormSubmitted(true);
  };

  return (
    <div className="pt-24 bg-white text-left">
      <SEO 
        title={`${product.name} (${product.model})`} 
        description={product.shortDescription}
      />

      {/* Back to Products link */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="text-xs font-bold text-brand-navy hover:text-brand-orange inline-flex items-center gap-1.5">
            <FaArrowLeft size={10} /> Back to Products Catalog
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Image switcher */}
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm flex items-center justify-center overflow-hidden h-[450px] md:h-[600px] lg:h-[750px]">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="object-contain max-h-full max-w-full hover:scale-102 transition-transform duration-300"
              />
            </div>
            
            {/* Gallery thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 bg-slate-50 border p-2 rounded-sm overflow-hidden flex items-center justify-center ${
                      activeImage === img ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="object-contain max-h-full max-w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Short Description, Operating Ranges */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                {product.name}
              </h1>
              <span className="inline-block bg-slate-100 border border-slate-200 text-brand-navy font-bold text-xs px-3 py-1 mt-2 uppercase tracking-wide rounded-sm">
                Model: {product.model}
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Operating Range specs */}
            <div className="border border-slate-200 rounded-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Operating Ranges</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-slate-100">
                {Object.entries(product.operatingRange).map(([key, value]) => (
                  <div key={key} className="p-4 flex flex-col justify-between min-w-0">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      {key}
                    </span>
                    <span className="text-xs md:text-sm font-bold text-brand-navy break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Catalogue download */}
            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={() => openQuoteModal(`${product.name} (${product.model})`)}
                className="btn-primary py-2.5 px-6 uppercase text-xs font-bold tracking-wider cursor-pointer"
              >
                Inquire Specifications
              </button>
              <a 
                href={product.brochurePdf}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-red-600 hover:bg-red-50 text-red-600 hover:text-red-700 font-bold py-2 px-5 text-xs rounded-sm inline-flex items-center gap-2 transition-all duration-200"
              >
                <FaFilePdf size={14} /> Download Catalogue PDF
              </a>
            </div>

          </div>

        </div>

        {/* Tab specifications detailed list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 pt-16 border-t border-slate-200">
          
          {/* Features and MOC */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-navy border-b-2 border-slate-200 pb-2 uppercase tracking-wide">
                Key Performance Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm leading-relaxed text-slate-600">
                    <FaCheck className="text-brand-blue mt-1 shrink-0" size={12} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MOC (Material of Construction) */}
            {product.materials && product.materials.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-navy border-b-2 border-slate-200 pb-2 uppercase tracking-wide">
                  Material of Construction (MOC)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((moc, idx) => (
                    <span 
                      key={idx} 
                      className="bg-slate-50 border border-slate-200 text-brand-navy font-bold text-xs px-3 py-1.5 rounded-sm"
                    >
                      {moc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-navy border-b-2 border-slate-200 pb-2 uppercase tracking-wide">
                Target Process Applications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-600">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-brand-orange shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-sm sticky top-28">
              <h3 className="text-lg font-bold text-brand-navy border-b border-slate-200 pb-2 uppercase tracking-wider">
                Direct Model Inquiry
              </h3>
              <p className="text-[10px] text-slate-400 mt-1 mb-6">Ask pricing & shipping details for model {product.model}</p>
              
              {formSubmitted ? (
                <div className="text-center py-6">
                  <FaCheckCircle className="text-emerald-500 mx-auto mb-3" size={45} />
                  <h4 className="text-base font-bold text-brand-navy">Specification Inquiry Sent</h4>
                  <p className="text-[11px] text-slate-500 mt-2">Our fluid engineering experts will review your request and contact you.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 btn-secondary text-xs uppercase font-bold py-1.5 px-4"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onInquirySubmit)} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Company Contact Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-sm outline-none text-xs focus:border-brand-blue"
                      {...register('name', { required: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-sm outline-none text-xs focus:border-brand-blue"
                      {...register('email', { required: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-sm outline-none text-xs focus:border-brand-blue"
                      {...register('phone', { required: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Flow (m³/h) / Head (m) / Chemical Fluid Name</label>
                    <textarea 
                      rows={3} 
                      placeholder="e.g. Acid fluid transfer at 50 m3/h flow and 30m head requirement..."
                      className="w-full px-3 py-1.5 border border-slate-300 bg-white rounded-sm outline-none text-xs focus:border-brand-blue"
                      {...register('specification', { required: true })}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary uppercase font-bold py-2.5 text-xs tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting Specification...' : 'Get Custom proposal'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Related Products list */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-xl font-bold text-brand-navy mb-8 uppercase tracking-wider">
              Related Equipment (Same Category)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="border border-slate-200 bg-white flex flex-col justify-between hover:shadow-md transition-shadow rounded-sm overflow-hidden group">
                  <div className="bg-slate-50 p-4 aspect-4/3 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                    <img src={p.images[0]} alt={p.name} className="object-contain max-h-32 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider block">{p.model}</span>
                    <h4 className="text-sm font-bold text-brand-navy leading-snug group-hover:text-brand-orange transition-colors mt-0.5">{p.name}</h4>
                    <Link to={`/product/${p.id}`} className="text-xs font-bold text-brand-blue hover:text-brand-orange inline-flex items-center gap-1 mt-4">
                      View details <FaChevronRight size={8} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
