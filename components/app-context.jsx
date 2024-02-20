'use client';

import { createContext, useState } from 'react';

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Inicializando');
  const [selectedCurso, setSelectedCurso] = useState(null);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        loadingMessage,
        setLoadingMessage,
        selectedCurso,
        setSelectedCurso,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
