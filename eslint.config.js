import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      camelcase: ['warn', { properties: 'always' }],
      'capitalized-comments': [
        'warn',
        'always',
        {
          ignorePattern: 'pragma|ignored',
          ignoreInlineComments: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
          allowSeparatedGroups: false,
        },
      ],
      curly: 'error',
      'default-case': 'error',
      'no-await-in-loop': 'error',
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-useless-assignment': 'error',
      'default-param-last': 'error',
      'no-console': 'error',
      'no-empty-function': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'max-depth': ['error', 2],
      'max-nested-callbacks': ['error', 2],
      'max-lines': ['error', { max: 150, skipComments: true }],
      'init-declarations': ['error', 'always'],
      'block-scoped-var': 'warn',
      'dot-notation': 'warn',
      'id-length': ['warn', { min: 3 }],
      'no-alert': 'warn',
      'prefer-const': 'warn',
      'prefer-destructuring': 'warn',
      'prefer-template': 'warn',
      'no-implicit-globals': 'error',
      'no-multi-assign': 'error',
      'no-nested-ternary': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-unneeded-ternary': 'error',
      'no-shadow': [
        'error',
        {
          builtinGlobals: false,
          hoist: 'functions',
          ignoreOnInitialization: false,
        },
      ],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      eqeqeq: 'error',
    },
  }
);
