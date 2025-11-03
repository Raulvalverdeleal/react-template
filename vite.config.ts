import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tsconfigPaths(),
		tailwindcss(),
		react(),
		visualizer({ filename: './stats.html', open: false, template: 'treemap' }),
	],
	build: {
		outDir: 'build',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						// -- radix
						if (id.includes('@radix-ui')) return 'ui';
						if (id.includes('sonner')) return 'ui';
						// -- motion
						if (id.includes('framer-motion')) return 'animation';
					}
				},
			},
		},
	},
	server: {
		open: true,
		port: 3000,
	},
});
