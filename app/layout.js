import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'scheduler-ufrgs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
