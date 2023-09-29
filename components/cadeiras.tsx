'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import AddCadeira from './add-cadeira';

export default function Cadeiras() {
	const [cadeiras, setCadeiras] = useState<string[]>(() => {
		const storageCadeiras = localStorage.getItem('cadeiras');
		return storageCadeiras ? JSON.parse(storageCadeiras) : [];
	});

	useEffect(() => {
		localStorage.setItem('cadeiras', JSON.stringify(cadeiras));
	}, [cadeiras]);

	function handleDelete(cadeira: string) {
		const filteredCadeiras = cadeiras.filter((item) => item !== cadeira);
		setCadeiras(filteredCadeiras);
	}

	return (
		<Card>
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
								className="w-4 h-4 text-muted-foreground hover:text-primary-foreground transition-colors"
								onClick={() => handleDelete(cadeira)}
							/>
						</span>
					))}
					<AddCadeira cadeiras={cadeiras} setCadeiras={setCadeiras} />
				</div>
			</CardContent>
		</Card>
	);
}
