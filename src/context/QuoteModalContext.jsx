import React, { createContext, useState, useContext } from 'react';
import QuoteModal from '../components/QuoteModal';

const QuoteModalContext = createContext();

export function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialProduct, setInitialProduct] = useState('');

  const openQuoteModal = (productName = '') => {
    setInitialProduct(productName);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setInitialProduct('');
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <QuoteModal 
        isOpen={isOpen} 
        onClose={closeQuoteModal} 
        initialProduct={initialProduct} 
      />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
}
