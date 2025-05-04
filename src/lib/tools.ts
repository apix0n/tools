type Tool = {
    name: string,
    path: string,
    icon: string,
    description?: string,
}

export const tools: Array<Tool> = [
    {
        name: "Requests",
        path: "/requests",
        icon: "🔄",
        description: "A set of endpoints that could be useful in some precise situations, or for debugging."
    },
    {
        name: "AniList User Info",
        path: "/anilist/user",
        icon: "📊",
        description: "Easily get important information about an AniList user."
    },
    {
        name: "Twitch User Info",
        path: "/twitch/user",
        icon: "📼",
        description: "Easily get important information about a Twitch user/streamer."
    },
    {
        name: "YouTube Thumbnails",
        path: "/youtube/thumbnails",
        icon: "🎬",
        description: "Get all available thumbnails from a YouTube video."
    },
    {
        name: "Image Base64",
        path: "/encode/image/base64",
        icon: "🖼️",
        description: "Convert an image to a base64 string."
    },
    {
        "name": "URL Encode/Decode",
        "path": "/encode/url",
        "icon": "🔗",
        "description": "Encode or decode a URL to ensure it's properly formatted for web use."
    },
    {
        name: "Clock",
        path: "/time/clock",
        icon: "🕒",
        description: "A simple clock that syncs itself to the correct time, and without distractions.",
    },
    {
        name: "Timer",
        path: "/time/timer",
        icon: "⏲️",
        description: "Just a fullscreen timer that doesn't annoy you."
    },
    {
        name: "Time formats",
        path: "/time/formats",
        icon: "🕰️",
        description: "Easily export a time string in a chosen common format."
    },
    {
        name: "osu! Seasonal Backgrounds",
        path: "/osu/seasonal-backgrounds",
        icon: "🍂",
        description: "Get this season's osu! Seasonal Backgrounds."
    },
    {
        name: "Screen & viewport size",
        path: "/screen/size",
        icon: "📺",
        description: "Get your screen size and your User Agent's viewport."
    },
];