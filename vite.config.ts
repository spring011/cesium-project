import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import Unocss from 'unocss/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isBuild = command === 'build';
  const isProd = mode === 'production';
  const cwd = process.cwd();

  const envConf = loadEnv(mode, cwd);

  const isDrop = envConf?.VITE_DROP === 'true';

  console.log({ isBuild, isProd, isDrop });

  return defineConfig({
    base: envConf.VITE_CONF_BASE,
    plugins: [vue(), Unocss(), vueDevTools()],
    resolve: { alias: { '@': resolve('src') } },
    esbuild: { drop: isDrop ? ['console'] : [] },
    build: {
      outDir: 'dist/' + mode,
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       core: [
      //         'vue',
      //       ],
      //       mapboxgl: [
      //         '@turf/turf',
      //       ],
      //     },
      //   },
      // },
    },
    server: {
      open: true,
      cors: true,
      host: true,
      port: +envConf.VITE_PORT,
    },
  });
};
