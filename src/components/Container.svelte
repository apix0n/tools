<div class="container">
    <slot />
</div>

<style>
    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 1200px) {
        .container {
            max-width: 960px;
        }
    }

    @media (max-width: 960px) {
        .container {
            max-width: 720px;
        }
    }

    @media (max-width: 720px) {
        .container {
            max-width: 540px;
        }
    }

    @media (max-width: 540px) {
        .container {
            max-width: 100%;
            padding: 0 0.5rem;
        }
    }
</style>