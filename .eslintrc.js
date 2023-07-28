module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'prettier',
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'prettier/prettier': ['error', { singleQuote: true, semi: false, tabWidth:2, trailingComma: 'none' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/prop-types': 'off',
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    },
}
