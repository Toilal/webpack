'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

const scriptLoadersOptions = {ts: {transpileOnly: true, appendTsSuffixTo: [/\.vue$/]}}

module.exports = {
  scriptLoadersOptions,
  loaders: Object.assign({},
    utils.scriptLoaders(scriptLoadersOptions),
    utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    })
  ),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
