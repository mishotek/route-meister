import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';

const config = [
    {
        input: [
            'src/index.js',
        ],
        output: {
            dir: 'public/',
            format: 'es',
        },
        plugins: [
            minifyHTML(),
            terser(),
        ],
    },
];

export default config;
