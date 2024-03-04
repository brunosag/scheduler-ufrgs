<script lang="ts">
	import { Button } from '$components/ui/button';
	import { cn } from '$lib/utils';
	import { cursos, selectedCurso as selectedCursoStore } from '$lib/stores';
	import { onMount, tick } from 'svelte';
	import * as Command from '$components/ui/command';
	import * as Popover from '$components/ui/popover';
	import CheckIcon from 'lucide-svelte/icons/check';
	import ChevronsIcon from 'lucide-svelte/icons/chevrons-up-down';
	import SelectCursoConfirm from './select-curso-confirm.svelte';

	const triggerId = 'curso-trigger';

	let open: boolean = false;
	let selectedCurso: Curso | undefined = undefined;
	let triggerWidth: number = 0;

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
		selectedCurso = selectedCurso?.value !== curso.value ? curso : undefined;
		closePopover();
	}

	function confirmSelection() {
		selectedCursoStore.set(selectedCurso);
	}
</script>

<div class="flex w-full min-w-72 max-w-[32rem] gap-2">
	<Popover.Root bind:open>
		<Popover.Trigger asChild let:builder>
			<Button
				id={triggerId}
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="flex w-full min-w-0 grow justify-between gap-2 px-5 py-3"
			>
				<span
					class={cn('w-full truncate text-left font-light', !selectedCurso && 'text-foreground/80')}
				>
					{selectedCurso?.nome || 'Selecione seu curso'}
				</span>
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

	{#if selectedCurso}
		<SelectCursoConfirm on:confirm={confirmSelection} />
	{/if}
</div>
