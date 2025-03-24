import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as child_process from 'node:child_process';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        version: {
            name: process.env.NODE_ENV === 'development' ? 'dev' : child_process.execSync('git rev-parse HEAD').toString().trim().slice(0, 7),
        }
    }
}

export default config;