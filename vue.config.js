const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-currency-converter-spa/'  // Замените на ваше имя репозитория
    : '/'
})
