import React from 'react';
import { 
  FaFlask, FaIndustry, FaWater, FaPills, FaUtensils, FaBolt, 
  FaHardHat, FaCopy, FaCogs, FaGlobe, FaChevronRight 
} from 'react-icons/fa';
import SEO from '../components/SEO';
import { useQuoteModal } from '../context/QuoteModalContext';

export default function Industries() {
  const { openQuoteModal } = useQuoteModal();

  const industryDetails = [
    {
      name: "Chemical Processing",
      icon: <FaFlask />,
      challenge: "Handling corrosive liquids, concentrated acids (Sulphuric, Hydrochloric, Nitric), alkalis, and reactive solvents under high temperatures.",
      solution: "Chem-X Solid PP pumps (CMPP/CPP) for ambient corrosive transfer, and SS316L, Alloy 20, or Hastelloy centrifugal process pumps (CCPP) for hot chemical feeds.",
      specs: "MOC: SS316, Duplex, Hastelloy, Solid PP | Seal: Double cartridge mechanical seal with external flush."
    },
    {
      name: "Oil & Gas / Refining",
      icon: <FaIndustry />,
      challenge: "Handling hot thermic fluids, heat-transfer oils, hydrocarbon mixtures, volatile organic compounds, and high discharge heads.",
      solution: "Chem-X Air Cooled Hot Oil Pumps (CX-ACOP) with cooling fin convective heat dissipation, and API standard heavy-duty cast steel centrifugal process pumps.",
      specs: "MOC: Carbon Steel (WCB), SS316 | Operating Temp: Up to 350°C without cooling water."
    },
    {
      name: "Water & Wastewater Treatment",
      icon: <FaWater />,
      challenge: "Recirculating raw municipal water, dosing flocculants and chemicals, filtration feed, handling sewage sludge and wastewater with solids.",
      solution: "Chem-X Non-Clog Self-Priming Mud pumps (CX-MP) for raw effluents, Submersible dewatering pumps (CX-SMP) for sumps, and PP Monoblock pumps for chemical dosing.",
      specs: "Solids: Handles up to 50mm dia | Design: Foot-valve-free self-priming up to 7.5 meters."
    },
    {
      name: "Pharmaceutical & Bulk Drugs",
      icon: <FaPills />,
      challenge: "Transferring high-purity solvents, active chemical ingredients, acids, alkalis, requiring zero product contamination and absolute seal integrity.",
      solution: "Corrosion-resistant PP Mono Block pumps (CMPP) with Teflon bellows, and high-efficiency sanitary stainless steel centrifugal pumps.",
      specs: "MOC: Polypropylene (PP), SS316L | Seal: Leak-proof external bellow seals."
    },
    {
      name: "Food & Beverage Processing",
      icon: <FaUtensils />,
      challenge: "Handling food syrups, edible oils, starch, high viscosity ingredients, and hot cooking oil transfer.",
      solution: "Rotary Twin Gear pumps (CX-GP) for viscous transfers (syrups/oil) and Air Cooled Hot Oil pumps for deep frying oil recycling loops.",
      specs: "Viscosity: Up to 100,000 cSt | Certification: Food-grade SS316 castings available."
    },
    {
      name: "Power Generation",
      icon: <FaBolt />,
      challenge: "Boiler feed water recirculation, hot steam condensate extraction, cooling tower water feed, and fly ash slurry disposal.",
      solution: "Heavy duty CCPP Centrifugal Process pumps for cooling loops, and high-pressure alloy slurry pumps (CX-SP) for coal ash slurry transfer.",
      specs: "Pressure: Up to 15 kg/cm² | MOC: SS304, SS316, Duplex alloys."
    },
    {
      name: "Mining & Mineral Ore Processing",
      icon: <FaHardHat />,
      challenge: "Transporting highly abrasive mineral tailings, ore slurs, sand mixtures, and deep shaft mine dewatering.",
      solution: "High-Chrome alloy lined Slurry pumps (CX-SP) with expeller dynamic seals, and vertical sump pumps (CX-VP) for sump clearing.",
      specs: "Hardness: > 600 BHN High-Chrome | Concentration: Up to 60% solids weight."
    },
    {
      name: "Pulp, Paper & Wood Mill",
      icon: <FaCopy />,
      challenge: "Handling air-entrained paper stocks, pulp slurry, wood chips suspension up to 8% consistency, and caustic black liquor.",
      solution: "Non-clog open impeller Stock pumps (CX-PMP) with inducer splitter vanes to prevent fiber plugging.",
      specs: "Consistency: Up to 8% bone-dry paper stock | MOC: Duplex Stainless Steel (2205)."
    },
    {
      name: "Iron & Steel Production",
      icon: <FaCogs />,
      challenge: "Recirculating water through scale pits, cooling furnace blast nozzles, high-pressure descaling spray pumps, and sludge filtration.",
      solution: "Filter Press Pumps (CX-FPP) to clear blast furnace sludge, and heavy-duty wear-resistant centrifugal pumps for scale pit lines.",
      specs: "Pressure: Dynamic feeding curves up to 8.5 bar | Wear Liners: 27% Chrome."
    },
    {
      name: "Marine & Ports",
      icon: <FaGlobe />,
      challenge: "Pumping highly corrosive seawater, handling bilge water, ballasting, and dewatering marine dry docks.",
      solution: "Seawater-resistant bronze or Super Duplex alloy centrifugal process pumps, and IP68 submersible dewatering pumps.",
      specs: "MOC: Phosphor Bronze, SS2507 Super Duplex | Design: Sea-water corrosion resistant."
    }
  ];

  return (
    <div className="pt-24 bg-white text-left">
      <SEO 
        title="Industries We Serve" 
        description="Explore the applications of Chem-X industrial pumps in Chemical processing, Oil & Gas, Water treatment, Pharmaceutical, and Mining industries."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Process Applications</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Industries We Serve</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            Custom metallurgies and flow configurations matching heavy chemical processing, refining, and mining workloads.
          </p>
        </div>
      </section>

      {/* Industry details loop */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {industryDetails.map((ind, idx) => (
            <div 
              key={idx} 
              className="border border-slate-200 p-6 md:p-8 rounded-sm bg-white hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 md:gap-8 items-start"
            >
              
              {/* Left icon circle */}
              <div className="p-4 bg-slate-50 border border-slate-200 text-brand-blue text-3xl rounded-sm shrink-0">
                {ind.icon}
              </div>

              {/* Details */}
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wider">{ind.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Process Challenge</span>
                    <p className="text-slate-600 leading-relaxed">{ind.challenge}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pumping Solution</span>
                    <p className="text-slate-600 leading-relaxed">{ind.solution}</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xs text-xs font-semibold text-brand-navy flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-orange shrink-0" />
                  <span>{ind.specs}</span>
                </div>
              </div>

              {/* Quote CTA */}
              <button
                onClick={() => openQuoteModal(`Inquiry for ${ind.name}`)}
                className="btn-primary py-2 px-4 text-xs font-bold uppercase shrink-0 w-full md:w-auto"
              >
                Inquire Application
              </button>

            </div>
          ))}
        </div>
      </section>

      {/* Corporate trust block */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy">Require Specialized Custom Metallurgy?</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Our Ahmedabad foundry regularly casts pumps in custom alloys (Alloy 20, Hastelloy B & C, SS316L, Super Duplex) to match specific process fluid pH and chloride levels.
          </p>
          <button 
            onClick={() => openQuoteModal('Custom Metallurgy Inquiry')}
            className="btn-secondary py-3 px-8 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Consult Metallurgy Experts
          </button>
        </div>
      </section>

    </div>
  );
}
