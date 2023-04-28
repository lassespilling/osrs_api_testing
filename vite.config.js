import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [react()],
    base: '/osrs_api_testing/',
    server: {
      // port: 1337,
      proxy: {
        '/api': {
          target: 'https://crossorigin.me/https://secure.runescape.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
