<script>
    import Container from "../../../components/Container.svelte";
    import Top from "../../../components/Top.svelte";

    export let data;
    const { backgrounds, seasonEnd } = data;
</script>

<Top title={data.title}>
    <span>Note: Only displays <i>the current season</i>'s backgrounds.</span>
    <span>Season ends on {new Date(seasonEnd).toLocaleString()}</span>
</Top>

<Container>
    {#if backgrounds.length > 0}
        <div class="grid">
            {#each backgrounds as bg}
                <div class="card">
                    <a href={bg.url} target="_blank"><img src={bg.url} alt="Artwork" class="background" /></a>
                    <div class="author">
                        by <a href={`https://osu.ppy.sh/users/${bg.user.id}`} target="_blank" rel="noopener">{bg.user.username}</a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>Loading backgrounds...</p>
    {/if}
</Container>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        margin: 1rem;
        gap: 1rem;
    }
    .card {
        border-radius: 0.5rem;
        overflow: hidden;
        background: var(--background-2);
        text-align: center;
    }
    .background {
        width: 100%;
        height: auto;
        display: block;
    }
    .author {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
    .author a {
        color: var(--primary);
        text-decoration: none;
    }
    .author a:hover {
        text-decoration: underline;
    }
</style>