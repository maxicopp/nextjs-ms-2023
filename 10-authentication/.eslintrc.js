module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/no-unresolved': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-undef': ['error', { typeof: true }],
    'react/prop-types': 'off',
    'no-unused-vars': 'error',
  },
};
