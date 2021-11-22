'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'page-visit-counter.v.0.0.1.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin({
  //     // Use multi-process parallel running to improve the build speed
  //     // Default number of concurrent runs: os.cpus().length - 1
  //     parallel: true,
  //     // Enable file caching
  //     cache: true,
  //     sourceMap: true,
  //   })],
  // },
  plugins: [
    new VueLoaderPlugin()
  ]
}