import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isHireModalOpen: boolean;
  openHireModal: () => void;
  closeHireModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  const openHireModal = () => setIsHireModalOpen(true);
  const closeHireModal = () => setIsHireModalOpen(false);

  return (
    <UIContext.Provider value={{ isHireModalOpen, openHireModal, closeHireModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
};
