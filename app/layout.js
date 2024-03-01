import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/app/providers';
import Loading from './loading';
import Header from '@/components/header';

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
          <div className="min-h-screen h-fit flex flex-col items-center">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
