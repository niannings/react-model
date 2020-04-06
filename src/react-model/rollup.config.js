import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

const commonTerser = terser({
    compress: {
        // remove console.log
        // eslint-disable-next-line @typescript-eslint/camelcase
        pure_funcs: ['console.log']
    },
    output: {
        // add comment on the top
        preamble: `/*! ${pkg.name} - v${
            pkg.version
        } - ${new Date().toLocaleDateString()} https://niannings.github.io */`
    }
});

const plugins = [
    eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['packages/**'],
        exclude: ['node_modules/**', '**/*.css']
    }),
    typescript(),
    babel({
        extensions: ['.js', '.ts', '.tsx'],
        exclude: 'node_modules/**'
    }),
    postcss({
        // extract: true,
        // minimize: true
    })
];

export default [
    {
        input: 'packages/index.ts',
        output: {
            dir: 'lib',
            format: 'umd',
            name: 'reactModel',
            assetFileNames: 'lib/[name].[ext]',
            plugins: [
                commonTerser
            ]
        },
        plugins
    },
    {
        input: [
            'packages/index.ts',
            'packages/two-way-binding/two-way-binding.ts',
            'packages/hooks/useStates.ts',
            'packages/model-validator/useModelValidator.ts'
        ],
        output: [
            {
                dir: 'dist',
                format: 'es',
                assetFileNames: 'dist/[name].[ext]',
            },
            {
                dir: 'es',
                format: 'es',
                assetFileNames: 'es/[name].[ext]',
                plugins: [commonTerser]
            }
        ],
        plugins,
        external: ['ract', 'react-dom']
    }
];
