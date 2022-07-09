<script lang="ts">
  import { page } from '$app/stores';
  import CountButton from '$lib/components/CountButton.svelte';
</script>

<svelte:head>
  <title>Dynamic {$page.params.any}</title>
</svelte:head>

<h1>Dynamic {$page.params.any}</h1>

<CountButton />

