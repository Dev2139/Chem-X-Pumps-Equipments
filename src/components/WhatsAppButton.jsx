import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phoneNumber = '919879884153';
  const defaultMessage = encodeURIComponent('Hello! I would like to inquire about Chem-X Pumps & Equipment products.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Main WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Animated pulse background ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 pointer-events-none"></span>
        
        <FaWhatsapp size={32} className="drop-shadow-sm" />
      </a>
    </div>
  );
}
