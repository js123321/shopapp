module.exports = {
  // 配置代理
  devServer: {
    proxy: 'http://192.168.1.4:8080'
  },
  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components',
        network: '@/network',
        common: '@/common',
        assets: '@/assets'
      }
    }
  }
}
