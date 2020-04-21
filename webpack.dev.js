const marge = require("webpack-merge")
const common = require("./webpack.common.js")
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = marge(common, {
    mode: "development",
    plugins: [
        new BundleAnalyzerPlugin()
      ],
})