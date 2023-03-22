<script lang="ts">
	import type { Validation } from 'sveltekit-superforms';
	import { superForm, type FormOptions } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	export let data: string | Validation<AnyZodObject, any> | null | undefined;
	export let options: FormOptions<AnyZodObject, any>;

	const { form, constraints, enhance, delayed } = superForm(data, options);
</script>

<slot {form} {constraints} {enhance} {delayed} />
