<script>
    export let title;
</script>

<div class="head">
    <h1>{title}</h1>
    <slot/>
</div>

<style>
    .head {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        padding: 5rem;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        background-color: var(--background-2);
    }

    .head h1 {
        margin: 0;
    }

    @media (max-width: 720px) {
        .head {
            padding: 3rem 1rem;
        }
    }
    
    @media (max-width: 540px) {
        .head {
            padding: 2rem 0.5rem;
            padding-top: 1rem;
        }
    }
</style>
