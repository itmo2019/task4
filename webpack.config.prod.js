const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        './src/scripts/index.js',
        './src/styles/style.css'
    ],
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
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
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
        ])
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
