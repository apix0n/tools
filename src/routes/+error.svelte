<script>
    import Container from "$components/Container.svelte";
    import { page } from "$app/stores";
</script>

<svelte:head>
    <style>
        .layout {
            align-items: center;
            justify-content: center;
        }
    </style>
</svelte:head>

<div class="error">
    <h1>{$page.status}</h1>
    <span>{$page.error.message}</span>
    <a href="/">
        <button>Back to home</button>
    </a>
</div>

<style>
    .error {
        height: 100%;
        text-align: center;
        *:not(button) {
            margin: 0;
        }
    }
    
    h1 {
        color: var(--primary);
        font-size: 7rem;
    }
    
    span {
        font-size: 2rem;
    }

    a {
        display: block;
        button {
            margin-top: 1.5rem;
        }
    }
</style>