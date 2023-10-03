'use client';

import { Cadeira, DataContext, DataContextType } from '@/context/data-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useContext, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import AddCadeira from './add-cadeira';

export default function Cadeiras({ className }: { className?: string }) {
	const { cadeiras, setCadeiras, localStorageReady } = useContext(DataContext) as DataContextType;

	useEffect(() => {
		localStorageReady && localStorage.setItem('cadeiras', JSON.stringify(cadeiras));
	}, [cadeiras, localStorageReady]);

	function handleDelete(cadeira: Cadeira) {
		const filteredCadeiras = cadeiras.filter((item) => item !== cadeira);
		setCadeiras(filteredCadeiras);
	}

	return (
		<Card className={cn('', className)}>
			<CardHeader>
				<CardTitle>Cadeiras</CardTitle>
				<CardDescription>Adicione as cadeiras que pretende fazer.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 flex-wrap">
					{cadeiras.map((cadeira) => (
						<span
							key={cadeira.name}
							className="inline-flex bg-primary text-primary-foreground font-medium items-center rounded-md px-3 py-2 text-sm gap-3 select-none"
						>
							{cadeira.name}
							<XIcon
								role="button"
								className="w-4 h-4 text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors"
								onClick={() => handleDelete(cadeira)}
							/>
						</span>
					))}
					<AddCadeira />
				</div>
			</CardContent>
		</Card>
	);
}
