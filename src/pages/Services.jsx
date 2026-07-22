import React from 'react';
import { FaWrench, FaTools, FaCogs, FaDraftingCompass, FaHardHat, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function Services() {
  const { openQuoteModal } = useQuoteModal();

  const services = [
    {
      title: "Custom Engineering & Design",
      icon: <FaDraftingCompass />,
      desc: "Our design team uses advanced CAD fluid simulations to customize pump impeller diameters and diffuser channels to hit your exact operating points (Capacity vs. Head), saving energy and avoiding cavitation.",
      highlights: ["Impeller trimming", "Custom speed selections", "Custom base plate sizing", "Metallurgical selections"]
    },
    {
      title: "Complete Pump Repair & Overhaul",
      icon: <FaWrench />,
      desc: "We repair and restore worn industrial pumps of all international brands. Our team performs dynamic balancing of rotors, replaces worn shafts, sleeves, and bearing blocks, and tests performance back to original spec.",
      highlights: ["Shaft sleeve replacements", "Bearing block overhauls", "Precision dynamic balancing", "Test-bed load evaluations"]
    },
    {
      title: "Annual Maintenance Contracts (AMC)",
      icon: <FaCogs />,
      desc: "Prevent unscheduled plant shutdowns with our custom AMC packages. Our field service technicians perform regular vibration inspections, bearing temperature checks, and mechanical seal diagnostics on your production floor.",
      highlights: ["Vibration signature analyses", "Scheduled seal replacements", "Laser alignment reviews", "24/7 breakdown call-outs"]
    },
    {
      title: "Precision Spare Parts Supply",
      icon: <FaTools />,
      desc: "We manufacture and stock high-consistency replacement spare parts compatible with ISO 2858 and ANSI pumps: impellers, shafts, protective sleeves, casings, wear rings, and high-performance mechanical seals.",
      highlights: ["ISO 1940 G2.5 balanced impellers", "High tensile steel shaft stocks", "PTFE / Ceramic seal faces", "Same-day dispatch of key spares"]
    },
    {
      title: "On-Site Installation & Commissioning",
      icon: <FaHardHat />,
      desc: "Eliminate early bearing fatigue caused by incorrect piping alignment. Our field service engineers assist your maintenance crew during baseplate leveling, motor dynamic alignment, and initial fluid flow commissioning.",
      highlights: ["Dynamic laser alignment", "Foundation base leveling", "Seal pressure adjustments", "Field performance verification"]
    }
  ];

  return (
    <div className="pt-24 bg-white text-left">
      <SEO 
        title="Industrial Pump Services" 
        description="Learn about Chem-X engineering support, pump overhaul & repairs, laser alignment, annual maintenance contracts (AMC), and spare parts distribution."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Technical Services</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Services & Support</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            From design optimization to dynamic laser alignment and 24/7 replacement parts distribution.
          </p>
        </div>
      </section>

      {/* Services listing */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12">
          {services.map((serv, idx) => (
            <div 
              key={idx} 
              className="border border-slate-200 p-6 md:p-8 rounded-sm bg-white hover:shadow-md transition-shadow flex flex-col lg:flex-row gap-8 items-start"
            >
              
              {/* Left icon circle */}
              <div className="p-4 bg-slate-50 border border-slate-200 text-brand-blue text-3xl rounded-sm shrink-0">
                {serv.icon}
              </div>

              {/* Details text */}
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wider">{serv.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{serv.desc}</p>
                
                {/* Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {serv.highlights.map((high, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-brand-orange shrink-0" />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="shrink-0 w-full lg:w-48 space-y-3">
                <button
                  onClick={() => openQuoteModal(`Service Inquiry: ${serv.title}`)}
                  className="btn-primary py-2.5 px-4 text-xs font-bold uppercase w-full cursor-pointer text-center"
                >
                  Request Service
                </button>
                <a 
                  href="tel:+919879884153" 
                  className="btn-outline py-2 px-4 text-xs font-bold uppercase w-full flex items-center justify-center gap-1"
                >
                  <FaPhoneAlt size={10} /> Call Support
                </a>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Repair workshop overview banner */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">Overhaul Facilities</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy">Multi-Brand Pump Servicing</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our workshop is fully equipped to repair, balance, and re-certify process pumps from all leading manufacturers (e.g. Grundfos, Flowserve, KSB, Sulzer, Kirloskar). We perform casing thickness testing, shaft laser alignment, and provide detailed pressure/flow test bed certificates.
              </p>
              <button 
                onClick={() => openQuoteModal('Multi-Brand Pump Repair')}
                className="btn-secondary py-2.5 px-6 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Inquire Pump Repair
              </button>
            </div>
            <div className="border-4 border-white shadow-md p-2 bg-white">
              <img 
                src="/images/pump_7.png" 
                alt="Pump repair works" 
                className="w-full aspect-video object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
