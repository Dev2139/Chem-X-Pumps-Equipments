import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function WhyUs() {
  const { openQuoteModal } = useQuoteModal();

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

  return (
    <>
      <Helmet>
        <title>Why Choose Us | Chem-X Pumps & Equipment</title>
        <meta name="description" content="Learn why Chem-X is the trusted choice for premium industrial pumps, offering reliable performance, quick delivery, and dedicated engineering support." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-brand-navy pt-32 pb-20 md:pt-40 md:pb-28 text-center relative overflow-hidden border-b-4 border-brand-orange">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-brand-orange font-bold tracking-widest text-sm uppercase bg-brand-orange/10 px-3 py-1 inline-block">
            Our Advantage
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Why Choose Chem-X
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We understand that pump downtime equals lost production. Here is how Chem-X guarantees efficiency and durability for your toughest fluid handling challenges.
          </p>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Core Strengths</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">
              Engineered for Absolute Reliability
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Decades of expertise translated into robust pumping solutions that simply work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 rounded-sm text-left flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-1 bg-brand-orange mb-6 group-hover:w-16 transition-all duration-300" />
                  <h3 className="text-xl font-bold text-brand-navy mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 md:py-24 text-center border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Ready to Upgrade Your Pumping Systems?
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-8">
            Let our experienced application engineers help you select the most efficient and reliable pump for your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+919879884153" className="btn-primary flex items-center justify-center gap-2 font-bold cursor-pointer">
              <FaPhoneAlt size={12} /> Call Us Now
            </a>
            <button 
              onClick={() => openQuoteModal()}
              className="btn-outline border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white cursor-pointer"
            >
              Request a Technical Quote
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
