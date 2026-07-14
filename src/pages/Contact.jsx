import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaBuilding } from 'react-icons/fa';
import SEO from '../components/SEO';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Contact Inquiry Submitted:', data);
    setSubmitted(true);
  };

  return (
    <div className="pt-24 bg-white text-left">
      <SEO 
        title="Contact Chem-X Pumps" 
        description="Get in touch with Chem-X Pumps & Equipment in Ahmedabad. Request quotes, service callouts, or spare parts catalogues."
      />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 md:py-16 relative">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-2">Connect</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Contact Our Offices</h1>
          <p className="text-slate-300 text-sm md:text-base mt-4 max-w-xl">
            Get technical proposal parameters, spare parts stock updates, or schedule a field audit.
          </p>
        </div>
      </section>

      {/* Contact Grid details */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details side (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-navy uppercase tracking-wider mb-2">Chem-X Pumps & Equipment</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our central engineering offices and assembly foundry are located in Ahmedabad, Gujarat, India.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-50 border border-slate-200 text-brand-blue rounded-sm shrink-0">
                  <FaPhoneAlt size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phone Numbers</span>
                  <a href="tel:+919879884153" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    +91 98798 84153 (Inquiries)
                  </a>
                  <a href="tel:+919328946682" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    +91 93289 46682 (Support Desk)
                  </a>
                </div>
              </div>

              {/* Email & Website */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-50 border border-slate-200 text-brand-blue rounded-sm shrink-0">
                  <FaEnvelope size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Online Inquiries</span>
                  <a href="mailto:chemxpumps@gmail.com" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    chemxpumps@gmail.com
                  </a>
                  <a href="https://www.chemxpumps.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-navy hover:text-brand-orange block">
                    www.chemxpumps.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-50 border border-slate-200 text-brand-blue rounded-sm shrink-0">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Plant Address</span>
                  <p className="text-sm font-bold text-brand-navy leading-relaxed">
                    SHED-34 KESHAV IND PARK,<br />
                    OPP. JAY RADHE RESIDENCY,<br />
                    VILL: Ahmedabad (M Corp.+OG) (Part),<br />
                    TAL: Ahmedabad City, DISTRICT: Ahmedabad
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-slate-50 border border-slate-200 text-brand-blue rounded-sm shrink-0">
                  <FaClock size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Working Hours</span>
                  <p className="text-sm font-bold text-brand-navy">
                    Monday - Saturday: 9:00 AM - 6:00 PM IST
                  </p>
                  <p className="text-xs text-slate-500">
                    Closed on Sundays and National Holidays
                  </p>
                </div>
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

          {/* Form side (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-sm">
            <h3 className="text-xl font-bold text-brand-navy uppercase tracking-wider mb-2">Corporate Inquiry Form</h3>
            <p className="text-xs text-slate-500 mb-6">Complete the specifications below, and our applications desk will respond within 24 hours.</p>

            {submitted ? (
              <div className="text-center py-12">
                <FaCheckCircle className="text-emerald-500 mx-auto mb-4" size={55} />
                <h4 className="text-xl font-bold text-brand-navy">Thank You for Connecting</h4>
                <p className="text-slate-600 mt-2 max-w-sm mx-auto text-sm">
                  Your inquiry has been successfully logged. An engineer will follow up on your corporate contact details shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); reset(); }}
                  className="mt-6 btn-secondary text-xs uppercase font-bold py-2 px-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Contact Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                        errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      {...register('fullName', { required: 'Name is required' })}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 mt-0.5">{errors.fullName.message}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Company Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                        errors.company ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      {...register('company', { required: 'Company is required' })}
                    />
                    {errors.company && <p className="text-[10px] text-red-500 mt-0.5">{errors.company.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Corporate Email <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="email"
                      className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                        errors.email ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email format'
                        }
                      })}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Contact Phone <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      {...register('phone', { 
                        required: 'Phone is required',
                        pattern: {
                          value: /^[+]?[0-9\s-()]{7,20}$/,
                          message: 'Invalid format'
                        }
                      })}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Subject <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                    }`}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && <p className="text-[10px] text-red-500 mt-0.5">{errors.subject.message}</p>}
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Process specifications or general request description <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-sm outline-none text-sm bg-white transition-colors ${
                      errors.message ? 'border-red-500' : 'border-slate-300 focus:border-brand-blue'
                    }`}
                    {...register('message', { required: 'Message content is required' })}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-0.5">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary uppercase font-bold py-3 text-sm tracking-wider cursor-pointer"
                >
                  {isSubmitting ? 'Logging Inquiry...' : 'Submit Inquiry'}
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
