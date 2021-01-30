module.exports = {
    env: {
        browser: true,
        es2021: true,
        'jest/globals': true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    rules: {
        indent: ['error', 4],
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
        'no-return-assign': 0,
        'linebreak-style': 0,
        'no-plusplus': 0,
        'no-empty-function': 0,
        'no-useless-constructor': 0,
        'no-unused-vars': ['error', { args: 'none' }],
    },
};
