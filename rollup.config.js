import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import fileSize from 'rollup-plugin-filesize'

export default {
  input: './src/index.js',

  output: {
    sourcemap: true,
    file: './lib/index.js',
    format: 'cjs',
  },

  external: ['react'],

  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true,
    }),

    babel({
      exclude: 'node_modules/**',
    }),

    commonjs({
      namedExports: {
        react: ['Component', 'PureComponent', 'createElement', 'default'],
      },
    }),
    fileSize(),
  ],
}
