<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { selectedCurso } from '$lib/stores';
	import Landing from '$components/landing.svelte';

	let ready = false;

	$: $selectedCurso && localStorage.setItem('selectedCurso', JSON.stringify($selectedCurso));

	onMount(() => {
		const storedSelectedCurso = JSON.parse(localStorage.getItem('selectedCurso') || 'null');
		if (storedSelectedCurso) {
			selectedCurso.set(storedSelectedCurso);
		}

		ready = true;
	});
</script>

{#if ready}
	<div transition:fade class="flex max-w-full grow items-center justify-center">
		{#if !$selectedCurso}
			<Landing />
		{:else}
			<div transition:fade class="space-x-4 text-2xl">
				<span class="font-extralight">{$selectedCurso?.nome}</span>
				<span class="font-semibold">{$selectedCurso?.value}</span>
			</div>
		{/if}
	</div>
{/if}
