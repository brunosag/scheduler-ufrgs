import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'scheduler-ufrgs',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex flex-col h-screen">
					<Header />
					<div className="flex-1">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
