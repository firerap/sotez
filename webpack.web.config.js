const path = require('path'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const TerserPlugin = require('terser-webpack-plugin'); // eslint-disable-line

module.exports = {
  target: 'web',
  mode: 'production',
  resolve: {
    extensions: ['.js'],
    modules: [__dirname, 'node_modules'],
    alias: {
      ledger$: path.join(__dirname, 'build', 'ledger-web.js'),
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
  ],
  entry: {
    main: ['regenerator-runtime/runtime', path.join(__dirname, 'build', 'index.js')],
  },
  output: {
    path: path.join(__dirname, 'dist', 'web'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
};
