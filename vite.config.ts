import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import Pages from 'vite-plugin-pages';

export default defineConfig(({ mode }) => {
  const { VITE_URL_BASENAME } = { ...loadEnv(mode, process.cwd()) };
  console.log({ VITE_URL_BASENAME, mode });

  return {
    base: `/${VITE_URL_BASENAME}`,

    server: {
      port: 5000,
      host: true,
    },
    preview: {
      port: 8080,
      host: true,
    },
    plugins: [
      {
        name: 'coverage-summary-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.includes('/__coverage-summary')) {
              const coveragePath = path.resolve(
                process.cwd(),
                'coverage',
                'coverage-summary.json',
              );
              if (fs.existsSync(coveragePath)) {
                res.setHeader('Content-Type', 'application/json');
                res.end(fs.readFileSync(coveragePath, 'utf-8'));
                return;
              }
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Not found' }));
              return;
            }
            next();
          });
        },
      },
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      Pages(),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        html2canvas: 'html2canvas-pro',
      },
    },
    define: {
      'import.meta.env.VITE_PROJECT_ROOT': JSON.stringify(
        process.cwd().replace(/\\/g, '/'),
      ),
    },
  };
});
