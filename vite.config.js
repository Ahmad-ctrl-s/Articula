import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// إذا كان المشروع على GitHub Pages، ضع اسم المستودع هنا
const repoName = 'Articula' // ← غيّرها لاسم المستودع الفعلي

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react()],
//   base: '/Articula/',
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://tamkeen-dev.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })

