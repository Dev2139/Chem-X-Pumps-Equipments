import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import fallbackData from '../data/products.json';

const ProductsContext = createContext(null);

// Loads the catalog from the MongoDB-backed API (/api/products).
// Falls back to the bundled products.json if the backend is unreachable,
// so the public site keeps working even without the API server.
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(fallbackData.products);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('local'); // 'db' | 'local'

  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`API responded ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
        setSource('db');
      }
    } catch {
      // Keep the local JSON fallback silently
      setSource('local');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  return (
    <ProductsContext.Provider value={{ products, loading, source, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
