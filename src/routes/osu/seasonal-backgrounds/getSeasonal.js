let cachedBackgrounds = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

export async function getSeasonalBackgrounds() {
    const now = Date.now();

    if (cachedBackgrounds && now - lastFetchTime < CACHE_DURATION) {
        return cachedBackgrounds;
    }

    const res = await fetch("https://osu.ppy.sh/api/v2/seasonal-backgrounds");
    if (!res.ok) {
        throw new Error("Failed to fetch seasonal backgrounds");
    }

    const json = await res.json();
    cachedBackgrounds = json;
    lastFetchTime = now;

    return cachedBackgrounds;
}
