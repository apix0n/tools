<script>
    export let data;
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";
    import { handleCopy } from "$lib/copy";

    let now = new Date();
    
    function handleDateChange(e) {
        now = new Date(e.target.value);
    }

    function handleDateStringChange(e) {
        console.log(e.target.value)
        const parsed = new Date(e.target.value);
        if (!isNaN(parsed.getTime())) {
            now = parsed;
        }
    }
    
    $: formats = [
        { name: "Unix Epoch (without milliseconds)", value: Math.floor(now.getTime() / 1000) },
        { name: "Unix Epoch", value: now.getTime() },
        { name: "ISO 8601", value: now.toISOString() },
        { name: "UTC", value: now.toUTCString() },
        { name: "Locale Date String", value: now.toLocaleDateString() },
        { name: "Locale Time String", value: now.toLocaleTimeString() },
        { name: "Locale String", value: now.toLocaleString() },
        { name: "RFC 2822", value: now.toString() },
    ];
</script>

<Top title={data.title}>
    <div class="date-inputs">
        <div class="input-group">
            <span>Pick date:</span>
            <input class="square"
                type="datetime-local" 
                value={now.toISOString().slice(0, 16)} 
                on:change={handleDateChange}
            />
        </div>
        <div class="input-group">
            <span>Or enter date string:</span>
            <input class="square"
                type="text"
                on:change={handleDateStringChange}
                placeholder="e.g. 2024-03-25 or March 25, 2024"
            />
            <button on:click={() => now = new Date()}>Reset</button>
        </div>
    </div>
</Top>

<Container>
    <div class="formats">
        {#each formats as format}
            <div>
                <h2>{format.name}</h2>
                <code>{format.value}</code>
                <button on:click={(e) => handleCopy(e, format.value)}>Copy</button>
            </div>
        {/each}
    </div>
</Container>

<style>
    .date-inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input-group:not(:first-child) {
        margin-top: -.75rem;
    }

    .input-group button {
        margin-left: 0.25rem;
    }

    .formats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .formats div {
        background: var(--background-2);
        border-radius: 0.5rem;
        padding: 1rem;
        h2 {
            margin: 0 0 0.5rem 0;
        }
        code {
            font-size: .9rem;
        }
        button {
            display: block;
            margin-top: 1rem;
            width: 100%;
        }
    }
</style>
