'use client';

import { AppContext } from './app-context';
import { Button, Tooltip } from '@nextui-org/react';
import { CheckIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import LogoIcon from './logo-icon';
import SelectCurso from './select-curso';

export default function Landing({ cursos }) {
  const { setSelectedCurso } = useContext(AppContext);
  const [value, setValue] = useState(null);

  return (
    <div className="flex flex-col grow items-center justify-center gap-2">
      <LogoIcon className="w-16 h-16 mb-3" />
      <h1 className="text-5xl font-bold">Bem-vindo ao scheduler-ufrgs!</h1>
      <h2 className="text-xl font-light text-foreground/80">Selecione um curso para começar.</h2>
      <div className="flex items-center gap-3 mt-16">
        <SelectCurso value={value} setValue={setValue} cursos={cursos} />
        {value && (
          <Tooltip content="Confirmar">
            <Button
              isIconOnly
              radius="full"
              aria-label="Confirmar"
              className="bg-foreground text-background"
              onPress={() => setSelectedCurso(value)}
            >
              <CheckIcon className="w-5 h-5" strokeWidth={2} />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
