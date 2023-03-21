import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

// See https://zod.dev/?id=primitives for schema syntax
const schema = z.object({
	name: z.string().min(13).default('Hello world!'), // A default value just to show something
	email: z.string().email().default('test@test.com'),
  date: z.date(),
  age: z.number()
});

export const load = (async (event) => {
	// Server API:
	const form = await superValidate(event, schema);
  
	// Always return { form } in load and form actions.
	return { form };
  }) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    await new Promise(res => setTimeout(res, 2000))
    // Same syntax as in the load function
    const form = await superValidate(event, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated data

    // Yep, return { form } here too
    return { form };
  }
} satisfies Actions;