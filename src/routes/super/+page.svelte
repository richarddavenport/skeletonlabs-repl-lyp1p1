<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
        taintedMessage: "Are you sure you want to leave? Changes may not be saved!"
    });
</script>

<h1>sveltekit-superforms</h1>

<form method="POST" class="w-[50%] m-auto space-y-2" use:enhance>
	<label for="name">Name</label>
	<input
		type="text"
		name="nam"
        class="input"
		data-invalid={$errors.name}
		bind:value={$form.name}
		{...$constraints.name}
	/>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

	<label for="email">E-mail</label>
	<input
		type="text"
		name="email"
        class="input"
		data-invalid={$errors.email}
		bind:value={$form.email}
		{...$constraints.email}
	/>
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

	<div><button class="btn variant-ringed-primary">Submit</button></div>
	<SuperDebug data={$form} />
</form>

<style>
	.invalid {
		color: red;
	}
</style>
