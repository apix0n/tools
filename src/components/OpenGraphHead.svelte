<script>
    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    const defaultTitle = 'apix tools';
    const defaultDescription = "A set of web tools I created for things I needed to do at some point, and couldn't do easily.";

    export let title = null;
    export let description = null;

    const envBaseUrl = import.meta.env.VITE_BASE_URL || 'https://apixtools.vercel.app'; // Fallback if env is missing

    let currentUrl = browser ? new URL($page.url).origin : envBaseUrl;
    let image = `${currentUrl}/social.jpg`;

    $: actualTitle = title || defaultTitle;
    $: actualDescription = description || defaultDescription;
</script>

<svelte:head>
    <!-- Social (embed) properties -->
    <meta property="description" content={actualDescription} />
    <!-- Open Graph -->
    <meta property="og:title" content={actualTitle} />
    <meta property="og:description" content={actualDescription} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={currentUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="apix tools">
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={actualTitle} />
    <meta name="twitter:description" content={actualDescription} />
    <meta name="twitter:image" content={image} />
</svelte:head>