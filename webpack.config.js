var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.html$/,
                use: [
                    // apply multiple loaders and options
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        watchContentBase: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development'
        })
    ]
};