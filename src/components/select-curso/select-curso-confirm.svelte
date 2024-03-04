<script lang="ts">
	import { Button } from '$components/ui/button';
	import { createEventDispatcher } from 'svelte';
	import * as Tooltip from '$components/ui/tooltip';
	import CheckIcon from 'lucide-svelte/icons/check';

	const dispatch = createEventDispatcher();
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button size="icon" builders={[builder]} class="shrink-0" on:click={() => dispatch('confirm')}>
			<CheckIcon class="h-4 w-4" />
		</Button>
	</Tooltip.Trigger>

	<Tooltip.Content>
		<p>Confirmar</p>
	</Tooltip.Content>
</Tooltip.Root>
