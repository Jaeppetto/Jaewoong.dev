import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    {
      enforce: 'pre',
      ...mdx({
        /* jsxImportSource: …, otherOptions… */
      })
    }
  ],
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
