import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import * as pkg from './package.json';
import sourcemaps from "rollup-plugin-sourcemaps";

export default {
    input: './src/index.ts',

    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ],

    external: Object.keys(pkg['dependencies'] || {}).concat(
        Object.keys(pkg["optionalDependencies"] || {})
    ),

    plugins: [typescript(), commonjs(), sourcemaps()]
};
