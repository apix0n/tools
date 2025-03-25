<script>
  import { version } from "$app/environment";
</script>

<footer>
  <div class="footer-content">
    <p>made by apix with <span class="separator">❤</span></p>
    <div class="footer-links">
      <a href="https://github.com/apix0n" target="_blank" rel="noopener">GitHub</a>
      <span class="separator">•</span>
      <a href="https://bsky.app/profile/aapix.bsky.social" target="_blank" rel="noopener">Bluesky</a>
      <span class="separator">•</span>
      <code>{version}</code>
    </div>
  </div>
</footer>

<style>
  footer {
    margin-top: auto;
    padding: 1.2rem 0;
    background-color: var(--background-2);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .footer-links {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  p, a {
    margin: 0;
    color: var(--text-2);
  }

  .separator {
    color: var(--primary);
  }

  @media (max-width: 600px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>