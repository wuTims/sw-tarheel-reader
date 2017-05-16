var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackConfig = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: [
        'webpack-dev-server/client?http://127.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './client.js'
    ],
    output: {
        path: path.resolve('./build'),
        publicPath: '/public/',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    require.resolve('react-hot-loader'),
                    require.resolve('babel-loader')
                ]
            },
            { test: /\.json$/, loader: 'json-loader'},
            { test: /\.scss$/,
                loaders: [
                    "style",
                    "css",
                    "sass"
                ]
            },
            { test: /.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' }
        ]
    },
    node: {
        setImmediate: false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                BROWSER: JSON.stringify(true)
            }
        }),
        new CopyWebpackPlugin([
            { from: 'static' }
        ])

    ],
    devtool: 'eval'
};

module.exports = webpackConfig;
