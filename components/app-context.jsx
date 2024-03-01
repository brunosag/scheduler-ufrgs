'use client';

import { getCursos } from '@/lib/data';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

export default function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [cursos, setCursos] = useState([]);

  async function fetchCursos() {
    const fetchedCursos = await getCursos();
    setCursos(fetchedCursos);
    setLoading(false);
  }

  useEffect(() => {
    const storedSelectedCurso = JSON.parse(localStorage.getItem('selected_curso'));
    if (storedSelectedCurso) {
      setSelectedCurso(storedSelectedCurso);
    }

    fetchCursos();
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
        cursos,
        setCursos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
