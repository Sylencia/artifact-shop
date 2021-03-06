const OFF = 0, WARN = 1, ERROR = 2

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'immutable',
    'import',
    'jsx-a11y',
    'promise',
    'react',
    'standard',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'standard',
    'standard-react',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          'src/js',
        ],
      },
    },
  },
  rules: {
    'comma-dangle' : [ERROR, 'always-multiline'],
    'object-curly-spacing': [ERROR, 'always'],
    'object-shorthand': [ERROR, 'properties'],
    'max-len': [ERROR, 100],
    'generator-star-spacing': ['error', { before: true, after: true }],
    'immutable/no-mutation': OFF,
    'immutable/no-this': OFF,
    'import/extensions': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-unresolved': OFF,
    'import/prefer-default-export': OFF,
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-pascal-case': OFF,
    'react/forbid-prop-types': OFF,
    'space-before-function-paren': OFF,
    'no-extra-parens': OFF,
    'camelcase': OFF,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
          "every": [ "nesting", "id" ]
      },
      "allowChildren": true
    }],
  },
}
