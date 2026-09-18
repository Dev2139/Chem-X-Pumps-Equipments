import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaCogs, FaFlask, FaCalculator, FaFileAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import AdSenseSlot from '../components/AdSenseSlot';

export default function ResourcesHub() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Engineering Resources & Technical Guides | Chem-X Pumps</title>
        <meta name="description" content="Access technical guides, chemical compatibility charts, industrial pump selection tools, and engineering resources by Chem-X Pumps & Equipment." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Knowledge Base & Technical Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Industrial Pump & Engineering Resources
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Technical documentation, chemical resistance reference guides, and engineering formulas for plant engineers, OEM specifiers, and fluid maintenance teams.
          </p>
        </div>
      </section>

      {/* Top Banner Ad Unit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot 
          adSlot="8812345001" 
          label="Sponsored Technical Partner" 
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Resource Cards (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-brand-orange pl-3">
              Featured Engineering Guides
            </h2>

            {/* Guide Card 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3 text-brand-orange">
                <FaCogs size={24} />
                <span className="text-xs font-bold uppercase tracking-wider bg-orange-50 text-brand-orange px-2.5 py-1 rounded">
                  Technical Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Industrial Pump Selection & Head Calculations Guide
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Step-by-step engineering tutorial for calculating Total Dynamic Head (TDH), Net Positive Suction Head (NPSHa vs NPSHr), viscosity corrections, and motor sizing for process plants.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium">Reading time: 8 mins</span>
                <Link 
                  to="/resources/pump-selection-guide" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors"
                >
                  Read Full Guide <FaArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* In-Content Ad Unit */}
            <AdSenseSlot 
              adSlot="8812345002" 
              label="Sponsored Advertisement" 
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
            />

            {/* Guide Card 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3 text-emerald-600">
                <FaFlask size={24} />
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded">
                  Material Matrix
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Chemical Compatibility & MOC Selection Chart
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Complete metallographic and polymer compatibility table for handling concentrated acids (H2SO4, HCl, HNO3), alkalis, solvent mixtures, and high-temperature thermal fluids.
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400 font-medium">Reading time: 12 mins</span>
                <Link 
                  to="/resources/chemical-compatibility-guide" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors"
                >
                  View Compatibility Chart <FaArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Quick Formula Sheet */}
            <div className="bg-gradient-to-br from-slate-900 to-brand-navy text-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-brand-orange mb-3 flex items-center gap-2">
                <FaCalculator /> Key Fluid Mechanics Formulas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <div className="text-white font-bold mb-1">Hydraulic Power (kW):</div>
                  <code>P = (Q × H × ρ × g) / (3.6 × 10^6)</code>
                </div>
                <div className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <div className="text-white font-bold mb-1">NPSH Available (m):</div>
                  <code>NPSHa = (Ha ± Hz - Hf - Hvp)</code>
                </div>
              </div>
            </div>

          </div>

          {/* Side Rail (1 Column - Ad & Quick Quick Links) */}
          <div className="space-y-6">
            
            {/* Sidebar Ad Unit */}
            <AdSenseSlot 
              adSlot="8812345003" 
              adFormat="vertical" 
              label="Partner Ad" 
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
            />

            {/* Standards & Certifications Box */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h4 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Industry Manufacturing Standards
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong>ISO 2858:</strong> End-suction centrifugal pumps ratings & dimensions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong>DIN 24256:</strong> Chemical process pump testing & hydraulic performance limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong>ISO 9001:2015:</strong> Quality management system certified manufacturing.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
