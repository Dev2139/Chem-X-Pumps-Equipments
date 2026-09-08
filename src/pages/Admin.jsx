import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaLock, FaPlus, FaPen, FaTrash, FaSignOutAlt, FaDatabase, FaSpinner, 
  FaCheckCircle, FaBoxOpen, FaInbox, FaSearch, FaEnvelope, FaPhone, 
  FaBuilding, FaEye, FaTimes, FaTag, FaClock, FaCheck, FaExclamationCircle
} from 'react-icons/fa';
import SEO from '../components/SEO';
import ProductFormModal from '../components/admin/ProductFormModal';
import { useProducts } from '../context/ProductsContext';

const TOKEN_KEY = 'chemx_admin_token';

export default function Admin() {
  const { products, source, refreshProducts } = useProducts();
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'products'

  // Product state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Inquiries state
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('All'); // 'All' | 'New' | 'Contacted' | 'Resolved'
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingInquiryId, setUpdatingInquiryId] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState('');

  const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  };

  // ---- Fetch Inquiries ----
  const fetchInquiries = async () => {
    if (!token) return;
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/admin/inquiries', { headers: authHeaders });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (res.ok && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiries();
    }
  }, [token]);

  // ---- Login ----
  const onLogin = async ({ password }) => {
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message === 'Failed to fetch' ? 'API server unreachable. Start it with: npm run server' : err.message);
    }
  };

  // ---- Inquiry Status Update ----
  const handleStatusChange = async (inquiryId, newStatus) => {
    setUpdatingInquiryId(inquiryId);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setInquiries((prev) =>
        prev.map((item) => (item.id === inquiryId || item._id === inquiryId ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && (selectedInquiry.id === inquiryId || selectedInquiry._id === inquiryId)) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingInquiryId(null);
    }
  };

  // ---- Delete Inquiry ----
  const handleDeleteInquiry = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to permanently delete this form submission?')) return;
    setDeletingId(inquiryId);
    try {
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete inquiry');

      setInquiries((prev) => prev.filter((item) => item.id !== inquiryId && item._id !== inquiryId));
      if (selectedInquiry && (selectedInquiry.id === inquiryId || selectedInquiry._id === inquiryId)) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Add / Edit product ----
  const openAddModal = () => {
    setServerError('');
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setServerError('');
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (payload) => {
    setServerError('');
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const res = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: authHeaders,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      await refreshProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
      setSuccessMsg(editingProduct
        ? `"${data.product.name}" updated successfully.`
        : `"${data.product.name}" added successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setServerError(err.message === 'Failed to fetch' ? 'API server unreachable. Start it with: npm run server' : err.message);
    }
  };

  // ---- Delete product ----
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.name}" permanently from the database?`)) return;
    setDeletingId(product.id);
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE', headers: authHeaders });
      const data = await res.json();
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Failed to delete product');
      await refreshProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered inquiries calculation
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = inquiryFilter === 'All' || inq.status === inquiryFilter;
    const q = inquirySearch.toLowerCase();
    const matchesSearch =
      !q ||
      (inq.name && inq.name.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.subject && inq.subject.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.product && inq.product.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  // ---------- Login screen ----------
  if (!token) {
    return (
      <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <SEO title="Admin Login" description="Chem-X administration panel." noindex={true} />
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-sm shadow-sm p-8 text-left">
          <div className="w-12 h-12 bg-brand-navy rounded-sm flex items-center justify-center mb-5">
            <FaLock className="text-brand-orange" size={18} />
          </div>
          <h1 className="text-xl font-black text-brand-navy tracking-tight">Admin Login</h1>
          <p className="text-xs text-slate-500 mt-1 mb-6">Enter the admin password to access lead form submissions and product catalog.</p>

          <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin password"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-sm bg-white outline-none text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password.message}</p>}
              {loginError && <p className="text-red-500 text-xs mt-2 font-bold">{loginError}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-navy/90 disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? <FaSpinner className="animate-spin" size={12} /> : <FaLock size={10} />} Login to Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-left pb-16">
      <SEO title="Admin Dashboard | Chem-X" description="Chem-X administration panel." noindex={true} />

      {/* Header */}
      <section className="bg-brand-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">Protected Admin Portal</span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Chem-X Management Portal</h1>
              <p className="text-slate-300 text-xs mt-2 flex items-center gap-2">
                <FaDatabase size={10} className={source === 'db' ? 'text-green-400' : 'text-yellow-400'} />
                {source === 'db'
                  ? `MongoDB Connected — ${inquiries.length} Form Submissions Saved`
                  : 'API Connection Active — Manage Leads & Catalog'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {activeTab === 'products' && (
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-orange/90 cursor-pointer flex items-center gap-2"
                >
                  <FaPlus size={10} /> Add Product
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white/10 cursor-pointer flex items-center gap-2"
              >
                <FaSignOutAlt size={10} /> Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 border-b border-white/10 pt-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2.5 border-b-2 cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'border-brand-orange text-white bg-white/5'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <FaInbox size={14} /> Form Submissions
              {newInquiriesCount > 0 && (
                <span className="bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                  {newInquiriesCount} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2.5 border-b-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'border-brand-orange text-white bg-white/5'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              <FaBoxOpen size={14} /> Product Catalog ({products.length})
            </button>
          </div>
        </div>
      </section>

      {/* Banner message */}
      {successMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2">
            <FaCheckCircle size={12} /> {successMsg}
          </div>
        </div>
      )}

      {/* TAB 1: FORM SUBMISSIONS */}
      {activeTab === 'inquiries' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200 p-4 rounded-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Filter Status:</span>
              {['All', 'New', 'Contacted', 'Resolved'].map((status) => {
                const count = status === 'All' ? inquiries.length : inquiries.filter((i) => i.status === status).length;
                const isActive = inquiryFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => setInquiryFilter(status)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-brand-navy text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input
                type="text"
                placeholder="Search name, email, subject, phone..."
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-sm text-xs outline-none focus:border-brand-blue"
              />
              {inquirySearch && (
                <button
                  onClick={() => setInquirySearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FaTimes size={10} />
                </button>
              )}
            </div>
          </div>

          {/* Submissions List / Table */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            {loadingInquiries ? (
              <div className="py-16 text-center text-slate-500 text-xs">
                <FaSpinner className="animate-spin mx-auto mb-2 text-brand-navy" size={24} />
                Loading form responses from database...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs">
                <FaInbox className="mx-auto mb-3 text-slate-300" size={32} />
                <p className="font-bold text-slate-600">No form responses found</p>
                <p className="text-slate-400 mt-1">
                  {inquirySearch || inquiryFilter !== 'All'
                    ? 'Try adjusting your search or filter options.'
                    : 'Customer inquiry form submissions will automatically appear here.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="text-left px-4 py-3 font-bold">Submission Date</th>
                      <th className="text-left px-4 py-3 font-bold">Customer Details</th>
                      <th className="text-left px-4 py-3 font-bold hidden md:table-cell">Form Subject & Type</th>
                      <th className="text-left px-4 py-3 font-bold">Status</th>
                      <th className="text-right px-4 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.map((inq) => {
                      const inqId = inq.id || inq._id;
                      const dateFormatted = inq.createdAt
                        ? new Date(inq.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'N/A';

                      return (
                        <tr key={inqId} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                          {/* Date */}
                          <td className="px-4 py-3 align-top">
                            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap flex items-center gap-1.5">
                              <FaClock size={10} className="text-slate-400 shrink-0" />
                              {dateFormatted}
                            </span>
                          </td>

                          {/* Customer */}
                          <td className="px-4 py-3 align-top">
                            <div className="space-y-0.5">
                              <span className="font-bold text-brand-navy text-xs block">{inq.name}</span>
                              {inq.company && (
                                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                  <FaBuilding size={9} className="text-slate-400" /> {inq.company}
                                </span>
                              )}
                              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                                <a href={`mailto:${inq.email}`} className="text-brand-blue hover:underline flex items-center gap-1">
                                  <FaEnvelope size={9} /> {inq.email}
                                </a>
                                {inq.phone && (
                                  <a href={`tel:${inq.phone}`} className="text-slate-600 hover:underline flex items-center gap-1">
                                    <FaPhone size={9} /> {inq.phone}
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Subject & Type */}
                          <td className="px-4 py-3 align-top hidden md:table-cell">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-slate-800 block truncate max-w-xs" title={inq.subject}>
                                {inq.subject || 'Website Inquiry'}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-slate-200">
                                  {inq.type || 'Form Submission'}
                                </span>
                                {inq.product && (
                                  <span className="bg-orange-50 text-brand-orange text-[10px] font-bold px-2 py-0.5 rounded-sm border border-orange-200 flex items-center gap-1">
                                    <FaTag size={8} /> {inq.product}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3 align-top">
                            <select
                              value={inq.status || 'New'}
                              onChange={(e) => handleStatusChange(inqId, e.target.value)}
                              disabled={updatingInquiryId === inqId}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-sm border outline-none cursor-pointer ${
                                inq.status === 'New'
                                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                                  : inq.status === 'Contacted'
                                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              }`}
                            >
                              <option value="New">🟡 New</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Resolved">🟢 Resolved</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 align-top text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-brand-navy hover:text-white rounded-sm text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                title="View full message"
                              >
                                <FaEye size={11} /> View
                              </button>

                              <button
                                onClick={() => handleDeleteInquiry(inqId)}
                                disabled={deletingId === inqId}
                                className="p-1.5 text-red-400 hover:text-red-600 disabled:opacity-40 cursor-pointer ml-1"
                                title="Delete inquiry record"
                              >
                                {deletingId === inqId ? <FaSpinner className="animate-spin" size={12} /> : <FaTrash size={12} />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                    <th className="text-left px-4 py-3 font-bold">Product</th>
                    <th className="text-left px-4 py-3 font-bold">Model</th>
                    <th className="text-left px-4 py-3 font-bold hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-bold hidden lg:table-cell">Slug ID</th>
                    <th className="text-right px-4 py-3 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-slate-400 text-xs">
                        <FaBoxOpen className="mx-auto mb-2" size={20} /> No products in database yet.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-sm flex items-center justify-center overflow-hidden shrink-0">
                              {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.name} className="object-contain max-h-full max-w-full" />
                              ) : (
                                <FaBoxOpen className="text-slate-300" size={14} />
                              )}
                            </div>
                            <span className="font-bold text-brand-navy text-xs">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 font-bold">{product.model}</td>
                        <td className="px-4 py-3 text-xs text-slate-500 hidden md:table-cell">{product.category}</td>
                        <td className="px-4 py-3 text-[10px] text-slate-400 font-mono hidden lg:table-cell">{product.id}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditModal(product)}
                              className="text-brand-blue hover:text-brand-navy cursor-pointer p-2"
                              title="Edit product"
                            >
                              <FaPen size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              disabled={deletingId === product.id}
                              className="text-red-400 hover:text-red-600 disabled:opacity-40 cursor-pointer p-2"
                              title="Delete product"
                            >
                              {deletingId === product.id ? <FaSpinner className="animate-spin" size={12} /> : <FaTrash size={12} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Modal: View Full Inquiry Details */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-sm shadow-xl max-w-xl w-full p-6 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <FaTimes size={16} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                {selectedInquiry.type || 'Customer Form Submission'}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                  selectedInquiry.status === 'New'
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : selectedInquiry.status === 'Contacted'
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                }`}
              >
                Status: {selectedInquiry.status}
              </span>
            </div>

            <h3 className="text-lg font-black text-brand-navy leading-snug">{selectedInquiry.subject || 'Form Inquiry Details'}</h3>
            <p className="text-[11px] text-slate-400 mt-1 mb-5">
              Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}
            </p>

            <div className="space-y-3 bg-slate-50 p-4 border border-slate-200 rounded-sm text-xs mb-5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Customer Name</span>
                  <span className="font-bold text-brand-navy">{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Company</span>
                  <span className="font-bold text-slate-700">{selectedInquiry.company || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-brand-blue hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-slate-700 hover:underline">
                    {selectedInquiry.phone || 'N/A'}
                  </a>
                </div>
              </div>

              {selectedInquiry.product && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Requested Product</span>
                  <span className="font-bold text-brand-orange">{selectedInquiry.product}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Inquiry / Message Text:</span>
              <div className="p-4 bg-slate-100 border border-slate-200 rounded-sm text-xs text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {selectedInquiry.message || 'No additional message body submitted.'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=RE: ${encodeURIComponent(selectedInquiry.subject || 'Chem-X Inquiry')}`}
                  className="px-3 py-1.5 bg-brand-navy text-white text-xs font-bold rounded-sm hover:bg-brand-navy/90 flex items-center gap-1.5"
                >
                  <FaEnvelope size={11} /> Reply via Email
                </a>
                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-bold rounded-sm hover:bg-slate-300 flex items-center gap-1.5"
                  >
                    <FaPhone size={11} /> Call
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold rounded-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product popup */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
        onSubmitProduct={handleSaveProduct}
        categories={[...new Set(products.map((p) => p.category))]}
        serverError={serverError}
        product={editingProduct}
      />
    </div>
  );
}
