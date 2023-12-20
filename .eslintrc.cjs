module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 1,
  },
  overrides: [
    {
      files: ['client/**/*.{ts,tsx,css}'],
      env: {
        browser: true,
        node: false,
      },
    },
    {
      files: ['server/**/*.{ts,tsx,css}'],
      env: {
        browser: false,
        node: true,
      },
    },
  ],
};
