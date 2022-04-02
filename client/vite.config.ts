import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  resolve: {
    alias: {
      '@src/types': path.resolve(__dirname, './src/types/index.ts'),
      '@src/components': path.resolve(__dirname, './src/components'),
      '@src/contexts': path.resolve(__dirname, './src/contexts/index.tsx'),
      '@src/helpers': path.resolve(__dirname, './src/utils/functions.ts'),
      '@src/constants': path.resolve(__dirname, './src/utils/constants.ts'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
});
