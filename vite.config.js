import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: {
				name: "apix tools",
				short_name: "tools",
				theme_color: "#3dfd8d",
				scope: "/",
				icons: [
					{
						src: '/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png',
					}
				]
			},
			devOptions: {
				enabled: true
			}
		})
	],
	server: {
		allowedHosts: true
	}
});