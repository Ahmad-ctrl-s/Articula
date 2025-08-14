import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  server: {
    port: 5173, // تأكد أن البورت غير محجوب
    open: true  // يفتح المتصفح تلقائيًا
  }
});

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

