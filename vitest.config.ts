/// <reference types="vitest" />

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

function getVitestToken(): string | null {
  const possiblePaths = [
    // Windows AppData/Local
    process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, 'vitest', '.vitest-secret-token')
      : null,
    // Linux / Mac / WSL
    path.join(
      os.homedir(),
      '.local',
      'share',
      'vitest',
      '.vitest-secret-token',
    ),
    // Fallback dentro do node_modules do projeto
    path.join(process.cwd(), 'node_modules', '.vitest', '.vitest-secret-token'),
  ].filter(Boolean) as string[];
  for (const tokenPath of possiblePaths) {
    try {
      if (fs.existsSync(tokenPath)) {
        return fs.readFileSync(tokenPath, 'utf-8').trim();
      }
    } catch {}
  }
  return null;
}

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/config/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      exclude: [
        '**/node_modules/**',
        '**/types/**',
        'src/config/**',
        '**/*.type.ts',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/assets/**',
        '**/interface/**',
        'src/index.tsx',
        '**/constants/**',
        'src/pages/TableMega/Sort/components/index.ts',
        'src/components/Button/hooks/index.ts',
        'components/index.ts',
        'components/Filter/index.ts',
        'components/Input/utils/index.ts',
        'hooks/index.ts',
        'hooks/useDarkMode/utils/index.ts',
        'hooks/useFontSize/utils/index.ts',
        'packages/Table/index.ts',
        'packages/Table/components/Button/hooks/index.ts',
        'packages/Table/components/Input/utils/index.ts',
        'packages/Table/utils/index.ts',
        'packages/TableMega/index.ts',
        'packages/TableMega/components/Button/hooks/index.ts',
        'packages/TableMega/components/Input/utils/index.ts',
        'packages/TableMega/hooks/index.ts',
        'packages/TableMega/utils/index.ts',
        'pages/TableMega/Pagination/components/index.ts',
        'pages/TableMega/Pagination/hook/index.ts',
        'pages/TableMega/Pagination/utils/index.ts',
        'pages/TraditionalPattern/Pagination/components/index.ts',
        'pages/TraditionalPattern/Pagination/hook/index.ts',
        'pages/TraditionalPattern/Pagination/utils/index.ts',
        'pages/TraditionalPattern/Sort/components/index.ts',
        'utils/index.ts',
      ],
    },
    unstubEnvs: true,
  },
  plugins: [
    {
      name: 'vitest-token-auto-open',
      configureServer(server) {
        const open = server.config.server.open;
        if (typeof open === 'string' && open.startsWith('/__vitest__')) {
          const token = getVitestToken();
          if (token && !open.includes('token=')) {
            server.config.server.open = `${open}${open.includes('?') ? '&' : '?'}token=${token}`;
          }
        }
      },
    },
  ],
});
