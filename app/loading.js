'use client';

import { AppContext } from '@/components/app-context';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { useContext } from 'react';
import LogoIcon from '@/components/logo-icon';

export default function Loading() {
  const { loading } = useContext(AppContext);

  return (
    <div
      className={cn(
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none',
        'fixed inset-0 bg-background w-screen h-screen flex flex-col gap-5 items-center justify-center z-50'
      )}
    >
      <LogoIcon className="h-20 w-20" />
      <Loader2Icon className="animate-spin w-4 h-4" />
    </div>
  );
}
