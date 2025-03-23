<script>
    import Container from "../components/Container.svelte";

  const tools = [
    { name: 'Requests', path: 'requests', icon: '🔄' },
    { name: 'AniList User Info', path: 'anilist/user', icon: '📊' },
    { name: 'YouTube Thumbnails', path: 'youtube/thumbnails', icon: '🎬' },
    { name: 'Image Base64', path: 'image/base64', icon: '🖼️' },
    { name: "Clock", path: "clock", icon: "🕒" },
  ];
</script>

<Container>
    <div class="top">
        <h1>Tools</h1>
        <p>a set of web tools i created for things i couldn't do easily</p>
    </div>
  <div class="grid">
    {#each tools as tool}
      <a href={tool.path} class="card">
        <span class="icon">{tool.icon}</span>
        <span class="name">{tool.name}</span>
      </a>
    {/each}
  </div>
</Container>

<style>
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
  }

  .card {
    background: var(--background-2);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: var(--text);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }
</style>