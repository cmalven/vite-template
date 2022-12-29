import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import createExternal from 'vite-plugin-external';
import externalGlobals from 'rollup-plugin-external-globals';
import { resolve } from 'path';
import glob from 'glob';
import sassGlobImports from 'vite-plugin-sass-glob-import';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'build');

export default defineConfig({
	base: '',
	root,
	build: {
		outDir,
		rollupOptions: {
			input: glob.sync(resolve(root, '.\/*.html').replace(/\\/g, '/')),
			output: {
				assetFileNames: "assets/[name].[ext]",
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/app.js`, //Needs to be hardoced due to strange Vite and Rollup behaviour
			},
		},
		emptyOutDir: true,
		minify: false,
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(root, 'partials'),
		}),
		externalGlobals({
			jquery: 'jQuery'
		}),
		createExternal({
			externals: {
				jquery: 'jQuery'
			}
		}),
		sassGlobImports.default(),
	],
});
