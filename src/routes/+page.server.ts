import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

// See https://zod.dev/?id=primitives for schema syntax
const schema = z.object({
	name: z.string().default('Hello world!'), // A default value just to show something
	email: z.string().email()
});

export const load: PageServerLoad = async (event) => {
	// Server API:
	const form = await superValidate(event, schema);

	// Always return { form } in load and form actions.
	return { form };
};
