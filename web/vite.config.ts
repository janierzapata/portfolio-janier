import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Año del build: el primer render en el navegador lo usa para calzar con el
  // HTML prerenderizado (ver src/hooks/useCurrentYear.ts).
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  server: { port: 5173 },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Nada inline: la CSP de producción es `script-src 'self'`, y un
    // módulo pequeño convertido a data: URI la rompería sin avisar.
    assetsInlineLimit: 0,
  },
});
