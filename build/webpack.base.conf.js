'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('app'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const createTsLintingRule = () => ({
  test: /\.ts$/, // tslint doesn't support vue files
  enforce: 'pre',
  loader: 'tslint-loader',
  include: [resolve('src'), resolve('app'), resolve('test')],
  options: {
    formatter: 'grouped',
    formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
    typeCheck: true
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './app/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '#': resolve('app')
    },
    modules: [
      "node_modules"
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: config.dev.useTslint,
      watch: ['./src', './app'] // optional but improves performance (less stat calls)
    })
  ],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      
      ...(config.dev.useTslint ? [createTsLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: utils.scriptLoaders(vueLoaderConfig.scriptLoadersOptions).js,
        include: [resolve('src'), resolve('app'), resolve('test')]
      },
      {
        test: /\.ts$/,
        use: utils.scriptLoaders(vueLoaderConfig.scriptLoadersOptions).ts,
        include: [resolve('src'), resolve('app'), resolve('test')]
      },
      {
        test: /\.html?$/,
        loader: 'raw-loader' // Required for karma test runner
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
