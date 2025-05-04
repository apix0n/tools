<script>
    export let user;
</script>

<div class="user-card" role="article">
    <a href={user.bannerImageURL} target="_blank" rel="noopener noreferrer" class="banner-link" aria-label="{user.login}'s banner">
        <div
            class="banner"
            style:background-image="url('{user.bannerImageURL}')"
            role="img"
            aria-label="{user.login}'s banner"
        ></div>
    </a>
    <div class="user-info">
        <div class="left">
            <a href={user.profileImageURL} target="_blank" rel="noopener noreferrer" class="avatar-link">
                <img
                    class="avatar"
                    src={user.profileImageURL}
                    alt="{user.login}'s avatar"
                />
            </a>
            <a href={"https://twitch.tv/" + user.login} target="_blank" rel="noopener noreferrer">
                <h2>
                    {user.displayName}
                    {#if user.roles.isPartner}
                        <span class="badge partner">Partner</span>
                    {:else if user.roles.isAffiliate}
                        <span class="badge affiliate">Affiliate</span>
                    {/if}
                </h2>
            </a>
        </div>
        <span class="id">{user.id}</span>
    </div>
    <span class="user-creation-date">Account created on {new Date(user.createdAt).toLocaleString("en-GB")}</span>
    {#if user.description}
        <div class="about">{user.description}</div>
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
        margin-top: 1.5rem;
    }

    .user-creation-date {
        margin-top: -1rem;
        padding: 1rem;
        display: block;
        width: 100%;
        background-color: var(--background-3);
        color: var(--text-3);
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        outline: 4px solid white;
        object-fit: cover;
    }

    .about {
        padding: 1rem;
        border-top: solid 2px var(--background-4);

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

    .badge {
        padding: 0.2rem 0.6rem;
        border-radius: 0.4rem;
        font-size: 0.9rem;
        margin-left: 0.5rem;
        color: white;
        display: inline-block;
    }
    
    .partner {
        background-color: #9146ff; /* Twitch Purple */
    }
    
    .affiliate {
        background-color: #f47c57; /* Twitch Affiliate Orange */
    }
</style>
