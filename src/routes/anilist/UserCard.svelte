<script>
    export let user;

    function processAboutHtml(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Make all links open in new tab
        doc.querySelectorAll('a').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        // Convert YouTube divs to iframes
        doc.querySelectorAll('div.youtube').forEach(div => {
            const videoId = div.getAttribute('id').match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
            const iframe = doc.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = '100%';
            iframe.height = '300';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('loading', 'lazy');
            div.replaceWith(iframe);
        });
        
        return doc.body.innerHTML;
    }
</script>

<div class="user-card" role="article">
    <a href={user.bannerImage} target="_blank" rel="noopener noreferrer" class="banner-link" aria-label="{user.name}'s banner">
        <div
            class="banner"
            style:background-image="url('{user.bannerImage}')"
            style:background-color={user.options.profileColor}
            role="img"
            aria-label="{user.name}'s banner"
        ></div>
    </a>
    <div class="user-info">
        <div class="left">
            <a href={user.avatar?.large} target="_blank" rel="noopener noreferrer" class="avatar-link">
                <img
                    class="avatar"
                    src={user.avatar?.large || ""}
                    alt="{user.name}'s avatar"
                />
            </a>
            <a href={user.siteUrl} target="_blank" rel="noopener noreferrer">
                <h2>{user.name}</h2>
            </a>
        </div>
        <span class="id">{user.id}</span>
    </div>
    {#if user.about}
        <div class="about">{@html processAboutHtml(user.about)}</div>
    {/if}
</div>

<style>
    .user-card {
        margin: 0 auto;
        margin-top: 2rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        background-color: var(--background-2);
    }

    .banner {
        height: 150px;
        background-size: cover;
        background-position: center;
    }

    .user-info {
        padding: 2rem 1.5rem;
        position: relative;
        display: flex;
        justify-content: space-between;
    }
    
    .user-info .left {
        align-items: center;
        display: flex;
        gap: 1.1rem;
        margin-top: -65px;
    }

    .user-info .left h2 {
        margin: 0;
        margin-top: 1rem;
    }

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        outline: 4px solid white;
        object-fit: cover;
    }

    .about {
        margin-top: -1rem;
        padding: 1rem;
        border-top: solid 2px var(--background-3);

        & :global {
            img, video, iframe {
                max-width: 100%;
                border-radius: .2rem;
            }

            :first-child {
                margin-top: 0;
            }

            li::marker {
                color: var(--primary);
            }

            a[target="_blank"]::after {
                content: "\2197";
                display: inline;
            }

            blockquote {
                background-color: var(--background-3);
                color: var(--text-3);
                border-left: 4px solid var(--primary);
                padding: 1rem;
                margin: 1rem 0;
                border-radius: .2rem;
                font-style: italic;
                p {
                    margin: 0;
                }
            }

            code {
                background-color: var(--background-3);
                padding: .2rem .4rem;
                border-radius: .2rem;
                font-size: .9rem;
                font-family: monospace;
            }

            .markdown_spoiler {
                background-color: var(--background-3);
                color: var(--background-3);
                padding: .5rem;
                border-radius: .2rem;
                position: relative;
                transition: color 0.2s ease;
                &:hover {
                    transition: color 0.2s ease;
                    color: var(--text-3);
                }
                &::after {
                    content: "?";
                    color: var(--text-3);
                    font-size: .8rem;
                    position: absolute;
                }
            }

            .youtube::after {
                content: attr(id);
                display: block;
                user-select: all;
            }
        }
    }

    .id {
        color: var(--text-3);
    }

    .banner-link {
        display: block;
        text-decoration: none;
    }

    .avatar-link {
        display: block;
        transition: transform 0.2s ease;
    }

    .avatar-link:hover {
        transform: scale(1.05);
    }

    .banner-link:hover[href] .banner {
        opacity: 0.5;
        transition: opacity 0.2s ease;
    }

    .banner {
        opacity: 1;
        transition: opacity 0.2s ease;
    }
</style>