<script>
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";
    import { handleCopy } from "$lib/copy";
    import { onMount } from 'svelte';

    export let data;

    let selectedFile = null;
    let base64Result = null;
    let error = null;
    let fileInput = null;

    const formats = [
        { name: 'Raw Base64', getValue: () => base64Result },
        { name: 'CSS background-image', getValue: () => `background-image: url(${base64Result});` },
        { name: 'CSS url()', getValue: () => `url(${base64Result})` }
    ];

    async function handleFileSelect(event) {
        error = null;
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            error = "Please select an image file";
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                base64Result = e.target.result;
            };
            reader.readAsDataURL(file);
            selectedFile = file;
        } catch (err) {
            error = "Error processing file";
            console.error('base64 | error processing file:', err);
        }
    }

    onMount(() => {
        if (fileInput) {
            fileInput.value = '';
        }
    });
</script>

<Top title={data.title}>
    <noscript>This app won't work on your browser. Enable JavaScript to continue.</noscript>
    <div class="input">
        <input
            bind:this={fileInput}
            type="file"
            accept="image/*"
            on:change={handleFileSelect}
            class="file-input"
        />
    </div>
</Top>

<Container>
    {#if error}
        <div class="error-box" role="alert">
            {error}
        </div>
    {/if}

    {#if selectedFile && base64Result}
        <div class="preview">
            <h2>Preview</h2>
            <img src={base64Result} alt="Preview" />
            <p class="file-info">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </p>
        </div>

        <div class="results">
            {#each formats as format}
                <div class="result-card">
                    <h3>{format.name}</h3>
                    <div class="result-content">
                        <textarea
                            readonly
                            value={format.getValue()}
                            rows="3"
                        ></textarea>
                        <button
                            on:click={(e) => handleCopy(e, format.getValue())}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</Container>

<style>
    .error-box {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #fee2e2;
        border: 1px solid #ef4444;
        border-radius: 0.375rem;
        color: #991b1b;
    }

    h2 {
        margin: 0 0 0.5rem 0;
    }

    .preview {
        margin: 1rem 0;
        padding: 1rem;
        background: var(--background-2);
        border-radius: 0.5rem;
    }

    .preview img {
        max-width: 100%;
        max-height: 300px;
        border-radius: 0.25rem;
    }

    .file-info {
        margin: 0.5rem 0 0 0;
        color: var(--text-3);
    }

    .results {
        display: grid;
        gap: 1rem;
    }

    .result-card {
        background: var(--background-2);
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .result-card h3 {
        margin: 0 0 0.5rem 0;
    }

    .result-content {
        display: flex;
        gap: 0.5rem;
    }

    .result-content textarea {
        flex: 1;
        min-height: 120px;
        resize: vertical;
        padding: 0.5rem;
        font-family: monospace;
        font-size: 0.875rem;
    }

    .file-input {
        padding: 0.5rem;
        border: 2px dotted var(--background-4);
        border-radius: 0.375rem;
        width: 100%;
        max-width: 500px;
    }
</style>
