<script lang="ts">
  import { onMount } from 'svelte';

  let initialLoad = true;
  let count = 0;

  onMount(async () => {
    const response = await fetch(import.meta.env.VITE_APP_API_URL);
    count = await response.text();
    initialLoad = false;
  });

  async function handleClick() {
    const response = await fetch(import.meta.env.VITE_APP_API_URL, {
      method: 'POST',
    });
    count = await response.text();
  }
</script>

<button disabled={initialLoad} on:click={handleClick}>{initialLoad ? 'Loading' : count} clicks!</button>

