<script>
    export let tool;
</script>

<a href={tool.path} class="card" target={tool.path.startsWith('http') ? '_blank' : null} rel={tool.path.startsWith('http') ? 'noopener noreferrer' : null}>
    <div class="icon">{tool.icon}</div>
    <h2 class="name">{tool.name}</h2>
    {#if tool.description}
        <span class="description">{tool.description}</span>
    {/if}
</a>

<style>
    .card {
        background: var(--background-2);
        padding: 1.3rem;
        border-radius: 8px;
        text-decoration: none;
        color: var(--text);
        display: flex;
        flex-direction: column;
        transition: border-color .2s;
        border: solid 2px var(--background-2);

        &:hover {
            border-color: var(--primary);
        }
    }

    .icon {
        background: var(--background-3);
        display: flex;
        font-size: 1.7rem;
        margin-bottom: 0.5rem;
        border-radius: .4rem;
        line-height: 48px;
        width: 48px;
        height: 48px;
        align-items: center;
        box-sizing: border-box;
        justify-content: center;
    }

    .name {
        margin: 0;
        margin-top: .5em;
        font-size: 1.1rem;
        font-weight: 500;
    }

    .description {
        font-size: 0.9rem;
        color: var(--text-3);
        margin-top: .5rem;
    }
    
    a[target="_blank"] h2::after {
        content: '↗';
        padding-left: .3em;
        color: var(--text-3);
    }
</style>
