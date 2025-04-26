import { getSeasonalBackgrounds } from "./getSeasonal.js";

export async function load() {
    const backgrounds = await getSeasonalBackgrounds();
    return {
        seasonEnd: backgrounds.ends_at,
        backgrounds: backgrounds.backgrounds,
        title: "osu! Seasonal Backgrounds",
    };
}
