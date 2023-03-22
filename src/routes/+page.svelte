<script lang="ts">
	import { superForm, dateProxy, intProxy } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Form from './Form.svelte';

	export let data;

	// Client API:
	console.log("🚀 ~ file: +page.svelte:9 ~ data.defaultForm:", data.defaultForm)
	const { form, errors, constraints, enhance, delayed } = superForm(data.defaultForm, {
		taintedMessage: 'Do you want to leave this page? Changes you made may not be saved.',
		scrollToError: 'smooth', // 'smooth' | 'auto' | 'off' = 'smooth',
		autoFocusOnError: true, // boolean | 'detect' = 'detect',
		errorSelector: '[data-invalid]', // string | undefined = '[data-invalid]',
		// stickyNavbar: '' // string | undefined = undefined,
		onUpdated: ({ form }) => {
			console.log('onUpdated', form);
		},
		onUpdate: ({ form }) => {
			console.log('onUpdate', form);
		},
		dataType: 'json'
	});
	$: console.log("🚀 ~ file: +page.svelte:22 ~ form:", $form)

	const date = dateProxy(form, 'date', { format: 'datetime-local' });
	// const age = intProxy(form, 'age');
</script>

<h1>sveltekit-superforms</h1>

<form method="POST" action="?/first" class="w-[50%] m-auto space-y-2" use:enhance>
	<label>
		Name
		<input
			type="text"
			class="input"
			data-invalid={$errors.name}
			bind:value={$form.name}
			{...$constraints.name}
		/>
	</label>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

	<!-- <div class="h-[1000px]" /> -->
	<label>
		E-mail
		<input
			type="text"
			class="input"
			data-invalid={$errors.email}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<label>
		Date
		<input name="date" type="date" class="input" bind:value={$date} />
	</label>
	{#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}


	<label>
		Age
		<input class="input" type="number" bind:value={$form.age} />
	</label>

	<div><button class="btn variant-filled-primary">Submit</button></div>
	<SuperDebug data={$form} />
	<SuperDebug data={$errors} />
	<SuperDebug data={$delayed} />
</form>

<Form label="One" />

<style>
	.invalid {
		color: red;
	}
</style>
