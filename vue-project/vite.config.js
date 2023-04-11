import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // включаем плагин @vue/compiler-sfc
    template: {
      compilerOptions: {
        // настройки компиляции шаблонов
        isCustomElement: tag => tag.startsWith('my-'),
        compilerOptions: {
          // поддержка идентификаторов области видимости
          scopeId: 'data-v'
        }
      }
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
