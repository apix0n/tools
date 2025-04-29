<script>
    export let data;
    import { page } from "$app/state";
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";

    const baseUrl = page.url;
    
    const endpoints = [
        { method: 'all', path: '/headers' },
        { method: 'GET', path: '/ip' },
        { method: 'all', path: '/plain' },
        { method: 'GET', path: '/date/milliseconds' },
        { method: 'GET', path: '/date/iso' },
        { method: 'GET', path: '/ua' }
    ];

    const methodColors = {
        GET: '#61affe',
        POST: '#49cc90',
        PUT: '#fca130',
        DELETE: '#f93e3e',
        PATCH: '#50e3c2',
        all: '#ff69b4'
    };

    import { handleCopy } from "$lib/copy";
</script>

<Top title={data.title}>
    <span>Here are the available endpoints for the requests:</span>
</Top>

<Container>
    <div class="endpoints">
        {#each endpoints as endpoint}
            <div class="endpoint">
                <span 
                    class="method"
                    style="background-color: {methodColors[endpoint.method] || '#333'}">
                    {endpoint.method}
                </span>
                <code class="url">{baseUrl}{endpoint.path}</code>
                <button 
                    on:click={(e) => handleCopy(e, baseUrl + endpoint.path)}
                    class="copy-btn">
                    Copy
                </button>
            </div>
        {/each}
    </div>
</Container>

<style>
    .endpoints {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .endpoint {
        display: flex;
        align-items: center;
        gap: .25rem 1rem;
        padding: 0.25rem 1rem;
        background-color: var(--background-2);
        border-radius: 1em;
    }

    .method {
        padding: 0.25rem 0.5rem;
        border-radius: 1em;
        color: white;
        font-weight: bold;
        min-width: 60px;
        text-align: center;
    }

    .url {
        font-size: 1rem;
        flex-grow: 1;
        word-break: break-all;
        width: 100%;
    }

    @media screen and (max-width: 600px) {
        .endpoint {
            padding: 1rem;
            align-items: flex-start;
            flex-wrap: wrap;
        }

        .method {
            margin-bottom: 0.5rem;
        }

        button {
            flex-grow: 1;
        }
    }
    
</style>