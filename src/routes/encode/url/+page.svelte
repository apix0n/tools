<script>
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";
    import { handleCopy } from "$lib/copy";
    import { onMount } from 'svelte';

    export let data;

    let inputText = '';
    let resultText = '';
    let resultType = '';
    let error = null;

    function handleEncode() {
        error = null;
        resultType = 'Encoded';
        try {
            resultText = encodeURIComponent(inputText);
        } catch (err) {
            error = "Encoding failed.";
            console.error("URL encode error:", err);
        }
    }

    function handleDecode() {
        error = null;
        resultType = 'Decoded';
        try {
            resultText = decodeURIComponent(inputText);
        } catch (err) {
            error = "Decoding failed. The input might be malformed.";
            console.error("URL decode error:", err);
        }
    }

    onMount(() => {
        inputText = '';
        resultText = '';
        resultType = '';
    });
</script>

<Top title={data.title}>
    <noscript>This app won't work on your browser. Enable JavaScript to continue.</noscript>
    <div class="input">
        <textarea
            bind:value={inputText}
            placeholder="Enter text to encode or decode"
            class="text-input"
            rows="5"
        ></textarea>
        <div class="buttons">
            <button on:click={handleEncode}>Encode</button>
            <button on:click={handleDecode}>Decode</button>
            <button on:click={inputText = null} class="secondary">Clear</button>
        </div>
    </div>
</Top>

<Container>
    {#if error}
        <div class="error-box" role="alert">{error}</div>
    {/if}

    {#if resultText}
        <div class="result-card">
            <h3>{resultType} URL</h3>
            <div class="result-content">
                <textarea readonly value={resultText}></textarea>
                <button on:click={(e) => handleCopy(e, resultText)}>Copy</button>
            </div>
        </div>
    {/if}
</Container>

<style>
    .input {
        margin: 1rem 0;
    }

    .text-input {
        width: 100%;
        max-width: 600px;
        margin: 0;
        padding: 1rem;
        font-size: 1rem;
        font-family: monospace;
        border: 2px solid var(--background-4);
        resize: vertical;
    }

    .buttons {
        margin-top: 0.5rem;
    }

    .error-box {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #fee2e2;
        border: 1px solid #ef4444;
        border-radius: 0.375rem;
        color: #991b1b;
    }

    .result-card {
        margin-top: 1rem;
        background: var(--background-2);
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .result-card h3 {
        margin: 0;
    }

    .result-content {
        display: flex;
        gap: 0.5rem;
    }

    .result-content textarea {
        flex: 1;
        min-height: 100px;
        font-family: monospace;
        font-size: 0.875rem;
        padding: 0.5rem;
        resize: vertical;
    }
</style>
