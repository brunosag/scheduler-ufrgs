'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { DataContext, DataContextType, Turma } from '@/context/data-context';
import { DownloadIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useContext, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Grade({ className }: { className?: string }) {
	const { horarios, dias, cadeiras, setCadeiras, turmas, showOnlySelected, setShowOnlySelected } = useContext(
		DataContext
	) as DataContextType;

	const tableRef = useRef<HTMLTableElement | null>(null);
	const { theme } = useTheme();

	function isSelected(turma: string, cadeira: string): boolean {
		return cadeiras.find((item) => item.name === cadeira)?.selectedTurma === turma;
	}

	function selectTurma(turma: Turma) {
		const newCadeiras = cadeiras.map((item) =>
			item.name === turma.cadeira ? { name: item.name, selectedTurma: turma.turma } : item
		);
		setCadeiras(newCadeiras);
	}

	function exportAsJPEG() {
		if (typeof window !== 'undefined') {
			import('react-component-export-image').then(({ exportComponentAsJPEG }) => {
				tableRef.current?.classList.add('w-[1280px]', 'h-[320px]');
				exportComponentAsJPEG(tableRef, {
					fileName: 'horarios',
					html2CanvasOptions: { backgroundColor: theme === 'dark' ? '#09090b' : '#fff' },
				});
				tableRef.current?.classList.remove('w-[1280px]', 'h-[320px]');
			});
		}
	}

	useEffect(() => {
		localStorage.setItem('showOnlySelected', JSON.stringify(showOnlySelected));
	}, [showOnlySelected]);

	return (
		<Card className={cn('', className)}>
			<CardHeader className="lg:flex-row justify-between lg:items-end gap-6">
				<div className="flex flex-col gap-1.5">
					<CardTitle className="inline-block">Grade de Horários</CardTitle>
					<CardDescription className="inline-block">Alterne turmas até encontrar o horário ideal.</CardDescription>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						id="show-only-selected"
						checked={showOnlySelected}
						onCheckedChange={(checkedState) =>
							setShowOnlySelected(typeof checkedState === 'boolean' ? checkedState : showOnlySelected)
						}
					/>
					<label
						htmlFor="show-only-selected"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
					>
						Mostrar apenas selecionados
					</label>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col items-end gap-6">
				<Table ref={tableRef}>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead />
							{dias.map((dia) => (
								<TableHead className="text-center border-l" key={dia}>
									{dia}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{horarios.map((horario) => (
							<TableRow key={horario.start} className="hover:bg-transparent">
								<TableCell className="whitespace-nowrap text-muted-foreground text-center font-medium">
									{horario.start} <span className="text-muted-foreground/50">-</span> {horario.end}
								</TableCell>
								{dias.map((dia) => (
									<TableCell key={dia} className="border-l">
										<div className="flex flex-col items-center gap-1.5">
											{turmas.map(
												(turma) =>
													!(showOnlySelected && !isSelected(turma.turma, turma.cadeira)) &&
													turma.dias.includes(dia) &&
													turma.horario === horario.start && (
														<span
															role="button"
															key={`${turma.cadeira}-${turma.turma}`}
															className={cn(
																isSelected(turma.turma, turma.cadeira) ? '' : 'opacity-25',
																'flex items-center gap-1.5'
															)}
															onClick={() => selectTurma(turma)}
														>
															{turma.cadeira}
															<Badge
																variant="secondary"
																className="rounded-full h-[1.25rem] px-[4.7px] flex justify-center text-foreground/70"
															>
																{turma.turma}
															</Badge>
														</span>
													)
											)}
										</div>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<span
					role="button"
					className="text-sm font-medium hover:opacity-60 transition-opacity flex gap-2 items-center"
					onClick={exportAsJPEG}
				>
					<DownloadIcon className="w-4 h-4" />
					Salvar como JPEG
				</span>
			</CardContent>
		</Card>
	);
}
