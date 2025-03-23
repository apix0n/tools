<script>
    import Header from "../components/Header.svelte";
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>{page.data?.title ? page.data.title + " | " : ""}apix tools</title>
</svelte:head>

<Header />
<slot />