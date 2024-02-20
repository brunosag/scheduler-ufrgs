'use client';

import { NextUIProvider } from '@nextui-org/react';
import AppProvider from '@/components/app-context';

export default function Providers({ children }) {
  return (
    <NextUIProvider>
      <AppProvider>{children}</AppProvider>
    </NextUIProvider>
  );
}
