<script lang="ts">
	import LogoIcon from '$components/logo-icon.svelte';
	import SelectCurso from '$components/select-curso';
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="absolute flex w-full flex-col items-center gap-10">
	<div class="relative">
		<LogoIcon class="absolute inset-0 h-16 w-16" />
		<LogoIcon class="h-16 w-16 select-none opacity-50 blur-lg" />
	</div>
	<SelectCurso />
</div>
