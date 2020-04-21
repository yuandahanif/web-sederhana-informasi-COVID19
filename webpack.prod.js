const path = require('path');
const marge = require("webpack-merge")
const MinifyPlugin = require("babel-minify-webpack-plugin")
const CssCleanupPlugin = require('css-cleanup-webpack-plugin')
const common = require("./webpack.common.js")



module.exports = marge(common, {
    mode : "production",
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'api'),
                    path.resolve(__dirname, 'api-v2')
                ],
                use: [{
                        loader: 'babel-loader',
                        options : {
                            presets : ["@babel/preset-env"]
                        }
                    }
                ]
    
            }
        ]
    },
    plugins: [
        new MinifyPlugin({}, {
            exclude : ['./node_modules','./api','./api-v2']
        }),
        new CssCleanupPlugin()
      ]
})