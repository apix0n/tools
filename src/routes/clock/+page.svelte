<script>
    import { onMount } from "svelte";
    export let clockElement;

    let time = new Date();
    let timeOffset = 0; // Difference between server and local time
    let requestDuration = 0;
    let lastUpdate = Date.now();  // To track the last update

    async function syncTime() {
        const requestStart = Date.now();
        const response = await fetch('/requests/date/milliseconds');
        const serverTime = await response.json();
        const requestEnd = Date.now();
        
        // Calculate round-trip request duration (in milliseconds)
        requestDuration = (requestEnd - requestStart) / 2;

        // Adjust server time with round-trip time
        const adjustedServerTime = serverTime + requestDuration;

        // Calculate the offset between server and local time
        timeOffset = adjustedServerTime - Date.now();
        time = new Date(adjustedServerTime);
    }

    function updateClock() {
        // Sync time with the adjusted offset
        time = new Date(Date.now() + timeOffset + 1000);
    }

    function syncToNextSecond() {
        // Get the current time and calculate the time to the next full second
        const now = new Date();
        const msToNextSecond = 1000 - now.getMilliseconds();
        
        // Sync immediately if close to the next second
        if (msToNextSecond <= 100) { // Allow a small margin for syncing
            updateClock();
        }

        // Continue updating the clock as the page refreshes at the next frame
        requestAnimationFrame(syncToNextSecond);
    }

    onMount(async () => {
        await syncTime();
        clockElement.scrollIntoView();

        // Update immediately after syncing with server
        updateClock();

        // Sync to the next full second using requestAnimationFrame
        syncToNextSecond();
    });
</script>

<svelte:head>
    <title>Time is {time.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}</title>
</svelte:head>

<div class="debug-info">
    <div>Difference with server was {(-timeOffset <= 0 ? "" : "+")}{-(timeOffset / 1000).toFixed(3)} seconds (±{(requestDuration / 1000).toFixed(3)} seconds)</div>
</div>

<div class="clock" bind:this={clockElement}>
    {#each time.toLocaleTimeString("en-US", { hour12: false }).split('') as char}
        <span class="digit" class:separator={char === ":"}>{char}</span>
    {/each}
</div>

<style>
    .clock {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15vw;
        font-weight: 700;
        font-family: monospace;
        margin: 0;
        padding: 0;
    }

    .digit {
        display: inline-block;
        width: 1ch;
        text-align: center;
    }

    .digit.separator {
        width: 0.5ch;
        color: var(--primary);
        font-weight: 400;
    }

    .debug-info {
        padding: 1rem;
        font-size: 1rem;
        text-align: center;
        background: var(--primary);
        color: var(--primary-2);
    }
</style>
