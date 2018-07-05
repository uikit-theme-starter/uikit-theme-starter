// Webpack
const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

// Pug Dosyaları Tanımlayıcısı

const glob = require('glob');

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


module.exports = {
    entry: [
        './src/bundle.js'
    ],
    plugins: plugins,
    module: {
        rules: [
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
    /*plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },*/
};