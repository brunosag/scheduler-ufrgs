import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import DataProvider from '@/context/data-context';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Loading from './loading';
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
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<DataProvider>
						<Loading />
						<div className="flex flex-col h-screen">
							<Header />
							<div className="flex-1">{children}</div>
							<Footer />
						</div>
					</DataProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
