'use client';

import { createContext, ReactNode, useState } from 'react';

export type Cadeira = {
	name: string;
	selectedTurma: string | undefined;
};

export type Turma = {
	cadeira: string;
	turma: string;
	horario: string;
	dias: string[];
};

const horarios: { start: string; end: string }[] = [
	{ start: '08:30', end: '10:10' },
	{ start: '10:30', end: '12:10' },
	{ start: '13:30', end: '15:10' },
	{ start: '15:30', end: '17:10' },
	{ start: '18:30', end: '20:10' },
	{ start: '20:30', end: '22:10' },
];

const dias: Turma['dias'] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

export type DataContextType = {
	horarios: typeof horarios;
	dias: typeof dias;
	cadeiras: Cadeira[];
	setCadeiras: (caderias: Cadeira[]) => void;
	turmas: Turma[];
	setTurmas: (turmas: Turma[]) => void;
	showOnlySelected: boolean,
	setShowOnlySelected: (showOnlySelected: boolean) => void;
	updateSelectedTurma: (cadeiraName: string, turmas: Turma[]) => void;
};

export const DataContext = createContext<DataContextType | null>(null);

export default function DataProvider({ children }: { children: ReactNode }) {
	const [cadeiras, setCadeiras] = useState<Cadeira[]>(() => {
		const storageCadeiras = localStorage.getItem('cadeiras');
		return storageCadeiras ? JSON.parse(storageCadeiras) : [];
	});
	const [turmas, setTurmas] = useState<Turma[]>(() => {
		const storageTurmas = localStorage.getItem('turmas');
		return storageTurmas ? JSON.parse(storageTurmas) : [];
	});
	const [showOnlySelected, setShowOnlySelected] = useState<boolean>(() => {
		const storageShowOnlySelected = localStorage.getItem('showOnlySelected');
		return storageShowOnlySelected ? JSON.parse(storageShowOnlySelected) : false;
	});

	const updateSelectedTurma = (cadeiraName: string, turmas: Turma[]) => {
		const updatedCadeiras: Cadeira[] = cadeiras.map((item) => {
			if (item.name === cadeiraName) {
				const newSelectedTurma = turmas.find((turma) => turma.cadeira === item.name)?.turma;
				return { name: item.name, selectedTurma: newSelectedTurma };
			} else {
				return item;
			}
		});
		setCadeiras(updatedCadeiras);
	};

	return (
		<DataContext.Provider
			value={{
				horarios,
				dias,
				cadeiras,
				setCadeiras,
				turmas,
				setTurmas,
				showOnlySelected,
				setShowOnlySelected,
				updateSelectedTurma,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}
