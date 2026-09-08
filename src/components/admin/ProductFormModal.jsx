import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes, FaPlus, FaPen, FaSpinner } from 'react-icons/fa';

// Helpers to convert textarea input into API payload structures
const toLines = (text) =>
  (text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const toKeyValue = (text) => {
  const result = {};
  toLines(text).forEach((line) => {
    const sepIndex = line.indexOf(':');
    if (sepIndex > 0) {
      const key = line.slice(0, sepIndex).trim();
      const value = line.slice(sepIndex + 1).trim();
      if (key && value) result[key] = value;
    }
  });
  return result;
};

// Reverse helpers: convert stored product data back into textarea text (for edit mode)
const fromLines = (arr) => (arr || []).join('\n');
const fromKeyValue = (obj) =>
  Object.entries(obj || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

// Map a product (or nothing) to the flat form values used by the inputs
const buildFormValues = (product) => ({
  name: product?.name || '',
  model: product?.model || '',
  category: product?.category || '',
  shortDescription: product?.shortDescription || '',
  description: product?.description || '',
  images: fromLines(product?.images),
  brochurePdf: product?.brochurePdf || 'https://drive.google.com/file/d/1RdyrDP0f-LuynVgop4_q5jJ4tW1joHlg/view?usp=sharing',
  specifications: fromKeyValue(product?.specifications),
  operatingRange: fromKeyValue(product?.operatingRange),
  features: fromLines(product?.features),
  materials: fromLines(product?.materials),
  applications: fromLines(product?.applications),
  targetIndustries: fromLines(product?.targetIndustries),
  advantages: fromLines(product?.advantages),
});

const inputClass =
  'w-full px-3 py-2 border border-slate-300 rounded-sm bg-white outline-none text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue';
const labelClass = 'block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1';
const hintClass = 'text-[10px] text-slate-400 mt-1';

export default function ProductFormModal({ isOpen, onClose, onSubmitProduct, categories = [], serverError = '', product = null }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const isEdit = Boolean(product);

  useEffect(() => {
    if (isOpen) reset(buildFormValues(product));
  }, [isOpen, product, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const payload = {
      name: data.name.trim(),
      model: data.model.trim(),
      category: data.category.trim(),
      shortDescription: data.shortDescription.trim(),
      description: data.description.trim(),
      images: toLines(data.images),
      brochurePdf: data.brochurePdf.trim(),
      specifications: toKeyValue(data.specifications),
      operatingRange: toKeyValue(data.operatingRange),
      features: toLines(data.features),
      materials: toLines(data.materials),
      applications: toLines(data.applications),
      targetIndustries: toLines(data.targetIndustries),
      advantages: toLines(data.advantages),
    };
    await onSubmitProduct(payload);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-navy/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-sm shadow-2xl flex flex-col text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-brand-navy rounded-t-sm">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            {isEdit
              ? (<><FaPen size={11} className="text-brand-orange" /> Edit Product — {product.name}</>)
              : (<><FaPlus size={11} className="text-brand-orange" /> Add New Product</>)}
          </h2>
          <button onClick={onClose} className="text-slate-300 hover:text-white cursor-pointer" aria-label="Close">
            <FaTimes size={16} />
          </button>
        </div>

        {/* Scrollable form body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-4 py-3 rounded-sm">
              {serverError}
            </div>
          )}

          {/* Core details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className={labelClass}>Product Name *</label>
              <input
                type="text"
                placeholder="e.g. Slurry Process Pump"
                className={inputClass}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Model *</label>
              <input
                type="text"
                placeholder="e.g. CSP-100"
                className={inputClass}
                {...register('model', { required: 'Model is required' })}
              />
              {errors.model && <p className="text-red-500 text-[10px] mt-1">{errors.model.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Category *</label>
              <input
                type="text"
                list="admin-categories"
                placeholder="Select or type new"
                className={inputClass}
                {...register('category', { required: 'Category is required' })}
              />
              <datalist id="admin-categories">
                {categories.map((cat) => <option key={cat} value={cat} />)}
              </datalist>
              {errors.category && <p className="text-red-500 text-[10px] mt-1">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              type="text"
              placeholder="One-line summary shown on the product card"
              className={inputClass}
              {...register('shortDescription')}
            />
          </div>

          <div>
            <label className={labelClass}>Full Description</label>
            <textarea
              rows={3}
              placeholder="Detailed product description..."
              className={inputClass}
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Image URLs</label>
              <textarea
                rows={3}
                placeholder={'https://.../pump-front.png\nhttps://.../pump-side.png'}
                className={inputClass}
                {...register('images')}
              />
              <p className={hintClass}>One image URL per line. First image is the main thumbnail.</p>
            </div>
            <div>
              <label className={labelClass}>Brochure PDF URL</label>
              <input
                type="text"
                placeholder="https://.../brochure.pdf (optional)"
                className={inputClass}
                {...register('brochurePdf')}
              />
            </div>
          </div>

          {/* Technical data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Specifications</label>
              <textarea
                rows={4}
                placeholder={'Type: Single Stage Horizontal\nImpeller Type: Closed Impeller'}
                className={inputClass}
                {...register('specifications')}
              />
              <p className={hintClass}>One per line, format: Key: Value</p>
            </div>
            <div>
              <label className={labelClass}>Operating Range</label>
              <textarea
                rows={4}
                placeholder={'Capacity: up to 2200 m³/hr\nHead: up to 150 mtr\nTemperature: up to 350° C'}
                className={inputClass}
                {...register('operatingRange')}
              />
              <p className={hintClass}>One per line, format: Key: Value</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Features</label>
              <textarea
                rows={4}
                placeholder={'Back Pull-Out Design.\nHighly Efficient Performance.'}
                className={inputClass}
                {...register('features')}
              />
              <p className={hintClass}>One feature per line</p>
            </div>
            <div>
              <label className={labelClass}>Materials (MOC)</label>
              <textarea
                rows={4}
                placeholder={'SS 316 (CF8M)\nCarbon Steel (WCB)'}
                className={inputClass}
                {...register('materials')}
              />
              <p className={hintClass}>One material per line</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Applications</label>
              <textarea
                rows={3}
                placeholder={'Effluent Treatment Plants\nSugar Plants'}
                className={inputClass}
                {...register('applications')}
              />
            </div>
            <div>
              <label className={labelClass}>Target Industries</label>
              <textarea
                rows={3}
                placeholder={'CHEMICAL\nPETROCHEMICAL'}
                className={inputClass}
                {...register('targetIndustries')}
              />
            </div>
            <div>
              <label className={labelClass}>Advantages</label>
              <textarea
                rows={3}
                placeholder={'Low maintenance\nEnergy efficient'}
                className={inputClass}
                {...register('advantages')}
              />
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-sm flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-brand-navy uppercase tracking-wider border border-slate-300 rounded-sm hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white uppercase tracking-wider bg-brand-orange rounded-sm hover:bg-brand-orange/90 disabled:opacity-60 cursor-pointer flex items-center gap-2"
          >
            {isSubmitting
              ? (<><FaSpinner className="animate-spin" size={11} /> Saving...</>)
              : isEdit
                ? (<><FaPen size={10} /> Save Changes</>)
                : (<><FaPlus size={10} /> Add Product</>)}
          </button>
        </div>
      </div>
    </div>
  );
}
