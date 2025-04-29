<script>
    import { onMount } from "svelte";
    import { afterNavigate } from "$app/navigation";

    export let deviceInfoElement;

    function toFraction(decimal) {
        const tolerance = 1e-6;
        let h1 = 1,
            h2 = 0,
            k1 = 0,
            k2 = 1;
        let b = decimal;
        do {
            let a = Math.floor(b);
            let aux = h1;
            h1 = a * h1 + h2;
            h2 = aux;
            aux = k1;
            k1 = a * k1 + k2;
            k2 = aux;
            b = 1 / (b - a);
        } while (Math.abs(decimal - h1 / k1) > tolerance);

        return `${h1}:${k1}`;
    }

    let screenWidth = 0;
    let screenHeight = 0;
    let viewportWidth = 0;
    let viewportHeight = 0;
    let aspectRatio = "";
    let aspectRatioFraction = "";
    let screenAspectRatio = "";
    let screenAspectRatioFraction = "";
    let orientation = "";
    let pixelDensity = 1;

    function updateDeviceInfo() {
        screenWidth = window.screen.width;
        screenHeight = window.screen.height;
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;

        const aspectDecimal = viewportWidth / viewportHeight;
        const screenAspectDecimal = screenWidth / screenHeight;

        aspectRatio = aspectDecimal.toFixed(2);
        aspectRatioFraction = toFraction(aspectDecimal);
        screenAspectRatio = screenAspectDecimal.toFixed(2);
        screenAspectRatioFraction = toFraction(screenAspectDecimal);

        orientation = viewportWidth > viewportHeight ? "landscape" : "portrait";
        pixelDensity = window.devicePixelRatio || 1;
    }

    onMount(() => {
        updateDeviceInfo();
        window.addEventListener("resize", updateDeviceInfo);
    });

    afterNavigate(() => {
        deviceInfoElement?.scrollIntoView();
    });
</script>

<div class="fullscreen" bind:this={deviceInfoElement}>
    <h1>Device Info</h1>
    <div>
        <strong>Viewport Aspect Ratio:</strong>
        {aspectRatio} ({aspectRatioFraction})
    </div>
    <div>
        <strong>Screen Aspect Ratio:</strong>
        {screenAspectRatio} ({screenAspectRatioFraction})
    </div>
    <div><strong>Orientation:</strong> {orientation}</div>
    <div><strong>Pixel Density:</strong> {pixelDensity}</div>
    <div><strong>Screen:</strong> {screenWidth} × {screenHeight}</div>
    <div>
        <strong>Real Screen:</strong>
        {screenWidth * pixelDensity} × {screenHeight * pixelDensity}
    </div>
    <div><strong>Viewport:</strong> {viewportWidth} × {viewportHeight}</div>
</div>

<style>
    .fullscreen {
        background: var(--primary);
        color: var(--primary-2);
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 1.5rem;
        gap: 0.5rem;
        padding: 2rem;
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
</style>
