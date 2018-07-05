// Global Components
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Custom Components
const webpack = require('webpack');
const path = require('path');

module.exports = merge.smart(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
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
        contentBase: './src/pages/',
        watchContentBase: true,
        index: 'pages/index.html',
        //compress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});
