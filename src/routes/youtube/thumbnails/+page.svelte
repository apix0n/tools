<script>
    export let data;
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";
    import { handleCopy } from "$lib/copy";
    
    let url = "";
    let error = null;
    let videoId = null;
    let videoTitle = null;
    let channelName = null;
    let channelUrl = null;
    let useWebP = false;

    const thumbnailTypes = [
        { name: 'Max Resolution (1280x720)', key: 'maxresdefault' },
        { name: 'High Quality (480x360)', key: 'hqdefault' },
        { name: 'Medium Quality (320x180)', key: 'mqdefault' },
        { name: 'Standard Definition', key: 'sddefault' },
        { name: 'Default (120x90)', key: 'default' },
        { name: 'Player Background (480x360)', key: '0' },
        { name: 'High Quality Frame 1 (480x360)', key: 'hq1' },
        { name: 'High Quality Frame 2 (480x360)', key: 'hq2' },
        { name: 'High Quality Frame 3 (480x360)', key: 'hq3' },
        { name: 'Medium Quality Frame 1 (320x180)', key: 'mq1' },
        { name: 'Medium Quality Frame 2 (320x180)', key: 'mq2' },
        { name: 'Medium Quality Frame 3 (320x180)', key: 'mq3' },
        { name: 'Normal Frame 1 (120x90)', key: '1' },
        { name: 'Normal Frame 2 (120x90)', key: '2' },
        { name: 'Normal Frame 3 (120x90)', key: '3' },
    ];

    function extractVideoId(url) {
        const regExp = /(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/shorts\/|\/)([\w-]+)/;
        const match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    }

    async function fetchVideoInfo(url) {
        try {
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`https://www.youtube.com/oembed?url=${encodedUrl}&format=json`);
            if (!response.ok) throw new Error('Failed to fetch video info');
            const data = await response.json();
            videoTitle = data.title;
            channelName = data.author_name;
            channelUrl = data.author_url;
        } catch (err) {
            console.error('youtube | error fetching video info:', err);
        }
    }

    const handleSubmit = () => {
        error = null;
        videoId = extractVideoId(url);
        if (!videoId) {
            error = "Invalid YouTube URL";
            return;
        }
        url = `https://www.youtube.com/watch?v=${videoId}`;
        fetchVideoInfo(url);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    function getThumbnailUrl(videoId, key) {
        if (useWebP) {
            return `https://i3.ytimg.com/vi_webp/${videoId}/${key}.webp`;
        }
        return `https://i3.ytimg.com/vi/${videoId}/${key}.jpg`;
    }
</script>

<Top title={data.title}>
    <noscript>This app won't work on your browser. Enable JavaScript to continue.</noscript>
    <div class="input">
        <!-- svelte-ignore a11y_autofocus -->
        <input
            type="url"
            bind:value={url}
            on:keydown={handleKeyPress}
            placeholder="Enter YouTube URL"
            autocomplete="off"
            autofocus
        />
        <button on:click={handleSubmit}>Get thumbnails</button>
    </div>
    <label class="format-switch">
        <input
            type="checkbox"
            bind:checked={useWebP}
        />
        Use WebP format
    </label>
</Top>

<Container>
    {#if error}
        <div class="error-box" role="alert">
            {error}
        </div>
    {/if}

    {#if videoId && videoTitle && channelName}
        <div class="video-info">
            <h2>
                <a href={url} target="_blank" rel="noopener noreferrer">{videoTitle}</a>
            </h2>
            <p>by <a href={channelUrl} target="_blank" rel="noopener noreferrer">{channelName}</a></p>
        </div>
    {/if}

    {#if videoId}
        <div class="thumbnails">
            {#each thumbnailTypes as type}
                <div class="thumbnail-card">
                    <h3>{type.name} [{type.key}]</h3>
                    <img
                        src={getThumbnailUrl(videoId, type.key)}
                        alt={`${type.name} thumbnail`}
                    />
                    <div class="thumbnail-url">
                        <input
                            readonly
                            disabled
                            value={getThumbnailUrl(videoId, type.key)}
                            type="url"
                        />
                        <button
                            on:click={(e) => handleCopy(e, getThumbnailUrl(videoId, type.key))}
                        >
                            Copy link
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

    .input input {
        width: 500px;
        max-width: 100%;
    }

    .thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .thumbnail-card {
        background: var(--background-2);
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .thumbnail-card h3 {
        margin: 0 0 0.5rem 0;
    }

    .thumbnail-card img {
        width: 100%;
        height: auto;
        border-radius: 0.25rem;
    }

    .thumbnail-url {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        input, button {
            margin: 0;
        }
    }

    .thumbnail-url input {
        flex: 1;
        padding: 0.25rem .5rem;
        font-size: 0.875rem;
    }

    .thumbnail-url button {
        transition: background-color 0.2s;
    }

    .video-info {
        padding: 1rem;
        background: var(--background-2);
        border-radius: 0.5rem;
    }

    .video-info h2 {
        margin: 0;
        font-size: 1.25rem;
    }

    .video-info p {
        margin: 0.5rem 0 0 0;
        color: var(--text-3);
    }
</style>
