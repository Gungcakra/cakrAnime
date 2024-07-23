import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState();
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, view, setView }}>
      {children}
    </SearchContext.Provider>
  );
};
