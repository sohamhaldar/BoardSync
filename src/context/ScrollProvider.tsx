// app/ScrollContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ScrollContextType = {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop(); // Scroll to top on initial load
  }, []);

  return (
    <ScrollContext.Provider value={{ activeSection, scrollToSection, scrollToTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};