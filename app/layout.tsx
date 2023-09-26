import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Scheduler UFRGS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
