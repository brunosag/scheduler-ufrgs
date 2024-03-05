<script lang="ts">
	import '@fontsource/inter';
	import '$src/app.css';
	import { cursos, selectedCurso } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Landing from '$components/landing.svelte';

	export let data;

	let ready = false;

	$: cursos.set(data.cursos);
	$: $selectedCurso && localStorage.setItem('selectedCurso', JSON.stringify($selectedCurso));

	onMount(() => {
		const storedSelectedCurso = JSON.parse(localStorage.getItem('selectedCurso') || 'null');
		if (storedSelectedCurso) {
			selectedCurso.set(storedSelectedCurso);
		}

		ready = true;
	});
</script>

<svelte:head>
	<title>scheduler-ufrgs</title>
</svelte:head>

{#if ready}
	<div transition:fade class="relative flex min-h-screen flex-col overflow-auto">
		{#if !$selectedCurso}
			<Landing />
		{:else}
			<slot />
		{/if}
	</div>
{/if}
