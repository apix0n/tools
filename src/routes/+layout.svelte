<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import { page } from "$app/state";

    if (page.error !== null) {
        page.data.footer = page.data.header = false
    }
</script>

<svelte:head>
    <title>{page.data?.title ? page.data.title + " | " : ""}apix tools</title>
</svelte:head>

<div class="layout">
    {#if page.data.header !== false}
        <Header />
    {/if}

    <slot />

    {#if page.data.footer !== false}
        <Footer />
    {/if}
</div>

<style>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>