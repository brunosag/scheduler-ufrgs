'use client';

import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [selectedCurso, setSelectedCurso] = useState(null);

  useEffect(() => {
    const storedSelectedCurso = JSON.parse(localStorage.getItem('selected_curso'));
    if (storedSelectedCurso) {
      setSelectedCurso(storedSelectedCurso);
    }
  }, []);

  useEffect(() => {
    if (selectedCurso !== null) {
      localStorage.setItem('selected_curso', JSON.stringify(selectedCurso));
    }
  }, [selectedCurso]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        selectedCurso,
        setSelectedCurso,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
