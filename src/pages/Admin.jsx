import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaPlus, FaPen, FaTrash, FaSignOutAlt, FaDatabase, FaSpinner, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';
import SEO from '../components/SEO';
import ProductFormModal from '../components/admin/ProductFormModal';
import { useProducts } from '../context/ProductsContext';

const TOKEN_KEY = 'chemx_admin_token';

export default function Admin() {
  const { products, source, refreshProducts } = useProducts();
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = add mode
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState('');

  const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  };

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
  const handleDelete = async (product) => {
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

  // ---------- Login screen ----------
  if (!token) {
    return (
      <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <SEO title="Admin Login" description="Chem-X administration panel." noindex={true} />
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-sm shadow-sm p-8 text-left">
          <div className="w-12 h-12 bg-brand-navy rounded-sm flex items-center justify-center mb-5">
            <FaLock className="text-brand-orange" size={18} />
          </div>
          <h1 className="text-xl font-black text-brand-navy tracking-tight">Admin Panel</h1>
          <p className="text-xs text-slate-500 mt-1 mb-6">Enter the admin password to manage the product catalog.</p>

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
              {isSubmitting ? <FaSpinner className="animate-spin" size={12} /> : <FaLock size={10} />} Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-left">
      <SEO title="Admin Dashboard" description="Chem-X administration panel." noindex={true} />

      {/* Header */}
      <section className="bg-brand-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-orange uppercase tracking-widest block mb-1">Administration</span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">Product Management</h1>
            <p className="text-slate-300 text-xs mt-2 flex items-center gap-2">
              <FaDatabase size={10} className={source === 'db' ? 'text-green-400' : 'text-yellow-400'} />
              {source === 'db'
                ? `Connected to MongoDB — ${products.length} products in database`
                : 'Offline mode — showing local catalog. Start API with: npm run server'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-brand-orange/90 cursor-pointer flex items-center gap-2"
            >
              <FaPlus size={10} /> Add Product
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-white/10 cursor-pointer flex items-center gap-2"
            >
              <FaSignOutAlt size={10} /> Logout
            </button>
          </div>
        </div>
      </section>

      {/* Success banner */}
      {successMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-3 rounded-sm flex items-center gap-2">
            <FaCheckCircle size={12} /> {successMsg}
          </div>
        </div>
      )}

      {/* Products table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
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
                      <FaBoxOpen className="mx-auto mb-2" size={20} /> No products in the database yet. Click "Add Product" to create one.
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
                            disabled={source !== 'db'}
                            title={source !== 'db' ? 'Requires API server connection' : 'Edit product'}
                            className="text-brand-blue hover:text-brand-navy disabled:opacity-40 cursor-pointer p-2"
                          >
                            <FaPen size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product.id || source !== 'db'}
                            title={source !== 'db' ? 'Requires API server connection' : 'Delete product'}
                            className="text-red-400 hover:text-red-600 disabled:opacity-40 cursor-pointer p-2"
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
