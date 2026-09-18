import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaCogs, FaProjectDiagram, FaShieldAlt } from 'react-icons/fa';
import AdSenseSlot from '../components/AdSenseSlot';

export default function PumpSelectionGuide() {
  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Industrial Pump Selection & Head Calculations Guide | Chem-X</title>
        <meta name="description" content="In-depth 5-step engineering guide for calculating Total Dynamic Head, NPSHa vs NPSHr, mechanical seal selection, and centrifugal pump sizing." />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-brand-navy text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link to="/resources" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white mb-4 transition-colors">
            <FaArrowLeft /> Back to Resources Hub
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Industrial Centrifugal Pump Selection Guide
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            A comprehensive step-by-step engineering reference for process engineers, plant specifiers, and fluid dynamics consultants.
          </p>
        </div>
      </div>

      {/* Top Banner Ad Unit */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdSenseSlot 
          adSlot="8812345004" 
          label="Sponsor Advertisement" 
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
        />
      </div>

      {/* Main Technical Article Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 space-y-10">
          
          {/* Intro Section */}
          <section className="prose max-w-none text-slate-700 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-brand-orange pl-3">
              Overview: Engineering Centrifugal Pump Systems
            </h2>
            <p className="text-sm leading-relaxed">
              Selecting the optimal centrifugal process pump requires careful evaluation of fluid characteristics, system piping hydraulics, static elevation changes, and net positive suction head (NPSH). Undersized pumps fail to deliver required flow rates, while oversized pumps operate far from their Best Efficiency Point (BEP), leading to premature bearing failure, shaft deflection, and cavitation.
            </p>
          </section>

          {/* Step 1 */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 text-brand-navy">
              <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-sm shrink-0">1</span>
              <h3 className="text-xl font-bold text-slate-900">Define Fluid Characteristics</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Prior to pump sizing, five core physical parameters of the pumped media must be accurately cataloged:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-brand-orange mt-0.5 shrink-0" />
                <span><strong>Specific Gravity (SG):</strong> Directly determines required motor horsepower.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-brand-orange mt-0.5 shrink-0" />
                <span><strong>Dynamic Viscosity:</strong> Viscosities over 50 cSt require HI viscous performance correction factors.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-brand-orange mt-0.5 shrink-0" />
                <span><strong>Vapor Pressure (Pvp):</strong> Critical for calculating available NPSH at operating temperature.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-brand-orange mt-0.5 shrink-0" />
                <span><strong>Solid Percentage & Abrasiveness:</strong> Dictates open impeller vs closed impeller design.</span>
              </li>
            </ul>
          </section>

          {/* Mid Article Ad Unit */}
          <AdSenseSlot 
            adSlot="8812345005" 
            label="Advertisement" 
            className="bg-slate-50 p-4 rounded-xl border border-slate-200" 
          />

          {/* Step 2: Total Dynamic Head */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 text-brand-navy">
              <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-sm shrink-0">2</span>
              <h3 className="text-xl font-bold text-slate-900">Calculate Total Dynamic Head (TDH)</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Total Dynamic Head is the sum of total static elevation lift and total friction losses in suction and discharge piping:
            </p>

            <div className="bg-slate-900 text-white p-5 rounded-xl text-xs font-mono space-y-2">
              <p className="text-brand-orange font-bold">TDH = Static Head + Friction Head Loss + Velocity Head + Pressure Head</p>
              <p className="text-slate-400">TDH = (Hs_discharge - Hs_suction) + Hf_pipes + Hf_fittings + (P_discharge - P_suction)/(ρ·g)</p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-xs text-amber-900 rounded-r-lg flex items-start gap-3">
              <FaExclamationTriangle className="text-amber-600 text-base shrink-0 mt-0.5" />
              <div>
                <strong>Engineering Tip:</strong> Always include equivalent length values (L/D) for elbows, check valves, gate valves, and strainers during pipe friction analysis using the Darcy-Weisbach or Hazen-Williams equation.
              </div>
            </div>
          </section>

          {/* Step 3: NPSH Avoid Cavitation */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 text-brand-navy">
              <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-sm shrink-0">3</span>
              <h3 className="text-xl font-bold text-slate-900">Ensure Margin Against Cavitation (NPSHa vs NPSHr)</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cavitation occurs when localized liquid pressure drops below liquid vapor pressure at the impeller eye, forming vapor bubbles that implode violently against impeller vanes.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900 space-y-2">
              <div className="font-bold text-emerald-950 flex items-center gap-2">
                <FaShieldAlt className="text-emerald-600" /> Golden Rule for Cavitation Safety:
              </div>
              <code>NPSHa (Available) ≥ NPSHr (Required) + 0.6 meters (Minimum 10-15% Safety Margin)</code>
            </div>
          </section>

          {/* Step 4: MOC & Seals */}
          <section className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3 text-brand-navy">
              <span className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-sm shrink-0">4</span>
              <h3 className="text-xl font-bold text-slate-900">Select Material of Construction (MOC) & Mechanical Seals</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Selecting appropriate metallurgy guarantees long service life without chemical corrosion or galvanic degradation:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                <span className="font-bold block text-slate-900 mb-1">SS 316 / SS 316L</span>
                <span className="text-slate-600">Standard for chemical process, mild acids, organic solvents, and high temperatures.</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                <span className="font-bold block text-slate-900 mb-1">Hastelloy C-276</span>
                <span className="text-slate-600">For severe oxidizing acids, wet chlorine, and concentrated hydrochloric solutions.</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
                <span className="font-bold block text-slate-900 mb-1">PP / PVDF Polymeric</span>
                <span className="text-slate-600">Ideal for metal-pickling acids, plating solutions, and pure non-metallic applications.</span>
              </div>
            </div>
          </section>

          {/* Bottom Article Ad Unit */}
          <AdSenseSlot 
            adSlot="8812345006" 
            label="Sponsored Link" 
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200" 
          />

        </div>
      </div>
    </div>
  );
}
