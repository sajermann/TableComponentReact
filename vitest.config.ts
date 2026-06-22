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
        '**/constants/**',
        'src/pages/TableMega/Sort/components/index.ts',
        'src/components/Button/hooks/index.ts',
        "components/index.ts",
        "components/Filter/index.ts",
        "components/Input/utils/index.ts",
        "hooks/index.ts",
        "hooks/useDarkMode/utils/index.ts",
        "hooks/useFontSize/utils/index.ts",
        "packages/Table/index.ts",
        "packages/Table/components/Button/hooks/index.ts",
        "packages/Table/components/Input/utils/index.ts",
        "packages/Table/utils/index.ts",
        "packages/TableMega/index.ts",
        "packages/TableMega/components/Button/hooks/index.ts",
        "packages/TableMega/components/Input/utils/index.ts",
        "packages/TableMega/hooks/index.ts",
        "packages/TableMega/utils/index.ts",
        "pages/TableMega/Pagination/components/index.ts",
        "pages/TableMega/Pagination/hook/index.ts",
        "pages/TableMega/Pagination/utils/index.ts",
        "pages/TraditionalPattern/Pagination/components/index.ts",
        "pages/TraditionalPattern/Pagination/hook/index.ts",
        "pages/TraditionalPattern/Pagination/utils/index.ts",
        "pages/TraditionalPattern/Sort/components/index.ts",
        "utils/index.ts",
      ],
    },
    unstubEnvs: true,
  },
});
