// Global Components
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Custom Components
const webpack = require('webpack');
const path = require('path');
const writeFilePlugin = require('write-file-webpack-plugin');

module.exports = merge.smart(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'system/user/templates/default_site'),
        publicPath: '/system/user/templates/default_site/',
        filename: 'js/theme.js',
    },
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        stats: "minimal",
        open: true,
        hot: true,
        overlay: true,
        historyApiFallback: true,
        contentBase: './src/pages/web.group/',
        watchContentBase: true,
        index: 'web.group/index.html',
        //compress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new writeFilePlugin()
    ]
});
