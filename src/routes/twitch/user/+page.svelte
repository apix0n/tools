<script>
    export let data;
    import Container from "$components/Container.svelte";
    import Top from "$components/Top.svelte";
    import UserCard from "../UserCard.svelte";

    let username = "";
    let user = null;
    let error = null;

    const fetchUser = async () => {
        try {
            user = null;
            error = null;
            console.log("twitch | fetching user:", username);
            const response = await fetch(`https://gql.twitch.tv/gql`, {
                method: "POST",
                headers: {
                    "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko", // Twitch public Client ID
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query: `
                    query ($login: String) {
                        user(login: $login) {
                            id
                            login
                            displayName
                            description
                            profileImageURL(width: 600)
                            bannerImageURL
                            createdAt
                            roles {
                                isPartner
                                isAffiliate
                            }
                        }
                    }
                    `,
                    variables: { login: username },
                }),
            });

            const { data } = await response.json();
            if (!data.user) {
                error = "User not found";
                user = null;
                return;
            }
            user = data.user;
        } catch (err) {
            error = "Failed to fetch user data";
            user = null;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchUser();
        }
    };
</script>

<Top title={data.title}>
    <noscript>This app won't work on your browser. Enable JavaScript to continue.</noscript>
    <div class="input">
        <!-- svelte-ignore a11y_autofocus -->
        <input
            type="text"
            bind:value={username}
            on:keydown={handleKeyPress}
            placeholder="Enter Twitch username"
            autocapitalize="none"
            autocorrect="off"
            autocomplete="off"
            autofocus
        />
        <button on:click={fetchUser}>Fetch user</button>
    </div>
</Top>

<Container>
    {#if error}
        <div class="error-box" role="alert">
            {error}
        </div>
    {/if}

    {#if user}
        <UserCard {user} />
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
</style>
