<script lang="ts">
	import '@fontsource/inter';
	import '$src/app.css';
	import { cursos } from '$lib/stores';

	export let data;

	cursos.set(data.cursos);
</script>

<svelte:head>
	<title>scheduler-ufrgs</title>
</svelte:head>

<div class="container flex min-h-screen overflow-auto p-10">
	<slot />
</div>
