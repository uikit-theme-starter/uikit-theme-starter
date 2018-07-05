// Global Components
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Custom Components
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge.smart(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'system/user/templates/default_site'),
        publicPath: '/system/user/templates/default_site/',
        filename: 'js/theme.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/theme.css",
        })
    ]
});