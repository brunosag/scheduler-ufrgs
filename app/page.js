'use client';

import { AppContext } from '@/components/app-context';
import { useContext, useEffect, useState } from 'react';
import Landing from '@/components/landing';
import { getCursos } from '@/lib/data';

export default function Home() {
  const { loading, setLoading, selectedCurso } = useContext(AppContext);
  const [cursos, setCursos] = useState([]);

  async function fetchCursos() {
    const fetchedCursos = await getCursos();
		setCursos(fetchedCursos);
		setLoading(false);
  }

  useEffect(() => {
    fetchCursos();
  }, []);

	if (!selectedCurso || loading) {
    return <Landing cursos={cursos} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-5">
      <h1 className="text-3xl font-bold">{selectedCurso}</h1>
    </div>
  );
}
