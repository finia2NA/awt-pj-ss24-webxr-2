import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import selfsigned from 'selfsigned';

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, // You can change this to any available port you prefer
    https: {
      key: pems.private,
      cert: pems.cert,
    },
  },
});