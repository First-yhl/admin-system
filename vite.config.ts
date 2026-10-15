import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import {viteMockServe} from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), viteMockServe({
    mockPath: 'mock',
    enable: true,
  })],
})
