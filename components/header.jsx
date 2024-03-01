'use client';

import { AppContext } from './app-context';
import { useContext } from 'react';
import LogoIcon from './logo-icon';
import SelectCurso from './select-curso';

export default function Header() {
  const { selectedCurso, setSelectedCurso, cursos } = useContext(AppContext);

  if (!selectedCurso) {
    return null;
  }

  return (
    <header className="flex items-center justify-between container py-5 px-8">
      <div className="flex items-center gap-2">
        <LogoIcon className="w-8 h-8" />
        <h1 className="text-lg font-bold hidden md:block">scheduler-ufrgs</h1>
      </div>
      <SelectCurso size="sm" value={selectedCurso} setValue={setSelectedCurso} cursos={cursos} />
    </header>
  );
}
