'use client';

import { AppContext } from '@/components/app-context';
import { getCadeiras } from '@/lib/data';
import { useContext, useEffect, useState } from 'react';
import Landing from '@/components/landing';

export default function Home() {
  const { setLoading, selectedCurso, cursos } = useContext(AppContext);
  const [cadeiras, setCadeiras] = useState([]);

  async function fetchCadeiras() {
    setLoading(true);
    const fetchedCadeiras = await getCadeiras(selectedCurso);
    setCadeiras(fetchedCadeiras);
    setLoading(false);
  }

  useEffect(() => {
    if (selectedCurso) {
      fetchCadeiras();
    }
  }, [selectedCurso]);

  if (!selectedCurso) {
    return <Landing cursos={cursos} />;
  }

  return (
    <div className="container flex flex-col grow items-center justify-center p-8 gap-5">
      <h1 className="text-3xl font-bold">{selectedCurso}</h1>
      <div className="flex flex-col gap-1">
        {cadeiras.map((cadeira, index) => (
          <p key={index} className="text-xl font-light">
            {cadeira.name}
          </p>
        ))}
      </div>
    </div>
  );
}
