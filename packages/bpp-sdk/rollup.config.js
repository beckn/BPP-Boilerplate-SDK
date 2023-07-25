import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { defineConfig } from 'rollup';

const config = defineConfig([
    {
        input: 'src/index.ts',
        plugins: [esbuild.default()],
        output: {
            file: 'out/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    },
    {
        input: './dist/dts/index.d.ts',
        plugins: [dts.default()],
        output: {
            file: 'out/index.d.ts',
            format: 'es'
        }
    }
])

export default config