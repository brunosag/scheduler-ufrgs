import { Button } from './ui/button';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataContext, DataContextType } from '@/context/data-context';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from './ui/input';
import { PlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function AddTurma() {
	const [open, setOpen] = useState<boolean>(false);
	const { horarios, dias, cadeiras, turmas, setTurmas, updateSelectedTurma } = useContext(
		DataContext
	) as DataContextType;

	const formSchema = z
		.object({
			cadeira: z.string({ required_error: 'Selecione uma cadeira.' }).default(cadeiras[0]?.name),
			turma: z.string({ required_error: 'Insira uma turma.' }),
			horario: z.string().default(horarios[0].start),
			dias: z
				.array(z.string(), { required_error: 'Selecione pelo menos um dia.' })
				.min(1, 'Selecione pelo menos um dia.'),
		})
		.refine(
			(data) =>
				!turmas.some((item) => item.cadeira == data.cadeira.toUpperCase() && item.turma == data.turma.toUpperCase()),
			{ message: 'Turma já existe para essa cadeira.', path: ['dias'] }
		);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setOpen(false);
		const newTurmas = [...turmas, { ...values, turma: values.turma.toUpperCase() }].toSorted(
			(a, b) => a.cadeira.localeCompare(b.cadeira) || a.turma.localeCompare(b.turma)
		);
		setTurmas(newTurmas);
		if (!cadeiras.find((item) => item.name === values.cadeira)?.selectedTurma) {
			updateSelectedTurma(values.cadeira, newTurmas);
		}
		form.resetField('turma');
		form.resetField('dias');
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="flex gap-1 mt-6">
					<PlusIcon className="w-4 h-4" />
					Adicionar
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="cadeira"
							render={({ field }) => (
								<FormItem>
									<Select onValueChange={field.onChange} defaultValue={cadeiras[0]?.name} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecionar cadeira..." />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{cadeiras.length > 0 ? (
												cadeiras.map((cadeira) => (
													<SelectItem key={cadeira.name} value={cadeira.name} className="cursor-pointer">
														{cadeira.name}
													</SelectItem>
												))
											) : (
												<div className="text-muted text-sm flex justify-center py-5">Nenhuma cadeira adicionada.</div>
											)}
										</SelectContent>
										<FormMessage />
									</Select>
								</FormItem>
							)}
						/>

						<div className="flex gap-2">
							<FormField
								control={form.control}
								name="turma"
								render={({ field }) => (
									<FormItem className="basis-1/3">
										<FormControl>
											<Input
												placeholder="Turma"
												maxLength={3}
												className="h-9 uppercase placeholder:normal-case"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="horario"
								render={({ field }) => (
									<FormItem className="basis-2/3">
										<Select onValueChange={field.onChange} defaultValue={horarios[0].start} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Horário" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{horarios.map((horario) => (
													<SelectItem key={horario.start} value={horario.start} className="cursor-pointer">
														{horario.start} <span className="text-foreground/40">-</span> {horario.end}
													</SelectItem>
												))}
											</SelectContent>
											<FormMessage />
										</Select>
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="dias"
							render={() => (
								<FormItem>
									<div className="flex">
										{dias.map((dia) => (
											<FormField
												key={dia}
												control={form.control}
												name="dias"
												render={({ field }) => {
													return (
														<FormItem key={dia} className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Button
																	size="icon"
																	type="button"
																	variant={field.value?.includes(dia) ? 'default' : 'outline'}
																	className={cn(
																		dia === 'Segunda' ? 'rounded-l-md' : 'rounded-l-none',
																		dia === 'Sexta' ? 'rounded-r-md' : 'rounded-r-none'
																	)}
																	onClick={() => {
																		if (field.value) {
																			field.value.includes(dia)
																				? field.onChange(field.value.filter((item) => item !== dia))
																				: field.onChange([...field.value, dia]);
																		} else {
																			field.onChange([dia]);
																		}
																	}}
																>
																	{dia[0]}
																</Button>
															</FormControl>
														</FormItem>
													);
												}}
											/>
										))}
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button size="icon" type="submit" className="h-10 w-10 aspect-square ml-auto">
														<CheckIcon className="w-4 h-4" />
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Confirmar</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<FormMessage className="!mt-3" />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
