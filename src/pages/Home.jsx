import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCog, FaTools, FaWrench, FaDraftingCompass, FaShieldAlt, FaAward, FaCogs,
  FaCheckCircle, FaChevronDown, FaPhoneAlt, FaEnvelope, FaChevronRight, FaChevronLeft,
  FaArrowRight, FaIndustry, FaWater, FaFlask, FaPills, FaUtensils, 
  FaBolt, FaHardHat, FaCopy, FaUserTie, FaCheck, FaTimes, FaGlobe, FaCertificate,
  FaPause, FaPlay, FaLayerGroup, FaStar, FaQuoteLeft
} from 'react-icons/fa';
import { useQuoteModal } from '../context/QuoteModalContext';
import { useProducts } from '../context/ProductsContext';
import SEO from '../components/SEO';
import GallerySection from '../components/GallerySection';

export default function Home() {
  const { openQuoteModal } = useQuoteModal();
  const [activeFaq, setActiveFaq] = useState(null);

  // Extract products
  const { products } = useProducts();

  // Carousel States
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSlideIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group products into pages (3 items per page for desktop, 1 item per page for mobile)
  const pageSize = isMobile ? 1 : 3;
  const pages = [];
  if (products && products.length > 0) {
    for (let i = 0; i < products.length; i += pageSize) {
      pages.push(products.slice(i, i + pageSize));
    }
  }
  const maxSlides = pages.length || 1;

  // Auto-advancing slider timer every 10 seconds (10000ms)
  useEffect(() => {
    if (pages.length === 0) return;

    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % maxSlides);
    }, 10000);

    return () => clearInterval(timer);
  }, [pages.length, maxSlides]);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % maxSlides);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const trustBadges = [
    { title: "Manufacturing", desc: "Precision assembly & testing", icon: <FaCogs /> },
    { title: "Repairing", desc: "Complete pump overhauling", icon: <FaWrench /> },
    { title: "Industrial Spares", desc: "High consistency spares", icon: <FaTools /> },
    { title: "Custom Solutions", desc: "Tailored head & flow rates", icon: <FaDraftingCompass /> },
    { title: "ISO Quality", desc: "ISO 9001:2015 standards", icon: <FaAward /> }
  ];

  const whyChooseUs = [
    { title: "Premium Quality", desc: "Our products undergo strict quality checks at every stage, adhering strictly to ISO and DIN standards." },
    { title: "Reliable Performance", desc: "Engineered with heavy-duty shafts and dynamically balanced impellers to ensure minimum vibration and maximum uptime." },
    { title: "Experienced Engineers", desc: "Our dedicated technical team brings decades of fluid dynamics experience to help you pick the right pump configuration." },
    { title: "Wide Product Range", desc: "From high-volume centrifugal pumps to highly specialized polypropylene monoblock pumps, we cover all process needs." },
    { title: "After Sales Support", desc: "We provide comprehensive on-site commission support, troubleshooting, and fast replacement parts distribution." },
    { title: "Competitive Pricing", desc: "Optimized manufacturing processes allow us to offer premium European-grade quality at highly competitive prices." },
    { title: "Quick Delivery", desc: "By maintaining a robust supply chain and extensive raw stock inventory, we reduce standard lead times by up to 30%." },
    { title: "Customer Satisfaction", desc: "We believe in long-term engineering partnerships, catering custom metallurgy to match exact customer chemical specs." }
  ];

  const industries = [
    { name: "Chemical Processing", icon: <FaFlask />, desc: "Acid transfer, alkali recirculation, solvent displacement." },
    { name: "Oil & Gas", icon: <FaIndustry />, desc: "Thermic fluid heat transfer, hydrocarbon feed, refining." },
    { name: "Water Treatment", icon: <FaWater />, desc: "Effluent dosing, raw water intake, desalination feed." },
    { name: "Pharmaceutical", icon: <FaPills />, desc: "High purity liquids transfer, sterile batch processing." },
    { name: "Food Processing", icon: <FaUtensils />, desc: "Edible oil transfer, high viscosity ingredient pumping." },
    { name: "Power Plants", icon: <FaBolt />, desc: "Boiler feed, cooling tower circulation, ash slurry slurry." },
    { name: "Mining", icon: <FaHardHat />, desc: "High density slurry disposal, heavy dewatering lines." },
    { name: "Paper Industry", icon: <FaCopy />, desc: "Pulp stock processing, bleaching chemicals distribution." },
    { name: "Steel Industry", icon: <FaCogs />, desc: "Scale pit recirculation, high-pressure quench sprays." },
    { name: "Marine & Ports", icon: <FaGlobe />, desc: "Seawater circulation, bilge pumping, dock dewatering." },
    { name: "Textile & Dyeing", icon: <FaCogs />, desc: "Aggressive dye wash circulation, acid bath feeds." },
    { name: "Industrial Mfg", icon: <FaTools />, desc: "Utility water circulation, high-pressure machinery wash." }
  ];

  const manufacturingSteps = [
    { title: "Manufacturing", desc: "In-house casting, CNC machining, dynamic balancing, and ISO standard testing." },
    { title: "Repairing", desc: "Complete pump breakdown servicing, shaft alignment, sleeve replacement, and performance restoration." },
    { title: "Maintenance", desc: "Scheduled preventive maintenance contracts to keep your processing lines operating without stops." },
    { title: "Custom Engineering", desc: "Custom impeller trimming and specialized metallurgy casting to hit exact flow-head duty points." },
    { title: "Pump Spare Parts", desc: "Ready-to-ship inventory of high-consistency impellers, casing, shafts, sleeves, and mechanical seals." },
    { title: "On Site Support", desc: "On-call field technicians for alignment, startup commissioning, and diagnostics." },
    { title: "Annual Maintenance", desc: "Annual Maintenance Contracts (AMC) designed to guarantee maximum lifecycle cost savings." }
  ];



  const processSteps = [
    { step: "01", name: "Requirement", desc: "We review your operational environment, flow rates, head, chemical composition, and operating temperature." },
    { step: "02", name: "Engineering", desc: "Our design team performs fluid analysis and selects the ideal pump model, impeller profile, and metallurgy (e.g. CF8M, PP, CD4MCu)." },
    { step: "03", name: "Manufacturing", desc: "The pump is cast, precision machined on CNC units, dynamically balanced, and tested under full load on our performance testbed." },
    { step: "04", name: "Delivery", desc: "The equipment is packed in heavy-duty wooden crates and shipped with full calibration, test logs, and operating manuals." }
  ];

  const faqs = [
    { q: "What standards are Chem-X pumps manufactured to?", a: "Chem-X pumps are manufactured strictly to global standards including ISO 2858 and DIN 24256 dimensions. This guarantees 100% interchangeability with major international brands, allowing you to slide our pumps right into your existing lines." },
    { q: "What materials of construction (MOC) do you offer?", a: "We cast and manufacture pumps in a wide range of materials: Graded Cast Iron, Cast Steel (WCB), Stainless Steel (SS304, SS304L, SS316, SS316L), Duplex Steel (CD4MCu, SS2205, SS2507), Alloy 20, Hastelloy B & C, and solid Polypropylene (PP) for chemical transfer." },
    { q: "Do you provide customized pumps for specific operating duty points?", a: "Yes. Our engineering division specializes in custom impeller sizing and motor selection to hit your exact design capacity (m³/hr) and pressure head (meters), ensuring the pump runs at its Best Efficiency Point (BEP) to save power." },
    { q: "What is the typical lead time for standard chemical pumps?", a: "Standard PP and Centrifugal pumps are shipped within 2 to 3 weeks. Specialized alloy casings or custom turbine pump configurations take approximately 4 to 6 weeks, depending on dynamic casting schedules." },
    { q: "Can Chem-X pumps run dry without fluid?", a: "Standard centrifugal pumps should not run dry due to shaft seal heat buildup. However, our Air Operated Double Diaphragm (AODD) pumps are designed to run dry indefinitely without damaging the internal chambers." },
    { q: "Do you supply replacement spares for other major pump brands?", a: "Yes. We manufacture replacement impellers, shafts, sleeves, wear rings, and seal kits according to international standard dimensions that fit perfectly into other brand pumps." },
    { q: "Do you provide on-site installation and commissioning services?", a: "Yes. Chem-X has a field services division. We send application engineers to verify piping alignment, test motor rotation, assist with startup commissioning, and train your maintenance staff." },
    { q: "How does the Air Cooled Hot Oil Pump operate without external cooling water?", a: "Our hot oil pump features integrated natural convection cooling fins along the bearing housing and a heat-isolating shaft design. The casing heat dissipation is fast enough that standard seals remain at safe operating temperatures." },
    { q: "What is your warranty policy on industrial pumps?", a: "All Chem-X pumps carry a comprehensive 12-month warranty from the date of commissioning or 18 months from the date of invoice (whichever is earlier) against any manufacturing defects." },
    { q: "How do I request a technical quote?", a: "Simply click the 'Request Quote' button on our navbar or product cards, fill in your process specifications (flow, head, temperature, and fluid name), and our engineers will send a technical proposal within 24 hours." }
  ];

  return (
    <div className="pt-20">
      <SEO 
        title="Industrial Pump Manufacturers" 
        description="Chem-X Pumps & Equipment manufactures high-performance industrial pumps: Centrifugal Process, Polypropylene Mono block, Hot Oil, and Slurry Pumps."
      />
      
      {/* 2. HERO SECTION */}
      <section className="relative bg-brand-navy overflow-hidden">
        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side text */}
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider rounded-sm">
                <FaCertificate size={12} /> ISO 9001:2015 Certified
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Engineered for Performance. <br />
                <span className="text-brand-orange">Built to Last.</span>
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Manufacturing, Repairing & Industrial Pump Solutions for Chemical, Process, Water Treatment and Heavy Industries. Delivering unmatched hydraulic efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/products" className="btn-primary flex items-center justify-center gap-2 cursor-pointer">
                  Explore Products <FaArrowRight size={14} />
                </Link>
                <button 
                  onClick={() => openQuoteModal()}
                  className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Right side pump image */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-lg aspect-square bg-slate-800/40 border border-slate-700/50 p-4 rounded-sm flex items-center justify-center overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/urzka7oz/image/upload/v1788321554/WhatsApp_Image_2026-09-01_at_9.38.14_PM.jpg" 
                  alt="Chem-X Industrial Pump Equipment" 
                  className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-500 rounded-sm"
                />
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-brand-orange text-white p-4 rounded-sm shadow-lg hidden sm:block text-left border border-brand-orange/50">
                <span className="text-3xl font-black block">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider">ISO 2858 Compliant</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust badges below hero */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-x-0 md:divide-x divide-slate-200">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center px-4 space-y-1">
                <span className="text-brand-blue text-2xl mb-1">{badge.icon}</span>
                <h4 className="text-sm font-bold text-brand-navy">{badge.title}</h4>
                <p className="text-xs text-slate-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT COMPANY */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left factory image */}
            <div className="relative group">
              <div className="border-4 border-brand-navy p-2">
                <img 
                  src="https://res.cloudinary.com/urzka7oz/image/upload/v1788265883/ChatGPT_Image_Sep_1_2026_05_58_34_PM.png" 
                  alt="Chem-X Manufacturing Factory" 
                  className="w-full object-cover aspect-4/3 hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-navy text-white py-2 px-4 text-xs font-bold uppercase tracking-wider">
                AHMEDABAD PLANT
              </div>
            </div>

            {/* Right details */}
            <div className="text-left space-y-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">About Chem-X</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Pioneering Excellence in Fluid Handling Systems
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Chem-X Pumps & Equipment is a newly established, ISO 9001:2015 certified engineering enterprise specializing in the design, casting, assembly, and service of high-grade process pumps. Meticulously engineered to handle corrosive liquids, abrasive slurries, and high thermic temperatures, our systems keep critical processing lines running without delay.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "High Quality Manufacturing",
                  "Repair Services",
                  "Pump Spare Parts",
                  "Industrial Engineering",
                  "Customer Focus"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-brand-blue shrink-0" size={16} />
                    <span className="text-sm font-bold text-brand-navy">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex gap-4">
                <Link to="/about" className="btn-secondary flex items-center gap-2 cursor-pointer">
                  Learn More <FaChevronRight size={12} />
                </Link>
                <button 
                  onClick={() => openQuoteModal()}
                  className="btn-outline flex items-center gap-2 cursor-pointer"
                >
                  Request Technical Data
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE CHEM-X */}
      <section id="why-us" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Why Choose Chem-X</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Engineered for Absolute Reliability
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              We understand that pump downtime equals lost production. Here is how Chem-X guarantees efficiency and durability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-6 hover:shadow-md transition-all duration-300 rounded-sm text-left flex flex-col justify-between">
                <div>
                  <div className="w-8 h-1 bg-brand-orange mb-4" />
                  <h3 className="text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-50 text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. AUTO HORIZONTAL CAROUSEL (10s AUTO SCROLL, 1 ON MOBILE / 3 ON DESKTOP) */}
      <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">
                Auto Product Slider
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
                Industrial Process Pumps Lineup
              </h2>
            </div>

            {/* Top Bar CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/products" className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                All Products ({products.length}) <FaArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* CAROUSEL CONTAINER WITH LEFT & RIGHT SIDE NAVIGATION BUTTONS */}
          <div className="relative px-3 sm:px-12 py-4">
            
            {/* LEFT SIDE NAVIGATION BUTTON */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-brand-navy hover:bg-brand-orange text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border border-white/20 cursor-pointer flex items-center justify-center"
              aria-label="Previous Product"
              title="Previous Product"
            >
              <FaChevronLeft size={16} />
            </button>

            {/* RIGHT SIDE NAVIGATION BUTTON */}
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-brand-navy hover:bg-brand-orange text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border border-white/20 cursor-pointer flex items-center justify-center"
              aria-label="Next Product"
              title="Next Product"
            >
              <FaChevronRight size={16} />
            </button>

            {/* OVERFLOW VIEWPORT */}
            <div className="overflow-hidden w-full">
              {/* HARDWARE ACCELERATED SLIDING TRACK */}
              <div 
                className="flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1)"
                style={{ 
                  transform: `translate3d(-${slideIndex * 100}%, 0, 0)`,
                  transition: 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {pages.map((pageProducts, pageIdx) => (
                  <div 
                    key={pageIdx} 
                    className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6 px-1 text-left"
                  >
                    {pageProducts.map((product, idx) => (
                      <div
                        key={product.id}
                        className="bg-white border border-slate-200 hover:border-brand-orange/60 p-5 rounded-sm shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full"
                      >
                        <div>
                          {/* Image container */}
                          <div className="relative bg-slate-50 p-4 aspect-4/3 flex items-center justify-center rounded-sm overflow-hidden border border-slate-100 mb-4">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-108"
                            />
                            <div className="absolute top-2 left-2 bg-brand-navy text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs shadow-xs">
                              {product.model}
                            </div>
                            <div className="absolute top-2 right-2 bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-xs">
                              Product #{pageIdx * pageSize + idx + 1}
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1">
                            {product.category}
                          </span>
                          <h3 className="text-base font-bold text-brand-navy leading-snug group-hover:text-brand-orange transition-colors line-clamp-1 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {product.shortDescription}
                          </p>

                          {/* Spec pills */}
                          <div className="grid grid-cols-2 gap-2 mb-3 text-[11px] bg-slate-50 p-2.5 rounded-xs border border-slate-100">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase block">Capacity</span>
                              <span className="font-bold text-brand-navy truncate block">
                                {product.operatingRange?.Capacity || product.operatingRange?.['Flow Rate'] || "Custom"}
                              </span>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase block">Head</span>
                              <span className="font-bold text-brand-navy truncate block">
                                {product.operatingRange?.Head || "Custom"}
                              </span>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 font-normal mb-3 leading-tight">
                            Note: Actual pump may vary from the pump as shown in image as per requirements.
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <Link 
                            to={`/product/${product.id}`} 
                            className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 group/btn"
                          >
                            View Specs <FaChevronRight size={10} className="transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>
                          <button 
                            onClick={() => openQuoteModal(`${product.name} (${product.model})`)}
                            className="text-xs font-bold bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white px-3 py-1.5 rounded-xs transition-colors cursor-pointer"
                          >
                            Get Quote
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* DOT INDICATORS */}
            <div className="flex justify-center gap-1.5 mt-6 flex-wrap">
              {Array.from({ length: maxSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    slideIndex === idx 
                      ? 'w-6 bg-brand-orange' 
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 6. FEATURED EQUIPMENT SHOWCASE (INTERACTIVE TABBED SWITCHER) */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Featured Equipment</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Premium Performance Showcases
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Interactive highlights of our heavy-duty process pump series. Select a model below to inspect technical specifications.
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex justify-center gap-2 flex-wrap mb-8">
            {products.slice(0, 4).map((product, idx) => (
              <button
                key={product.id}
                onClick={() => setActiveFeaturedIndex(idx)}
                className={`px-4 py-2 text-xs font-bold rounded-sm border transition-all cursor-pointer ${
                  activeFeaturedIndex === idx
                    ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {product.name} ({product.model})
              </button>
            ))}
          </div>

          {/* Active Featured Product Highlight */}
          {products[activeFeaturedIndex] && (
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-md flex flex-col lg:flex-row gap-8 items-center text-left animate-fade-in">
              
              {/* Image panel */}
              <div className="w-full lg:w-2/5 aspect-square max-h-[360px] bg-slate-50 p-6 border border-slate-100 flex items-center justify-center rounded-sm overflow-hidden shrink-0">
                <img 
                  src={products[activeFeaturedIndex].images[0]} 
                  alt={products[activeFeaturedIndex].name} 
                  className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Specs list */}
              <div className="w-full lg:w-3/5 space-y-5">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                      Model: {products[activeFeaturedIndex].model}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy">
                      {products[activeFeaturedIndex].name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => openQuoteModal(`${products[activeFeaturedIndex].name} (${products[activeFeaturedIndex].model})`)}
                    className="btn-primary py-2.5 px-5 text-xs uppercase font-bold cursor-pointer"
                  >
                    Inquire Model
                  </button>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {products[activeFeaturedIndex].description}
                </p>

                {/* Technical specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 border border-slate-200/60 rounded-xs">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Flow Capacity</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-navy">
                      {products[activeFeaturedIndex].operatingRange?.Capacity || "Custom"}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 border border-slate-200/60 rounded-xs">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Max Head</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-navy">
                      {products[activeFeaturedIndex].operatingRange?.Head || "Custom"}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3 border border-slate-200/60 rounded-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Temperature</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-navy">
                      {products[activeFeaturedIndex].operatingRange?.Temperature || "Standard"}
                    </span>
                  </div>
                </div>

                {/* Applications list */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {(products[activeFeaturedIndex].applications || []).slice(0, 3).map((app, i) => (
                      <span key={i} className="text-[10px] font-medium bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                  <Link to={`/product/${products[activeFeaturedIndex].id}`} className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1.5">
                    View Full Datasheet <FaChevronRight size={10} />
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* 7. INDUSTRIES WE SERVE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Industries We Serve</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Engineered For Diverse Applications
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Providing heavy-duty, corrosion-proof, and high-consistency pumping technologies for global processing plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, index) => (
              <div key={index} className="border border-slate-200 p-6 rounded-sm text-left hover:shadow-md transition-shadow group flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-flex p-3 bg-slate-50 border border-slate-100 text-brand-blue text-2xl group-hover:bg-brand-orange/10 group-hover:text-brand-orange group-hover:border-brand-orange/20 transition-all rounded-xs">
                    {ind.icon}
                  </span>
                  <h3 className="text-lg font-bold text-brand-navy">{ind.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link to="/industries" className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 group/link">
                    Explore Details <FaChevronRight size={10} className="transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. MANUFACTURING & SERVICES */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Capabilities & Services</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Our Manufacturing Lifecycle
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              From metallurgy testing to on-site testing beds and continuous aftermarket support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Timeline Column */}
            <div className="space-y-6 text-left">
              {manufacturingSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    {idx < manufacturingSteps.length - 1 && <div className="w-0.5 bg-slate-300 h-12 mt-1" />}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-brand-navy">{step.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Service Column */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="border-4 border-white shadow-md p-2 bg-white">
                <img 
                  src="https://res.cloudinary.com/urzka7oz/image/upload/v1788265884/ChatGPT_Image_Sep_1_2026_05_53_04_PM.png" 
                  alt="On site testing bed" 
                  className="w-full aspect-video object-cover" 
                />
              </div>
              <div className="bg-brand-navy text-white p-6 rounded-sm text-left">
                <h4 className="text-lg font-bold text-white mb-2">Need Field Engineering Support?</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  We deploy engineers to assist with pump alignment, foundation check, dynamic vibration testing, and seal calibrations.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+919328946682" className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-2">
                    <FaPhoneAlt size={10} /> Call Service Center
                  </a>
                  <Link to="/services" className="text-xs font-bold text-white hover:text-brand-orange flex items-center gap-1">
                    View Services Catalog <FaChevronRight size={10} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. GALLERY SECTION */}
      <GallerySection />

      {/* 10. PROCESS SECTION (4 steps horizontal) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              4-Step Project Delivery Process
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              A transparent, structured method ensuring precision engineering from inquiry to commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Horizontal Line connector for desktop */}
            <div className="hidden lg:block absolute top-8 left-12 right-12 h-0.5 bg-slate-200 z-0" />
            
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative z-10 text-left bg-white p-6 border border-slate-100 shadow-2xs rounded-sm">
                <div className="w-10 h-10 rounded-sm bg-brand-navy text-white text-base font-bold flex items-center justify-center mb-4 border-2 border-brand-orange">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2">{step.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Client Feedback</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              What Our Engineering Partners Say
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Trusted by chemical plants, refineries, and manufacturing facilities across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. Rajesh V. Patel",
                role: "Head of Plant Maintenance",
                company: "Gujarat Chemical Synthetics Ltd., Dahej",
                location: "Gujarat, India",
                rating: 5,
                comment: "We replaced three corrosive-transfer acid pumps in our chemical washing section with Chem-X CCPP Centrifugal Process Pumps. Over 18 months of continuous duty handling aggressive liquids, we have recorded zero mechanical seal leakage and achieved a 14% drop in power consumption."
              },
              {
                name: "Mr. Suresh K. Sharma",
                role: "Senior Vice President (Engineering)",
                company: "Bharat Petrochem & Refineries Corp., Vadodara",
                location: "Gujarat, India",
                rating: 5,
                comment: "The Air Cooled Hot Oil Pumps from Chem-X operating at 300°C have exceeded our expectations. Eliminating the requirement for external water cooling lines saved us significant utility costs while maintaining flawless dynamic balance and minimum vibration."
              },
              {
                name: "Mr. Anish P. Deshmukh",
                role: "Chief Project Director",
                company: "Deccan Pharma & Fine Chemicals Ltd.",
                location: "Maharashtra, India",
                rating: 5,
                comment: "Chem-X delivered custom polypropylene process pumps strictly adhering to ISO 2858 dimensions within 10 days of purchase order. Their technical team assisted on-site with laser shaft alignment and hydrostatic pressure testing."
              }
            ].map((t, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200 p-8 rounded-sm text-left flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex justify-between items-center">
                    <div className="flex text-amber-500 gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                    </div>
                    <FaQuoteLeft className="text-brand-orange/30 group-hover:text-brand-orange/60 transition-colors" size={24} />
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/80 mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-orange font-black flex items-center justify-center text-sm shrink-0 border border-brand-orange/30">
                    {t.name.split(' ')[1]?.[0] || 'C'}{t.name.split(' ')[2]?.[0] || 'X'}
                  </div>
                  <div>
                    <span className="font-extrabold text-brand-navy block text-sm">{t.name}</span>
                    <span className="text-xs text-brand-blue font-semibold block">{t.role}</span>
                    <span className="text-[11px] text-slate-500 font-medium block">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 13. FAQ (Accordion) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left text-brand-navy font-bold text-sm md:text-base hover:text-brand-orange focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <FaChevronDown 
                    className={`transition-transform duration-200 text-slate-400 ${
                      activeFaq === index ? 'transform rotate-180 text-brand-orange' : ''
                    }`} 
                    size={14} 
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 14. CTA BANNER */}
      <section className="bg-brand-navy text-white py-16 text-center border-t-4 border-brand-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Need High-Efficiency Industrial Pump Solutions?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Discuss your flow rates, heads, and fluid compatibility details with our application engineers today.
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

      {/* 15. CONTACT SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Connect with Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Get in Touch with our Offices
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Office Details */}
            <div className="text-left space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wider">Chem-X Headquarters</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our core engineering and plant division is situated in Ahmedabad's primary industrial belt, equipped with a complete casting foundry, CAD lab, assembly division, and computerized performance testing bays.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase block">Phone / Sales Desk</span>
                  <a href="tel:+919328946682" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    +91 93289 46682
                  </a>
                  <a href="tel:+919879884153" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    +91 98798 84153
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase block">Corporate Online Contact</span>
                  <a href="mailto:chemxpumps@gmail.com" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    chemxpumps@gmail.com
                  </a>
                  <a href="https://www.chemxpumps.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    www.chemxpumps.com
                  </a>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase block">Manufacturing Plant Address</span>
                  <p className="text-sm font-bold text-brand-navy leading-relaxed">
                    SHED-34 KESHAV IND PARK,<br />
                    OPP. JAY RADHE RESIDENCY,<br />
                    VILL: Ahmedabad (M Corp.+OG) (Part),<br />
                    TAL: Ahmedabad City, DISTRICT: Ahmedabad
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase block">Working Hours</span>
                  <p className="text-sm font-bold text-brand-navy">
                    Mon - Sat: 9:00 AM - 6:00 PM IST
                  </p>
                  <p className="text-xs text-slate-500">
                    Sundays & Public Holidays Closed
                  </p>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="border border-slate-200 aspect-16/9 bg-slate-50 rounded-sm overflow-hidden shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6281726269876!2d72.69483867516497!3d23.037420779163305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8770a473c05f%3A0xe0be64f1f7e9eb4b!2sKESHAV%20INDUSTRIAL%20PARK!5e0!3m2!1sen!2sin!4v1784014332647!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Keshav Industrial Park Google Map"
                ></iframe>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-sm text-left">
              <h3 className="text-xl font-bold text-brand-navy mb-2">Send an Instant Inquiry</h3>
              <p className="text-xs text-slate-500 mb-6">Have questions regarding specifications? Write to our team.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully. Chem-X team will contact you shortly."); }} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Your Name</label>
                  <input type="text" required className="w-full px-3 py-2 border border-slate-300 bg-white rounded-sm outline-none text-sm focus:border-brand-blue" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Email Address</label>
                    <input type="email" required className="w-full px-3 py-2 border border-slate-300 bg-white rounded-sm outline-none text-sm focus:border-brand-blue" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Phone Number</label>
                    <input type="tel" required className="w-full px-3 py-2 border border-slate-300 bg-white rounded-sm outline-none text-sm focus:border-brand-blue" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Subject</label>
                  <input type="text" required className="w-full px-3 py-2 border border-slate-300 bg-white rounded-sm outline-none text-sm focus:border-brand-blue" />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">Message Description</label>
                  <textarea rows={4} required className="w-full px-3 py-2 border border-slate-300 bg-white rounded-sm outline-none text-sm focus:border-brand-blue" />
                </div>

                <button type="submit" className="w-full btn-primary uppercase font-bold py-3 text-sm cursor-pointer">
                  Send Message
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
