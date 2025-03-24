<svelte:head>
    <style>
        .clock {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15vw;
            font-weight: 700;
            margin: 0;
            padding: 0;
        }

        @media screen and (max-width: 600px) {
            .clock {
                font-size: 20vw;
            }
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
    </style>
</svelte:head>

<slot/>