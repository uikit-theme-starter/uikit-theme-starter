const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const glob = require('glob');
const copyWebpackPlugin = require('copy-webpack-plugin');
const writeFilePlugin = require('write-file-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const mode = isProd ? 'production' : 'development';

const cssDev = ['style-loader', 'css-loader', 'less-loader'];
const cssProd = extractTextWebpackPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader',
        'less-loader'
    ]
});

const cssUse = isProd ? cssProd : cssDev;
let pugs = glob.sync('./src/pages/*.pug');
const plugins = [];
pugs.forEach((val) => {
    plugins.push(new htmlWebpackPlugin({
        filename: path.basename(val, '.pug') + '.html',
        hash: true,
        template: val
    }));
});

plugins.push(
    new extractTextWebpackPlugin({
        filename: 'css/theme.css',
        disable: !isProd,
        allChunks: true
    }),
    new copyWebpackPlugin([
        {
            from: "./src/images/iconset/*.svg",
            to: "../node_modules/uikit/src/images/icons/[name].[ext]",
            toType: 'template'
        }
    ], {debug: false})
);

if (!isProd) {
    plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new writeFilePlugin({
            test: /images/
        })
    )
}

module.exports = [{
    mode: mode,
    entry: './src/bundle.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/theme.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: cssUse
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: [
                    {loader: 'html-loader'},
                    {loader: "pug-html-loader", options: {pretty: true, exports: false}}
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'images/'
                    }
                }]
            }
        ]
    },
    devServer: {
        //compress: true,
        stats: "minimal",
        open: true,
        hot: true,
        overlay: true,
        //inline: true,
        historyApiFallback: true,
        contentBase: './src/pages/',
        watchContentBase: true
    },
    plugins: plugins
}];