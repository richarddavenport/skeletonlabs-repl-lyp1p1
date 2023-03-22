<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let label: string;
    export let action: string;

	$: console.log('$page.form', $page.form);
	const { form, enhance, delayed } = superForm($page.form, { id: 'another' });
</script>

<form method="POST" {action} class="w-[50%] m-auto space-y-2 mt-12" use:enhance>
	<label>
		{label}
		<input type="text" class="input" name="name" bind:value={$form.name} />
	</label>

	<div><button class="btn variant-filled-primary">Submit</button></div>
	<SuperDebug data={$form} />
	<SuperDebug data={{delayed: $delayed}} />
</form>
