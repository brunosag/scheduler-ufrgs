'use client';

import { AppContext } from '@/components/app-context';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { useContext } from 'react';
import LogoIcon from '@/components/logo-icon';

export default function Loading() {
  const { loading, loadingMessage } = useContext(AppContext);

  return (
    <div
      className={cn(
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'fixed inset-0 bg-background w-screen h-screen flex flex-col gap-7 items-center justify-center transition-opacity !duration-300 z-50'
      )}
    >
      <LogoIcon className="h-20 w-20" />
      <div className="animate-pulse flex flex-col gap-2 items-center">
        <Loader2Icon className="animate-spin w-4 h-4 text-foreground" />
        <p className="font-extralight text-lg">{loadingMessage}</p>
      </div>
    </div>
  );
}
