<script lang="ts">
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms/client';

  export let data: PageData;

  // Client API:
  const { form } = superForm(data.form);
</script>

<h1>sveltekit-superforms</h1>

<form method="POST">
  <label for="name">Name</label>
  <input type="text" name="name" bind:value={$form.name} />

  <label for="email">E-mail</label>
  <input type="text" name="email" bind:value={$form.email} />

  <div><button>Submit</button></div>
</form>