import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

export default function SelectCurso({ size, value, setValue, cursos }) {
  const sm = size === 'sm';

  return (
    <Autocomplete
      radius="full"
      variant="bordered"
      placeholder="Selecione seu curso"
      className={sm ? 'w-72' : 'w-96'}
      inputProps={{
        classNames: { inputWrapper: sm ? 'h-8 p-4' : 'h-12 p-5', input: sm && 'text-xs' },
      }}
      selectedKey={value}
      onSelectionChange={setValue}
    >
      {cursos.map((curso) => (
        <AutocompleteItem key={curso._id} value={curso._id} classNames={{ title: sm && 'text-xs' }}>
          {curso.nome}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
