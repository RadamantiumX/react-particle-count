import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/

export default defineConfig({
  plugins: [
    [react()],
    VitePWA({
      manifest: {
        name: 'Deteccion de microplasticos',
        short_name: 'Obj. Detection',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        workboxOptions: {
          maximumFileSizeToCacheInBytes: 50000000, // <---- increasing the file size to cached 5mb
        },
        icons: [
          {
            src: './src/assets/icon_page.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './src/assets/icon_page_big.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  
})

