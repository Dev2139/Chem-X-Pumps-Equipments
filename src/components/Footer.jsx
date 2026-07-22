import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedinIn, FaTwitter, FaFacebookF, FaYoutube, FaGlobe } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-slate-300 border-t-4 border-brand-orange">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded hover:bg-slate-50 transition-colors duration-200">
              <img
                src={logo}
                alt="Chem-X Pumps & Equipment"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Established industrial manufacturer of premium centrifugal process, chemical, and monoblock pumps. Engineered for high performance in corrosive and high-temperature environments.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-orange text-white hover:text-white transition-colors duration-200 rounded-sm" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-orange text-white hover:text-white transition-colors duration-200 rounded-sm" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-orange text-white hover:text-white transition-colors duration-200 rounded-sm" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-brand-orange text-white hover:text-white transition-colors duration-200 rounded-sm" aria-label="YouTube">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base border-l-2 border-brand-orange pl-3 mb-6 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  About Chem-X
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Products Catalog
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Industries Served
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Media & Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories (Highlights) */}
          <div>
            <h4 className="text-white font-bold text-base border-l-2 border-brand-orange pl-3 mb-6 uppercase tracking-wider">
              Featured Products
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/product/centrifugal-process-pump" className="hover:text-white transition-colors">
                  Centrifugal Process Pump (CCPP)
                </Link>
              </li>
              <li>
                <Link to="/product/air-cooled-hot-oil-pump" className="hover:text-white transition-colors">
                  Air Cooled Hot Oil Pump
                </Link>
              </li>
              <li>
                <Link to="/product/centrifugal-mono-block-pump" className="hover:text-white transition-colors">
                  Centrifugal Mono Block Pump (CCMBP)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  ISO 2858 & DIN 24256 Pumps
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Contact */}
          <div>
            <h4 className="text-white font-bold text-base border-l-2 border-brand-orange pl-3 mb-6 uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-brand-orange mt-1 shrink-0" size={16} />
                <span className="leading-relaxed">
                  SHED-34 KESHAV IND PARK,<br />
                  OPP. JAY RADHE RESIDENCY,<br />
                  VILL: Ahmedabad (M Corp.+OG) (Part),<br />
                  TAL: Ahmedabad City, DISTRICT: Ahmedabad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-brand-orange mt-1 shrink-0" size={14} />
                <div className="flex flex-col">
                  <a href="tel:+919879884153" className="hover:text-white transition-colors">
                    +91 98798 84153
                  </a>
                  <a href="tel:+919328946682" className="hover:text-white transition-colors">
                    +91 93289 46682
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-brand-orange shrink-0" size={14} />
                <a href="mailto:chemxpumps@gmail.com" className="hover:text-white transition-colors">
                  chemxpumps@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaGlobe className="text-brand-orange shrink-0" size={14} />
                <a href="https://www.chemxpumps.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.chemxpumps.com
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-white uppercase block mb-1">Quality Assurance:</span>
                ISO 9001:2015 Certified Manufacturing Facility
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Lower Copyright Footer */}
      <div className="bg-slate-950 text-slate-500 py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} Chem-X Pumps & Equipment. All Rights Reserved. Manufactured in India.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
