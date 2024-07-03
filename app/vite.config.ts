import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import selfsigned from 'selfsigned';

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 3000, // You can change this to any available port you prefer
//     https: {
//       key: pems.private,
//       cert: pems.cert,
//     },
//   }, define: {
//     __API_KEY__: loadEnv('', process.cwd()),
//   }
// });


export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 3000, // You can change this to any available port you prefer
      https: {
        key: pems.private,
        cert: pems.cert,
      }
    },
    // vite config
    define: {
      __API_URL__: JSON.stringify(env.API_URL),
    },
  }
})