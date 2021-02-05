import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
// import minifyHTML from 'rollup-plugin-minify-html-literals';
// import { terser } from 'rollup-plugin-terser';

const config = {
    input: 'app/app-root.js',
    output: {
        dir: 'dist/',
        format: 'es',
    },
    plugins: [
        // minifyHTML(),
        copy({
            targets: [
                { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
                { src: 'app/main.css', dest: 'dist' },
                { src: 'app/index.html', dest: 'dist' },
            ],
        }),
        resolve(),
        // terser(),
    ],
    preserveEntrySignatures: false,
    watch: {},
};

export default config;
