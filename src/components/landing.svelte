<script lang="ts">
	import LogoIcon from '$components/logo-icon.svelte';
	import { SelectCurso } from '$components/select-curso';
	import { fade } from 'svelte/transition';

	let contentHeight: number;
</script>

<div
	transition:fade
	class="absolute inset-0 flex h-full min-w-fit items-center"
	style={`min-height: ${contentHeight}px`}
>
	<div bind:clientHeight={contentHeight} class="flex w-full flex-col items-center gap-10 p-10">
		<div class="relative h-16 w-16">
			<LogoIcon class="absolute inset-0" />
			<LogoIcon class="opacity-50 blur-lg" />
		</div>
		<SelectCurso />
	</div>
</div>
