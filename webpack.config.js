// Adding webpack
const webpack = require('webpack');

const writeFilePlugin = require('write-file-webpack-plugin');
// Mode
const envMode = process.env.MODE;
if (process.env.ICON) {
    const copyWebpackPlugin = require('copy-webpack-plugin');
    module.exports = [{
        mode: 'production',
        entry: './src/icon.js',
        plugins: [
            new copyWebpackPlugin([
                {
                    from: './src/images/iconset/*.svg',
                    to: '../node_modules/uikit/src/images/icons/[name].[ext]',
                    toType: 'template'
                }
            ], {debug: false}),
            new writeFilePlugin({
                test: /images/
            })
        ]
    }];
} else {
    const htmlWebpackPlugin = require('html-webpack-plugin');
    const path = require('path');
    const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
    const glob = require('glob');

    const isProd = process.env.NODE_ENV === 'production';
    const mode = isProd ? 'production' : 'development';

    let distFolder = 'dist';
    let contentBase = './src/pages/';
    let index = 'pages/index.html';
    let publicPath = isProd ? "" : "/";

    const cssDev = ['style-loader', 'css-loader', 'less-loader'];
    const cssProd = extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            'less-loader'
        ]
    });

    const cssUse = isProd ? cssProd : cssDev;
    let pugs = glob.sync('./src/pages/**/*.pug');
    const plugins = [];
    pugs.forEach((val) => {
        let pugfile = path.parse(val);
        let pugfileDirArray = pugfile.dir.split('/');
        let dir = pugfileDirArray[pugfileDirArray.length - 1];
        let dirstring = dir === 'pages' ? '' : `${dir}/`;
        let filename = `${dirstring}${pugfile.name}.html`;
        plugins.push(new htmlWebpackPlugin({
            filename: filename,
            hash: true,
            template: val,
            cache: false
        }));
    });

    plugins.push(
        new extractTextWebpackPlugin({
            filename: 'css/theme.css',
            disable: !isProd,
            allChunks: true
        })
    );

    if (!isProd) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        )
    }

    switch (envMode) {
        case "ee4":
            distFolder = 'system/user/templates/default_site';
            publicPath = `/${distFolder}/`;
            break;
        case 'ee4dev':
            distFolder = 'system/user/templates/default_site';
            contentBase = './src/pages/web.group/';
            publicPath = `/${distFolder}/`;
            index = 'web.group/index.html';
            plugins.push(new writeFilePlugin());
            break;
    }

    module.exports = [{
        mode: mode,
        entry: [
            './src/bundle.js',
            'webpack-dev-server/client?http://www.test.foriba.com/:80',
            'webpack/hot/only-dev-server'
        ],
        output: {
            path: path.resolve(__dirname, distFolder),
            publicPath: publicPath,
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
                    use: [
                        {loader: 'string-replace-loader', options: {search: '\\n', replace: ''}},
                        {loader: 'babel-loader', options: {presets: ['es2015']}},
                    ],
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
                },
                {
                    test: /\.(mp4)$/i,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            outputPath: 'videos/'
                        }
                    }]
                }
            ]
        },
        devServer: {
            stats: "minimal",
            open: true,
            hot: true,
            overlay: true,
            historyApiFallback: true,
            contentBase: contentBase,
            watchContentBase: true,
            index: index,
            compress: true
        },
        plugins: plugins,
        watchOptions: {
            ignored: /node_modules/
        }
    }];
}