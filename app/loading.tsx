'use client';

import { cn } from '@/lib/utils';
import { DataContext, DataContextType } from '@/context/data-context';
import { Loader2Icon } from 'lucide-react';
import { useContext } from 'react';
import LogoIcon from '@/components/logo-icon';

export default function Loading() {
	const { localStorageReady } = useContext(DataContext) as DataContextType;

	return (
		<div
			className={cn(
				'w-full h-full fixed z-50 flex flex-col gap-6 justify-center items-center bg-background top-0 left-0 transition-opacity',
				localStorageReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
			)}
		>
			<LogoIcon className="h-16	w-16" />
			<Loader2Icon className="animate-spin text-muted-foreground" />
		</div>
	);
}
