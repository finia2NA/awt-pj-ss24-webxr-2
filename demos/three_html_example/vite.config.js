import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Use if you want to test the app on another device (local network)
// WebXR only works on localhost or https! Only intended for testing purposes, not production
// Also, --host needs to be set as an option for vite, see dev-host in package.json
//import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()/*, basicSsl()*/]
})
