import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: 'node_modules',
        replacement: path.resolve(__dirname, './node_modules')
      }
    ]
  }
})
