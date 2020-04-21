const marge = require("webpack-merge")
const common = require("./webpack.common.js")
const NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = marge(common, {
    mode: "development",
    // plugins: [
    //     new NpmInstallPlugin({
    //       save: true,
    //       npm: 'npm'
    //     })
    //   ],
})