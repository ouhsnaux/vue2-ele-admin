module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'airbnb-base', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 0,
    'max-classes-per-file': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'func-names': 0,

    'import/prefer-default-export': 0,

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        endOfLine: 'lf',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.json', '.js'],
      },
    },
  },
};
