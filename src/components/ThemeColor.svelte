<script>
    import { page } from "$app/state";

    $: primary = page.data.headerPrimary || false
</script>

<svelte:head>
    {#if !primary}
        <meta name="theme-color" content="#222222" media="(prefers-color-scheme: dark)">
		<meta name="theme-color" content="#e0e0e0">
    {:else}
        <meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)">
		<meta name="theme-color" content="#f0f0f0">
    {/if}
</svelte:head>