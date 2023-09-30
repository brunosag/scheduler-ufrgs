'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DataContext, DataContextType } from '@/context/data-context';
import { useContext, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import AddCadeira from './add-cadeira';

export default function Cadeiras({ className }: { className: string }) {
	const { cadeiras, setCadeiras } = useContext(DataContext) as DataContextType;

	useEffect(() => {
		localStorage.setItem('cadeiras', JSON.stringify(cadeiras));
	}, [cadeiras]);

	function handleDelete(cadeira: string) {
		const filteredCadeiras = cadeiras.filter((item) => item !== cadeira);
		setCadeiras(filteredCadeiras);
	}

	return (
		<Card className={cn('', className)}>
			<CardHeader>
				<CardTitle>Cadeiras</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2 flex-wrap">
					{cadeiras.map((cadeira) => (
						<span
							key={cadeira}
							className="inline-flex bg-primary text-primary-foreground font-medium items-center rounded-md px-3 py-2 text-sm gap-3 select-none"
						>
							{cadeira}
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
