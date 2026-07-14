import React from 'react';
import { FaCheckCircle, FaAward, FaBuilding, FaTools, FaShieldAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function About() {
  const { openQuoteModal } = useQuoteModal();

  const coreValues = [
    { title: "Engineering Integrity", desc: "We design according to strict fluid dynamic principles, selecting precise tolerances to optimize efficiency." },
    { title: "Metallurgical Precision", desc: "Every casting runs through strict spectrometer evaluation, guaranteeing resistance to chemical corrosion." },
    { title: "Continuous Quality Check", desc: "No pump leaves our Ahmedabad factory without undergoing rigorous pressure, head, and load testing." },
    { title: "Long-term Partnerships", desc: "We support clients throughout the pump lifecycle, supplying spares and expert maintenance field support." }
  ];

  return (
    <div className="pt-24 bg-white">
      <SEO 
        title="About Our Company" 
        description="Learn about Chem-X Pumps & Equipment - our manufacturing plant, engineering standards, and ISO 9001:2015 quality policies."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Corporate Profile</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">About Chem-X</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            A trusted manufacturer, repairer, and spare provider of heavy-duty chemical process and industrial pumps.
          </p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
              A Culture of Engineering Excellence
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chem-X Pumps & Equipment was founded to bridge the gap between premium, high-cost imported process pumps and standard local options. By combining advanced metallurgical castings with precision CNC machining, we manufacture pumps that survive the harshest corrosive and high-temperature environments.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Headquartered in Ahmedabad, India, our state-of-the-art facility features a complete foundry, static and dynamic balancing rigs, and full-load testing beds. Whether you require standard polypropylene pumps for acid transfer or heavy-duty chemical pumps in Hastelloy or Alloy 20, we offer optimized fluid systems tailored to your operation.
            </p>
            
            <div className="border-l-4 border-brand-orange pl-4 italic text-sm text-slate-500 font-medium bg-slate-50 py-3">
              "Our engineering goal is simple: maximize system efficiency, minimize seal deflection, and deliver absolute structural reliability."
            </div>
          </div>

          <div className="border-4 border-slate-200 p-2 bg-slate-50">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
              alt="Engineering Work" 
              className="w-full aspect-video object-cover"
            />
          </div>

        </div>
      </section>

      {/* ISO Quality Policy */}
      <section className="bg-slate-50 py-16 border-y border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1 space-y-4">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block">Quality First</span>
              <h3 className="text-2xl font-black text-brand-navy uppercase tracking-wider">ISO 9001:2015 Certifications</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our manufacturing policy mandates detailed visual, dimensional, and metallurgical evaluation of raw inputs, casting, components, and finished units.
              </p>
              <div className="flex items-center gap-3 bg-white p-4 border border-slate-200 rounded-sm">
                <FaAward className="text-brand-orange text-3xl shrink-0" />
                <div>
                  <span className="text-sm font-bold text-brand-navy block">Certified Quality</span>
                  <span className="text-[10px] text-slate-500">Registration Number: ISO-9001-2015-CX</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-6 rounded-sm">
                  <span className="inline-flex p-2 bg-slate-50 text-brand-blue text-lg rounded-sm mb-3">
                    <FaCheckCircle />
                  </span>
                  <h4 className="text-base font-bold text-brand-navy mb-2">{val.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">Our Facility</span>
          <h2 className="text-3xl font-extrabold text-brand-navy tracking-tight">
            Advanced Manufacturing Infrastructure
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Equipped with technical machinery to cast, grind, and align rotating equipment under strict tolerances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="border border-slate-200 p-6 rounded-sm bg-white hover:shadow-md transition-shadow">
            <FaBuilding className="text-brand-blue text-3xl mb-4" />
            <h4 className="text-lg font-bold text-brand-navy mb-2">Metallurgical Foundry</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipped with induction furnace structures, pattern shops, and sand-mold castings to produce dense, defect-free pump casings in custom alloys.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-slate-200 p-6 rounded-sm bg-white hover:shadow-md transition-shadow">
            <FaTools className="text-brand-blue text-3xl mb-4" />
            <h4 className="text-lg font-bold text-brand-navy mb-2">Precision CNC Shop</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Features heavy duty CNC lathes and milling machines that precision-grind pump shafts, sleeves, and bearing housings to ensure zero vibration.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-slate-200 p-6 rounded-sm bg-white hover:shadow-md transition-shadow">
            <FaShieldAlt className="text-brand-blue text-3xl mb-4" />
            <h4 className="text-lg font-bold text-brand-navy mb-2">Computerized Test Bed</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Features digital flow meters, pressure sensors, and temperature probes to test performance curve (capacity vs. head) and verify BEP points.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-navy text-white py-12 md:py-16 text-center border-t-4 border-brand-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Require a Pump Audit for your Factory?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Discuss replacement options and energy-saving configurations directly with our application engineers.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => openQuoteModal()}
              className="btn-primary py-2 px-6 uppercase text-xs font-bold tracking-wider cursor-pointer"
            >
              Consult an Engineer
            </button>
            <a href="tel:+919879884153" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy text-xs py-2 px-6">
              Call Service Desk
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
