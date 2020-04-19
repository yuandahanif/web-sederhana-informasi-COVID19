const marge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = marge(common, {
    mode : "production",
    module : {
        rules : [
            {
                test: /\.js$/,
                exclude: ["/node_modules/", "/src/"],
                use: [{
                        loader: 'babel-loader',
                        options : {
                            presets : ["@babel/preset-env"]
                        }
                    }
                ]
    
            }
        ]
    }
})