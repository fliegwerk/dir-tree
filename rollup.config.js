import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import * as pkg from './package.json';
import sourcemaps from 'rollup-plugin-sourcemaps';
import externals from 'rollup-plugin-node-externals';

export default {
	input: './src/index.ts',

	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
			exports: 'default'
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true
		}
	],

	plugins: [externals(), typescript(), commonjs(), sourcemaps()]
};
