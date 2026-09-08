import { defineConfig } from 'oxlint';
import type { OxlintConfig } from 'oxlint';

const ignorePatterns = [
  '**/node_modules',
  '**/.next',
  '**/dist',
  '**/build',
  '**/out',
  '**/coverage',
  '**/.turbo',
  '**/.vercel',

  '**/__generated__',
  '**/_generated',
  '**/*.generated.*',

  '**/package-lock.json',
  '**/pnpm-lock.yaml',
  '**/yarn.lock',

  '**/components/ui/**',
] satisfies OxlintConfig['ignorePatterns'];

const overrides = [
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      'typescript/no-explicit-any': 'off',
      'no-empty-function': 'off',
    },
  },
] satisfies OxlintConfig['overrides'];

export default defineConfig({
  env: {
    browser: true,
  },

  options: {
    typeAware: true,
  },

  ignorePatterns,
  overrides,

  jsPlugins: ['@tanstack/eslint-plugin-query'],

  plugins: [
    'eslint',
    'typescript',
    'oxc',
    'import',
    'promise',
    'react',
    'jsx-a11y',
    'unicorn',
    'nextjs',
  ],

  rules: {
    // ============================================================
    // ESLint — correctness
    // ============================================================

    eqeqeq: 'error',
    curly: 'error',
    'array-callback-return': 'error',
    'no-constant-condition': 'error',
    'no-debugger': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-class-members': 'error',
    'no-fallthrough': 'error',
    'no-implied-eval': 'error',
    'no-invalid-regexp': 'error',
    'no-loss-of-precision': 'error',
    'no-redeclare': 'error',
    'no-self-assign': 'error',
    'no-throw-literal': 'error',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'object-shorthand': 'warn',

    // ============================================================
    // Accessibility
    // ============================================================

    'jsx-a11y/control-has-associated-label': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',

    // ============================================================
    // Imports
    // ============================================================

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-duplicates': 'error',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

    // ============================================================
    // OXC
    // ============================================================

    'oxc/approx-constant': 'error',
    'oxc/bad-array-method-on-arguments': 'error',
    'oxc/bad-char-at-comparison': 'error',
    'oxc/bad-comparison-sequence': 'error',
    'oxc/bad-min-max-func': 'error',
    'oxc/bad-object-literal-comparison': 'error',
    'oxc/bad-replace-all-arg': 'error',
    'oxc/const-comparisons': 'error',
    'oxc/double-comparisons': 'error',
    'oxc/erasing-op': 'error',
    'oxc/misrefactored-assign-op': 'error',
    'oxc/missing-throw': 'error',
    'oxc/number-arg-out-of-range': 'error',
    'oxc/uninvoked-array-callback': 'error',
    'oxc/no-accumulating-spread': 'error',

    // ============================================================
    // Promise
    // ============================================================

    'promise/no-multiple-resolved': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'error',

    // ============================================================
    // TypeScript
    // ============================================================

    'typescript/await-thenable': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/consistent-type-exports': 'error',

    'typescript/no-explicit-any': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',

    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/no-unnecessary-type-constraint': 'error',
    'typescript/no-unnecessary-type-conversion': 'error',
    'typescript/no-unnecessary-type-parameters': 'error',

    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-unsafe-return': 'error',
    'typescript/no-unsafe-argument': 'error',

    'typescript/restrict-template-expressions': 'error',
    'typescript/restrict-plus-operands': 'error',

    'typescript/only-throw-error': 'error',

    'typescript/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
        'ts-nocheck': true,
        'ts-check': false,
      },
    ],

    'typescript/prefer-as-const': 'error',

    'typescript/return-await': ['error', 'error-handling-correctness-only'],

    'typescript/switch-exhaustiveness-check': 'error',
    'typescript/unbound-method': 'error',

    // ============================================================
    // React
    // ============================================================

    'react/no-unstable-nested-components': 'error',
    'react/rules-of-hooks': 'error',
    'react/jsx-no-constructed-context-values': 'warn',

    // ============================================================
    // React Compiler
    // ============================================================

    'react/error-boundaries': 'error',
    'react/immutability': 'error',
    'react/incompatible-library': 'error',
    'react/preserve-manual-memoization': 'error',
    'react/purity': 'error',
    'react/refs': 'error',
    'react/set-state-in-effect': 'error',
    'react/set-state-in-render': 'error',
    'react/static-components': 'error',
    'react/use-memo': 'error',
    'react/unsupported-syntax': 'error',

    // ============================================================
    // Unicorn
    // ============================================================

    'unicorn/error-message': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-node-protocol': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-useless-spread': 'error',

    // ============================================================
    // TanStack Query
    // ============================================================

    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'error',
    '@tanstack/query/stable-query-client': 'error',
    '@tanstack/query/no-unstable-deps': 'error',
    '@tanstack/query/infinite-query-property-order': 'error',
    '@tanstack/query/no-void-query-fn': 'error',
    '@tanstack/query/mutation-property-order': 'error',
    '@tanstack/query/prefer-query-options': 'error',
  },
});
