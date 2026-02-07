// Default imports
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

// React related
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

// Prettier related
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-plugin-prettier';

// TypeScript related
import tseslint from 'typescript-eslint';

// Export the ESLint configuration
export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'public/mockServiceWorker.js',
    ],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, react, reactHooks, reactRefresh, prettier, tseslint },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
