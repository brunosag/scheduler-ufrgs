<script lang="ts">
	import { Button } from '$components/ui/button';
	import { cn } from '$lib/utils';
	import { cursos, selectedCurso as selectedCursoStore } from '$lib/stores';
	import { onMount, tick } from 'svelte';
	import { SelectCursoConfirm } from '$components/select-curso';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import CheckIcon from 'lucide-svelte/icons/check';
	import ChevronsIcon from 'lucide-svelte/icons/chevrons-up-down';

	export let header: boolean = false;

	const triggerId = 'curso-trigger';

	let open: boolean = false;
	let selectedCurso: Curso | undefined = $selectedCursoStore;
	let triggerWidth: number;

	onMount(() => {
		observeTriggerWidth();
	});

	function observeTriggerWidth() {
		const observer = new ResizeObserver((entries) => {
			const entry = entries.find((entry) => entry.target.id === triggerId);
			if (entry) {
				const padding = getComputedStyle(entry.target).paddingLeft;
				triggerWidth = entry.contentRect.width + parseFloat(padding) * 2;
			}
		});
		const trigger = document.getElementById(triggerId);
		if (trigger) {
			observer.observe(trigger);
		}
	}

	function closePopover() {
		open = false;
		tick().then(() => {
			const trigger = document.getElementById(triggerId);
			if (trigger) {
				trigger.focus();
			}
		});
	}

	function selectCurso(curso: Curso) {
		if (header) {
			selectedCurso = curso;
			confirmSelection();
		} else {
			selectedCurso = selectedCurso?.value !== curso.value ? curso : undefined;
		}
		closePopover();
	}

	function confirmSelection() {
		selectedCursoStore.set(selectedCurso);
	}
</script>

<div class={cn('flex w-full min-w-72 max-w-[35rem] gap-2', header && 'min-w-64 max-w-[24rem]')}>
	<Popover.Root bind:open>
		<Popover.Trigger asChild let:builder>
			<Button
				id={triggerId}
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class={cn('flex min-w-0 grow justify-between gap-3 truncate px-5 py-3', header && 'py-2')}
			>
				<div class="relative h-5 grow text-left">
					<span
						class={cn(
							'absolute w-full truncate font-light',
							!selectedCurso && 'text-foreground/80'
						)}
					>
						{selectedCurso?.nome || 'Selecione seu curso'}
					</span>
				</div>
				<ChevronsIcon class="h-4 w-4 opacity-50" />
			</Button>
		</Popover.Trigger>

		<Popover.Content style="width: {triggerWidth}px">
			<Command.Root>
				<Command.Input placeholder="Buscar curso..." />
				<Command.Empty>Nenhum curso encontrado.</Command.Empty>

				<Command.List>
					<Command.Group>
						{#each $cursos as curso}
							<Command.Item value={curso.nome} onSelect={() => selectCurso(curso)}>
								<CheckIcon
									class={cn(
										'ml-0.5 mr-2 h-4 w-4 shrink-0',
										selectedCurso?.value !== curso.value && 'text-transparent'
									)}
								/>
								<div class="truncate font-light">{curso.nome}</div>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	{#if selectedCurso && !header}
		<SelectCursoConfirm on:confirm={confirmSelection} />
	{/if}
</div>
