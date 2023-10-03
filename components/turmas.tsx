'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DataContext, DataContextType, Turma } from '@/context/data-context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useContext, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import AddTurma from './add-turma';

export default function Turmas({ className }: { className?: string }) {
	const { horarios, dias, cadeiras, turmas, setTurmas, updateSelectedTurma, localStorageReady } = useContext(
		DataContext
	) as DataContextType;

	useEffect(() => {
		localStorageReady && localStorage.setItem('turmas', JSON.stringify(turmas));
	}, [turmas, localStorageReady]);

	function handleDelete(turma: Turma) {
		const newTurmas = turmas.filter((item) => item !== turma);
		setTurmas(newTurmas);
		if (turma.turma === cadeiras.find((item) => item.name === turma.cadeira)?.selectedTurma) {
			updateSelectedTurma(turma.cadeira, newTurmas);
		}
	}

	return (
		<Card className={cn('', className)}>
			<CardHeader>
				<CardTitle>Turmas</CardTitle>
				<CardDescription>Adicione as turmas disponíveis para matrícula.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead>Cadeira</TableHead>
							<TableHead>Turma</TableHead>
							<TableHead>Horário</TableHead>
							<TableHead>Dias</TableHead>
							<TableHead></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{turmas.map((turma) => (
							<TableRow key={`${turma.cadeira}-${turma.turma}`}>
								<TableCell className="py-2">{turma.cadeira}</TableCell>
								<TableCell className="py-2">{turma.turma}</TableCell>
								<TableCell className="py-2 whitespace-nowrap">
									{turma.horario} <span className="text-foreground/40">-</span>{' '}
									{horarios.find((item) => item.start === turma.horario)?.end}
								</TableCell>
								<TableCell className="py-2">
									<div className="flex gap-1">
										{dias.map((dia) => (
											<span
												key={dia}
												className={cn(
													'w-5 rounded-full flex justify-center select-none',
													turma.dias.includes(dia) ? 'bg-primary text-primary-foreground' : ''
												)}
											>
												{dia[0]}
											</span>
										))}
									</div>
								</TableCell>
								<TableCell className="py-2">
									<XIcon
										role="button"
										className="w-4 h-4 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
										onClick={() => handleDelete(turma)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<AddTurma />
			</CardContent>
		</Card>
	);
}
