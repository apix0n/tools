<script>
    import Container from "$components/Container.svelte";
    import ToolCard from "$components/ToolCard.svelte";
    import { tools } from "$lib/tools";
</script>

<Container>
    <div class="top">
        <h1>apix tools</h1>
        <span>A set of web tools I created for things I needed to do at some
            point, and couldn't do easily.</span>
        <div class="links">
            <a href="https://github.com/apix0n/tools" target="_blank">
                <button>View on GitHub</button>
            </a>
            <a href="https://github.com/apix0n/tools/issues/new" target="_blank">
                <button class="secondary">Report a problem</button>
            </a>
        </div>
    </div>
    <span class="sep"></span>
    <div class="grid">
        {#each tools as tool}
            <ToolCard {tool} />
        {/each}
    </div>
</Container>

<style>
    .top {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 1rem;
        padding: 3rem 0;
        padding-top: 5rem;
        h1 {
            margin: 0;
            font-size: 3rem;
        }
    }

    .sep {
        display: block;
        height: 1px;
        width: 100%;
        background-color: var(--background-4);
        margin-bottom: 2rem;
    }

    .links {
        display: flex;
        justify-content: center;
        gap: 0.7rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }
    @media screen and (max-width: 768px) {
        .top {
            padding: 2rem 0;
            padding-top: 3rem;
            h1 {
                font-size: 2.5rem;
            }
        }

        .sep {
            display: none;
        }

        .grid {
            gap: 1rem;
            padding: 0;
        }
    }
</style>