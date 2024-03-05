<script lang="ts">
	import { Header } from '$components/header';
	import { selectedCurso } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="mx-auto flex w-fit min-w-full max-w-[1500px] grow flex-col">
	<Header />
	<div class="flex grow items-center justify-center gap-4 px-10 pb-8 text-lg/[1] md:text-2xl/[1]">
		<span class="font-extralight">{$selectedCurso?.nome}</span>
		<span class="font-semibold">{$selectedCurso?.value}</span>
	</div>
</div>
