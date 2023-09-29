import { Button } from './ui/button';
import { CheckIcon } from 'lucide-react';
import { Dispatch, SetStateAction, FC, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from './ui/input';
import { PlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface IProps {
	cadeiras: string[];
	setCadeiras: Dispatch<SetStateAction<string[]>>;
}

const AddCadeira: FC<IProps> = ({ cadeiras, setCadeiras }) => {
	const [open, setOpen] = useState<boolean>(false);

	const formSchema = z.object({
		name: z
			.string()
			.min(1, 'Nome da cadeira não pode ser vazio.')
			.max(16)
			.refine((name) => !cadeiras.includes(name.toUpperCase()), 'Cadeira já existe.'),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { name: '' },
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setOpen(false);
		setCadeiras([...cadeiras, values.name.toUpperCase()].toSorted());
		form.reset();
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="flex gap-1">
					<PlusIcon className="w-4 h-4" />
					Adicionar
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Nome da cadeira"
											maxLength={16}
											className="h-9 uppercase placeholder:normal-case"
											{...field}
										/>
									</FormControl>
									<FormMessage className="!mt-3" />
								</FormItem>
							)}
						/>
						<Button size="icon" type="submit" className="h-9 aspect-square">
							<CheckIcon className="w-4 h-4" />
						</Button>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
};

export default AddCadeira;