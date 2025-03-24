<script>
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";
    export let clockElement;

    let time = new Date();
    let startTime = Date.now();
    let timeOffset = 0; // Difference between server and local time
    let requestDuration = 0;

    async function syncTime() {
        const requestStart = Date.now();
        const response = await fetch('/requests/date/milliseconds');
        const serverTime = await response.json();
        const requestEnd = Date.now();
        
        // Calculate round-trip request duration (in milliseconds)
        requestDuration = requestEnd - requestStart;

        // Adjust server time with round-trip time
        const adjustedServerTime = serverTime + requestDuration;

        // Calculate the offset between server and local time
        timeOffset = adjustedServerTime - Date.now();
        time = new Date(adjustedServerTime);
    }

    function updateClock() {
        // Sync time with the adjusted offset
        time = new Date(Date.now() + timeOffset);
    }

    function startClock() {
        let expectedTime = Date.now();
        
        // Update immediately first
        updateClock();
                
        function tick() {
            const now = Date.now();
            const drift = now - expectedTime;
            
            // If drift is more than 100ms, resync
            if (Math.abs(drift) > 100) {
                expectedTime = now;
            } else {
                expectedTime += 1000;
            }

            updateClock();
            
            // Schedule next update precisely
            const nextTick = Math.max(0, expectedTime - Date.now());
            setTimeout(() => requestAnimationFrame(tick), nextTick);
        }

        // Start on the next second boundary
        const msToNextSecond = 1000 - (Date.now() % 1000);
        setTimeout(() => {
            expectedTime = Date.now();
            tick();
        }, msToNextSecond);
    }

    onMount(async () => {
        await syncTime();
        updateClock();
        startClock();
    });
    
    afterNavigate(() => {
        clockElement?.scrollIntoView();
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
    .debug-info {
        padding: 1rem;
        font-size: 1rem;
        text-align: center;
        background: var(--primary);
        color: var(--primary-2);
    }
</style>