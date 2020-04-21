const path = require('path')
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/js', 'index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            "./images/layers.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/layers.png"
            ),
            "./images/layers-2x.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/layers-2x.png"
            ),
            "./images/marker-icon.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-icon.png"
            ),
            "./images/marker-icon-2x.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-icon-2x.png"
            ),
            "./images/marker-shadow.png$": path.resolve(
                __dirname,
                "./node_modules/leaflet/dist/images/marker-shadow.png"
            )
        }
    },

    module: {
        rules: [
            { // ! font Css loader
                test: /\.(sa|sc|c)ss$/,
                include: [path.resolve(__dirname, 'src/font')],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            { // ! font File loader
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'api'),
                    path.resolve(__dirname, 'api-v2'),
                    path.resolve(__dirname, 'src/images')
                ],
                loader: 'url-loader?limit=100000',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            { // ! untuk leaflet
                test: /\leaflet.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            { // ! css loader
                test: /\.css$/,
                exclude: [
                    /\leaflet.css$/,
                    path.resolve(__dirname, 'src/font'),
                    // path.resolve(__dirname, 'node_modules')
                ],
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        // options: {
                        //     modules: true
                        // }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            { //! images file 
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader",
                exclude : [path.resolve(__dirname, 'src/images/leaflet')],
                options: {
                    name: 'images/[contenthash].[ext]',
                  },
            },
            { //! images file in node_module (leaflet)
                test: /\.(jpe?g|png|gif|svg)$/i,
                include : [path.resolve(__dirname, 'src/images/leaflet')],
                loader: "file-loader",
                options: {
                    name: 'images/leaflet/[name].[ext]',
                  },
            },
            { //! html file loader
                test: /\.(html)$/i,
                loader: "file-loader",
                include: [
                    path.resolve(__dirname, 'src/page')
                ],
                options: {
                    name: '/page/Shell App/[name].[ext]',
                  },
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};