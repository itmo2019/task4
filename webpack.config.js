const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
        './src/scripts/index.js',
        './src/styles/style.css'
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: ExtractPlugin.loader,
                        options: {
                            publicPath: (resoursePath, context) => {
                                return path.relative(path.dirname(resoursePath), context) + '/';
                            },
                            sourceMap: true
                        }
                    },
                    // 'style-loader',
                    'css-loader'
                ]
            }
            // ,
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             minimize: true
            //         }
            //     }]
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: 'Output Managment',
            template: "./src/index.html",
            filename: "./index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            inject: false
        }),
        new ExtractPlugin({
            filename: './styles/style.css'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            },
            {
                from: './src/favicon.ico',
                to: './favicon.ico'
            },
            {
                from: './src/data/mail.json',
                to: './data/mail.json'
            }
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
