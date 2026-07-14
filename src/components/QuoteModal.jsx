import React from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes, FaEnvelope, FaPhone, FaBuilding, FaUser, FaCheckCircle } from 'react-icons/fa';
import productsData from '../data/products.json';

export default function QuoteModal({ isOpen, onClose, initialProduct = '' }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      product: initialProduct
    }
  });
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      reset({ product: initialProduct });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialProduct, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Quote Request Submitted:', data);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-xs">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-sm shadow-xl overflow-hidden z-10">
        {/* Header */}
        <div className="bg-brand-navy text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">Request a Technical Quote</h3>
            <p className="text-xs text-slate-300 mt-1">Get custom engineering solutions and pricing</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-emerald-500 mx-auto mb-4" size={60} />
              <h4 className="text-2xl font-bold text-brand-navy">Quote Request Submitted</h4>
              <p className="text-slate-600 mt-2 max-w-md mx-auto">
                Thank you for contacting Chem-X. Our application engineering team will review your specifications and get back to you within 24 business hours.
              </p>
              <button 
                onClick={() => { onClose(); setSubmitted(false); reset(); }}
                className="mt-6 btn-primary"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                    Full Name <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <FaUser size={14} />
                    </span>
                    <input
                      type="text"
                      className={`w-full pl-9 pr-3 py-2 border rounded-sm outline-none text-sm transition-colors ${
                        errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      placeholder="John Doe"
                      {...register('fullName', { required: 'Full name is required' })}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                    Company Name <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <FaBuilding size={14} />
                    </span>
                    <input
                      type="text"
                      className={`w-full pl-9 pr-3 py-2 border rounded-sm outline-none text-sm transition-colors ${
                        errors.company ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      placeholder="Industrial Corp Ltd"
                      {...register('company', { required: 'Company name is required' })}
                    />
                  </div>
                  {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                    Corporate Email <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <FaEnvelope size={14} />
                    </span>
                    <input
                      type="email"
                      className={`w-full pl-9 pr-3 py-2 border rounded-sm outline-none text-sm transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      placeholder="jdoe@company.com"
                      {...register('email', { 
                        required: 'Corporate email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                    Phone / Contact Number <span className="text-brand-orange">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <FaPhone size={14} />
                    </span>
                    <input
                      type="tel"
                      className={`w-full pl-9 pr-3 py-2 border rounded-sm outline-none text-sm transition-colors ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue'
                      }`}
                      placeholder="+1 (555) 000-0000"
                      {...register('phone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[+]?[0-9\s-()]{7,20}$/,
                          message: 'Invalid phone number format'
                        }
                      })}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                  Select Equipment / Pump Series
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm outline-none text-sm bg-white focus:border-brand-blue"
                  {...register('product')}
                >
                  <option value="">-- General Equipment Inquiry --</option>
                  {productsData.products.map((p) => (
                    <option key={p.id} value={`${p.name} (${p.model})`}>
                      {p.name} - {p.model}
                    </option>
                  ))}
                  <option value="custom">Custom Engineered Pump Solution</option>
                  <option value="spares">Industrial Spare Parts & Components</option>
                  <option value="repairs">Pump Repair & Maintenance Services</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
                  Technical Requirements / Operating Conditions <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-sm outline-none text-sm transition-colors ${
                    errors.requirements ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-blue'
                  }`}
                  placeholder="Please specify flow rate, head, temperature, chemical compatibility or pump model dimensions..."
                  {...register('requirements', { required: 'Please describe your requirements' })}
                />
                {errors.requirements && <p className="text-xs text-red-500 mt-1">{errors.requirements.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary font-bold tracking-wide uppercase py-3 cursor-pointer"
                >
                  {isSubmitting ? 'Processing Specifications...' : 'Submit Quote Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
