import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaFlask } from 'react-icons/fa';
import AdSenseSlot from '../components/AdSenseSlot';

export default function ChemicalCompatibilityGuide() {
  const [search, setSearch] = useState('');

  const compatibilityData = [
    { chemical: 'Sulfuric Acid (H2SO4) 98%', temp: 'Up to 60°C', ss316: 'Poor', hastelloy: 'Excellent', pp: 'Good', pvdf: 'Excellent' },
    { chemical: 'Hydrochloric Acid (HCl) 37%', temp: 'Up to 50°C', ss316: 'Severe Attack', hastelloy: 'Excellent', pp: 'Excellent', pvdf: 'Excellent' },
    { chemical: 'Nitric Acid (HNO3) 65%', temp: 'Up to 80°C', ss316: 'Good', hastelloy: 'Excellent', pp: 'Fair', pvdf: 'Excellent' },
    { chemical: 'Sodium Hydroxide (NaOH) 50%', temp: 'Up to 90°C', ss316: 'Good', hastelloy: 'Excellent', pp: 'Excellent', pvdf: 'Good' },
    { chemical: 'Phosphoric Acid 85%', temp: 'Up to 70°C', ss316: 'Fair', hastelloy: 'Excellent', pp: 'Excellent', pvdf: 'Excellent' },
    { chemical: 'Toluene / Xylene Solvents', temp: 'Up to 100°C', ss316: 'Excellent', hastelloy: 'Excellent', pp: 'Poor', pvdf: 'Good' },
    { chemical: 'Hot Thermal Transfer Oil', temp: 'Up to 350°C', ss316: 'Excellent', hastelloy: 'Excellent', pp: 'Unsuitable', pvdf: 'Unsuitable' },
    { chemical: 'Demineralized Water (DI)', temp: 'Ambient', ss316: 'Excellent', hastelloy: 'Excellent', pp: 'Excellent', pvdf: 'Excellent' }
  ];

  const filtered = compatibilityData.filter(item => 
    item.chemical.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Excellent':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit"><FaCheckCircle className="text-emerald-600" /> Excellent</span>;
      case 'Good':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit"><FaCheckCircle className="text-blue-600" /> Good</span>;
      case 'Fair':
      case 'Poor':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit"><FaExclamationTriangle className="text-amber-600" /> {status}</span>;
      default:
        return <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-fit"><FaTimesCircle className="text-red-600" /> {status}</span>;
    }
  };

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Chemical Compatibility & MOC Resistance Chart | Chem-X</title>
        <meta name="description" content="Interactive chemical compatibility matrix for selecting pump metallurgy (SS316, Hastelloy C, Polypropylene, PVDF) for aggressive acids and solvents." />
      </Helmet>

      {/* Hero */}
      <div className="bg-brand-navy text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/resources" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white mb-4 transition-colors">
            <FaArrowLeft /> Back to Resources Hub
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <FaFlask className="text-brand-orange text-2xl" />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Chemical Compatibility & MOC Selection Chart
            </h1>
          </div>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Metallurgical & polymer material resistance guide for industrial centrifugal process pumps.
          </p>
        </div>
      </div>

      {/* Top Banner Ad Unit */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot 
          adSlot="8812345007" 
          label="Sponsor Advertisement" 
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
        />
      </div>

      {/* Matrix Table Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Interactive Chemical Resistance Matrix</h2>
              <p className="text-xs text-slate-500">Filter by chemical media or acid concentration</p>
            </div>
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-3 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="Search chemical..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-3.5">Chemical Media</th>
                  <th className="p-3.5">Max Temp</th>
                  <th className="p-3.5">SS 316</th>
                  <th className="p-3.5">Hastelloy C</th>
                  <th className="p-3.5">Polypropylene (PP)</th>
                  <th className="p-3.5">PVDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length > 0 ? (
                  filtered.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{item.chemical}</td>
                      <td className="p-3.5 text-slate-600 font-mono">{item.temp}</td>
                      <td className="p-3.5">{getStatusBadge(item.ss316)}</td>
                      <td className="p-3.5">{getStatusBadge(item.hastelloy)}</td>
                      <td className="p-3.5">{getStatusBadge(item.pp)}</td>
                      <td className="p-3.5">{getStatusBadge(item.pvdf)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-slate-400">
                      No chemicals found matching "{search}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* In-Table Ad Unit */}
          <AdSenseSlot 
            adSlot="8812345008" 
            label="Advertisement" 
            className="bg-slate-50 p-4 rounded-xl border border-slate-200 my-6" 
          />

          {/* Disclaimer */}
          <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-500 border border-slate-200">
            <strong>Note:</strong> Compatibility data is based on standard laboratory corrosion tests. Factors such as chemical concentration, fluid flow velocity, aeration, and thermal cycling may alter actual component lifespan. Contact Chem-X technical team for specialized fluid consultation.
          </div>

        </div>
      </div>
    </div>
  );
}
