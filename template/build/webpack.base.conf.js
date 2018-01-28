'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
{{#if_eq compiler "typescript"}}
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
{{/if_eq}}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

{{#lint}}const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'){{#if_eq projectType "lib"}}, resolve('app'){{/if_eq}}, resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
}){{/lint}}
{{#tslint}}
const createTsLintingRule = () => ({
  test: /\.ts$/, // tslint doesn't support vue files
  enforce: 'pre',
  loader: 'tslint-loader',
  include: [resolve('src'),{{#if_eq projectType "lib"}} resolve('app'),{{/if_eq}} resolve('test')],
  options: {
    formatter: 'grouped',
    formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
    typeCheck: true
  }
}){{/tslint}}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './{{#if_eq projectType "lib"}}app{{else}}src{{/if_eq}}/main.{{#if_eq compiler "typescript"}}ts{{else}}js{{/if_eq}}'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.vue', '.js', {{#if_eq compiler "typescript"}}'.ts', {{/if_eq}}'.json'],
    alias: {
      {{#if_eq build "standalone"}}
      'vue$': 'vue/dist/vue.esm.js',
      {{/if_eq}}
      '@': resolve('src'){{#if_eq projectType "lib"}},
      '#': resolve('app'){{/if_eq}},
    },
    modules: [
      "node_modules"
    ]
  },{{#if_eq compiler "typescript"}}
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      vue: true,{{#tslint}}
      tslint: config.dev.useTslint,{{/tslint}}
      watch: {{#unless_eq projectType "lib"}}'./src'{{/unless_eq}}{{#if_eq projectType "lib"}}['./src', './app']{{/if_eq}} // optional but improves performance (less stat calls)
    })
  ],{{/if_eq}}
  module: {
    rules: [
      {{#lint}}
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {{/lint}}{{#tslint}}
      ...(config.dev.useTslint ? [createTsLintingRule()] : []),
      {{/tslint}}
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: utils.scriptLoaders(vueLoaderConfig.scriptLoadersOptions).js,
        include: [resolve('src'),{{#if_eq projectType "lib"}} resolve('app'),{{/if_eq}} resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {{#if_eq compiler "typescript"}}
      {
        test: /\.ts$/,
        use: utils.scriptLoaders(vueLoaderConfig.scriptLoadersOptions).ts,
        include: [resolve('src'),{{#if_eq projectType "lib"}} resolve('app'),{{/if_eq}} resolve('test')]
      },
      {{/if_eq}}
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
