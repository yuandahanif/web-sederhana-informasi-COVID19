const marge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = marge(common, {
    mode: "development"
})