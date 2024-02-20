'use client';

import { AppContext } from './app-context';
import { Autocomplete, AutocompleteItem, Button, Tooltip } from '@nextui-org/react';
import { CheckIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import LogoIcon from './logo-icon';

export default function Landing({ cursos }) {
  const { setSelectedCurso, setLoading, setLoadingMessage } = useContext(AppContext);
  const [value, setValue] = useState(null);

  function handlePress() {
    setSelectedCurso(value);
    setLoadingMessage('Carregando horários');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-2">
      <LogoIcon className="w-16 h-16 mb-3" />
      <h1 className="text-5xl font-bold">Bem-vindo ao scheduler-ufrgs!</h1>
      <h2 className="text-xl font-light text-foreground/80">Selecione um curso para começar.</h2>
      <div className="flex items-center gap-3 mt-16">
        <Autocomplete
          radius="full"
          variant="bordered"
          placeholder="Selecione seu curso"
          className="max-w-md"
          inputProps={{ classNames: { inputWrapper: 'h-12 px-5' } }}
          selectedKey={value}
          onSelectionChange={setValue}
        >
          {cursos.map((curso) => (
            <AutocompleteItem key={curso.id} value={curso.id}>
              {curso.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        {value && (
          <Tooltip content="Confirmar">
            <Button
              isIconOnly
              radius="full"
              aria-label="Confirmar"
              className="bg-foreground text-background"
              onPress={handlePress}
            >
              <CheckIcon className="w-5 h-5" strokeWidth={2} />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
