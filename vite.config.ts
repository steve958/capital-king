import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'CapitalKing',
        short_name: 'CapitalKing',
        description: 'CapitalKing is a mobile-first PWA quiz game that tests your knowledge of the world’s capital cities.',
        theme_color: '#2196f3',
        background_color: '#f5f5f5',
        icons: [
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: '/icons/icon512_rounded.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon512_maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})
