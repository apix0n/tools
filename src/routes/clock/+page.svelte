<script>
    import { onMount } from "svelte";
    export let clockElement;

    let time = new Date();
    let timeOffset = 0; // Difference between server and local time
    let requestDuration = 0;

    async function syncTime() {
        const requestStart = Date.now();
        const response = await fetch('/requests/date/milliseconds');
        const serverTime = await response.json();
        const requestEnd = Date.now();
        requestDuration = (requestEnd - requestStart) / 2;

        // Calculate offset between server and local time
        const adjustedServerTime = serverTime + requestDuration;
        timeOffset = adjustedServerTime - Date.now();
        time = new Date(adjustedServerTime);
    }

    function updateClock() {
        // Use current time plus the calculated offset
        time = new Date(Date.now() + timeOffset);
    }

    onMount(async () => {
        await syncTime();
        clockElement.scrollIntoView();

        // Align updates with the start of each second
        const now = new Date();
        const delay = 1000 - now.getMilliseconds();
        
        setTimeout(() => {
            updateClock();
            const interval = setInterval(updateClock, 1000);
            return () => clearInterval(interval);
        }, delay);
    });
</script>

<svelte:head>
    <title>Time is {time.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })}</title>
</svelte:head>

<div class="debug-info">
    <div>Difference with server was {(-timeOffset<=0?"":"+")}{-(timeOffset / 1000).toFixed(3)} seconds (±{(requestDuration/1000).toFixed(3)} seconds)</div>
</div>

<div class="clock" bind:this={clockElement}>
    {#each time.toLocaleTimeString("en-US", { hour12: false }).split('') as char}
        <span class="digit" class:separator={char === ":"}>{char}</span>
    {/each}
</div>

<style>
    .clock {
        height: 100vh;
        width: 100vw;
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
