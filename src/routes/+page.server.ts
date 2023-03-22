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

const anotherSchema = z.object({
	name: z.string().min(1, { message: "This is the message" })
});

export const load = (async (event) => {
	// Server API:
	const form = await superValidate(event, schema, { id: 'default' });
  console.log("🚀 ~ file: +page.server.ts:18 ~ load ~ form:", form)
  
	// Always return { form } in load and form actions.
	return { form };
  }) satisfies PageServerLoad;

export const actions = {
  first: async (event) => {
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
  },
  another: async (event) => {
    const form = await superValidate(event, anotherSchema, { id: 'another' });
    console.log('POST', form);
    await new Promise(res => setTimeout(res, 2000))
    if (!form.valid) {
      return fail(400, { form });
    }
    return { form };
  }
} satisfies Actions;