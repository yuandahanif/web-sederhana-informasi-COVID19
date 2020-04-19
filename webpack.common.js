const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'app'),
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : "bundle.js"
    },
    module: {
        rules: [
            {
            test: /\.css/,
            include: [
                path.resolve(__dirname, 'src/styles')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
            ]

        }
    ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template:'./src/template.html',
            filename:'index.html'
        })
    ]
};