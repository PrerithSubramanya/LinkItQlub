import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/

const manifestForPlugin = {
	registerType: "prompt",
	includeAssets: ["favicon.ico", "logo192.png", "logo512.png"],
	manifest: {
		name: "Card Linker",
		short_name: "Qlub App",
		description: "Lets you link cards to any table.",
		icons: [
			{
				src: "/logo192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/logo512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		theme_color: "#000000",
		background_color: "#ffffff",
		display: "standalone",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
	},
};


export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
