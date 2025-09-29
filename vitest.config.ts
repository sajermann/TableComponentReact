/// <reference types="vitest" />
import * as path from 'path';
import { defineConfig } from 'vitest/config';

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
      reporter: ['text', 'lcov', 'html'],
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
      ],
    },
  },
});
