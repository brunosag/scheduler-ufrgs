import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'scheduler-ufrgs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Loading />
          {children}
        </Providers>
      </body>
    </html>
  );
}
