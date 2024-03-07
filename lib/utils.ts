import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { Cadeira, Turma } from '@/context/data-context';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSelected({
  turma,
  cadeira,
  cadeiras,
}: {
  turma: string;
  cadeira: string;
  cadeiras: Cadeira[];
}): boolean {
  return cadeiras.find((item) => item.name === cadeira)?.selectedTurma === turma;
}

export function selectTurma({
  turma,
  cadeiras,
  setCadeiras,
}: {
  turma: Turma;
  cadeiras: Cadeira[];
  setCadeiras: (caderias: Cadeira[]) => void;
}) {
  const updatedCadeiras = cadeiras.map((item) => {
    if (item.name === turma.cadeira) {
      return {
        ...item,
        selectedTurma: item.selectedTurma === turma.turma ? null : turma.turma,
      };
    }
    return item;
  });
  setCadeiras(updatedCadeiras);
}
