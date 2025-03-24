<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import { page } from "$app/state";
</script>

<svelte:head>
    <title>{page.data?.title ? page.data.title + " | " : ""}apix tools</title>
</svelte:head>

<div class="layout">
    {#if page.route.id !== "/"}
        <Header />
    {/if}

    <slot />

    {#if !page.route.id.startsWith("/time/")}
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