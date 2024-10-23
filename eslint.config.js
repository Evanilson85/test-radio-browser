import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ['node_modules', 'tailwind.config.js'],
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'no-dupe-args': 'warn',
      'no-var': 'warn',
      semi: 'warn',
      'no-debugger': 'error',
      'no-dupe-else-if': 'warn',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-sparse-arrays': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
];
