<script>
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { onMount, onDestroy } from 'svelte';
    
    let timerElement, pauseElement, intervalId, chimeAudio;
    let hours = 0;
    let minutes = 5;
    let seconds = 0;
    let totalSeconds = 0;
    let isRunning = false;
    let finished = false;

    // Preload audio when component mounts
    function initAudio() {
        chimeAudio = new Audio('./chime.mp3');
        // Preload the audio file
        chimeAudio.preload = 'auto';
        // Load it immediately
        chimeAudio.load();
    }

    // Call initAudio when component mounts
    $: {
        if (typeof window !== 'undefined') {
            initAudio();
        }
    }

    function startTimer() {
        finished = false;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        isRunning = true;
        intervalId = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(intervalId);
                isRunning = false;
            }
        }, 1000);

        // Wait for the next tick to ensure the pause element exists
        setTimeout(() => {
            if (pauseElement) {
                pauseElement.focus();
            }
        }, 0);
    }

    function pauseTimer() {
        clearInterval(intervalId);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(intervalId);
        isRunning = false;
        finished = false;
        totalSeconds = 0;
        hours = seconds = 0;
        minutes = 5;
    }

    function playChime() {
        if (chimeAudio) {
            // Reset the audio to start
            chimeAudio.currentTime = 0;
            chimeAudio.play().catch(error => console.log('Audio playback failed:', error));
        }
    }

    function updateDisplay() {
        hours = Math.floor(totalSeconds / 3600);
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = totalSeconds % 60;

        if (totalSeconds === 0 && isRunning) {
            finished = true;
            isRunning = false;
            playChime();
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            startTimer();
        }
    };

    beforeNavigate(({ cancel }) => {
        if (isRunning) {
            if (confirm('Timer is still running. Are you sure you want to leave?')) {
                // Clean up event listener before allowing navigation
                if (typeof window !== 'undefined') {
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                }
            } else {
                cancel();
            }
        } else {
            // Clean up event listener when not running
            if (typeof window !== 'undefined') {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        }
    });

    // Keep the existing beforeunload handler for browser navigation
    function handleBeforeUnload(event) {
        if (isRunning) {
            event.preventDefault();
            event.returnValue = '';
            return '';
        }
    }

    afterNavigate(() => {
        timerElement?.scrollIntoView();
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }
    });
</script>

<svelte:head>
    <title>Timer: {hours ? hours.toString().padStart(2, '0') + ':' : ''}{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</title>
</svelte:head>

<div class="controls" class:bg={!isRunning} class:finished>
    {#if !isRunning}
    <div class="inputs">
        <input type="number" bind:value={hours} min="0" max="23" on:keypress={handleKeyPress}>
        <span class="separator">:</span>
        <input type="number" bind:value={minutes} min="0" max="59" on:keypress={handleKeyPress}>
        <span class="separator">:</span>
        <input type="number" bind:value={seconds} min="0" max="59" on:keypress={handleKeyPress}>
    </div>
    {/if}
    <div class="buttons">
        {#if isRunning}
        <button on:click={pauseTimer} bind:this={pauseElement}>Pause</button>
        {:else}
        <!-- svelte-ignore a11y_autofocus -->
        <button on:click={startTimer} autofocus>Start</button>
        {/if}
        <button on:click={resetTimer}>Reset</button>
    </div>
</div>

<div class="clock" bind:this={timerElement} class:finished>
    {#each `${hours ? hours.toString().padStart(2, '0') + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`.split('') as char}
        <span class="digit" class:separator={char === ":"}>{char}</span>
    {/each}
</div>

<style>
    .controls {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        margin: 1rem;
        border-radius: 1rem;
        color: var(--primary-2);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .controls.bg {
        background: var(--background-3);
        color: var(--primary-2);
    }

    .inputs {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    input {
        width: 4rem;
        padding: 0.5rem;
        font-size: 1.2rem;
        text-align: center;
        background: var(--primary);
        color: var(--background);
        border: none;
        border-radius: 4px;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-2);
    }
    
    .buttons {
        display: flex;
        gap: 1rem;
    }

    .clock, .controls, .digit, .controls {
        transition: background-color 0.5s, color 0.5s;
    }

    .clock.finished {
        background: var(--primary);
        color: var(--primary-2);
        .digit.separator {
            color: var(--primary-2);
        }
    }

    .controls.finished {
        background: var(--primary-2);
        color: var(--text);
    }
</style>
