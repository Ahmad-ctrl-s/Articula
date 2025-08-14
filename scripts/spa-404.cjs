import { copyFileSync } from 'fs';

try {
  copyFileSync('dist/index.html', 'dist/404.html');
  console.log('✔ Created dist/404.html for SPA fallback');
} catch (err) {
  console.error('✖ Could not create 404.html', err);
}

