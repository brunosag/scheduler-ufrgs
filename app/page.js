'use client';

import { AppContext } from '@/components/app-context';
import Landing from '@/components/landing';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
  const { loading, setLoading, setLoadingMessage, selectedCurso, setSelectedCurso } = useContext(AppContext);
  const [cursos, setCursos] = useState([]);

  async function fetchCursos() {
    setLoadingMessage('Carregando cursos');

    const response = await fetch('/api/cursos');
    const data = await response.json();
    setCursos(data);
    setLoading(false);
  }

  useEffect(() => {
    const storedSelectedCursoId = JSON.parse(localStorage.getItem('selected_curso'));
    if (storedSelectedCursoId) {
      setSelectedCurso(storedSelectedCursoId);
    }

    const storedCursos = JSON.parse(localStorage.getItem('cursos'));
    if (!storedCursos || storedCursos.expires < Date.now()) {
      fetchCursos();
    } else {
      setCursos(storedCursos);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedCurso !== null) {
      localStorage.setItem('selected_curso', JSON.stringify(selectedCurso));
    }
  }, [selectedCurso]);

  useEffect(() => {
    if (cursos?.data?.length > 0) {
      localStorage.setItem('cursos', JSON.stringify(cursos));
    }
  }, [cursos]);

  if (!selectedCurso || loading) {
    return <Landing cursos={cursos} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1 className="text-3xl font-bold">{selectedCurso}</h1>
    </div>
  );
}
