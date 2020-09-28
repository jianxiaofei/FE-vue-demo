const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@v', resolve('src/views'))
      .set('@c', resolve('src/components'))
      .set('@u', resolve('src/utils'))
      .set('@s', resolve('src/service')) /* 别名配置 */
      .set('@assets', resolve('src/assets')) /* 别名配置 */
      .set('@styl', resolve('src/assets/stylus')) /* 别名配置 */
    config.optimization.runtimeChunk('single')
  },
  devServer: {
    /* 本地ip地址 */
    host: '172.20.10.3',
    port: '1314',
    hot: true,
    /* 自动打开浏览器 */
    open: false,
    overlay: {
      warning: false,
      error: true,
    },
    /* 跨域代理 */
    proxy: {
      '/pdf': {
        /* 目标代理服务器地址 */
        target: 'http://image.cache.timepack.cn/', //
        /* 允许跨域 */
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/pdf': '', // 代理名称替换
        },
      },
    },
  },
}
