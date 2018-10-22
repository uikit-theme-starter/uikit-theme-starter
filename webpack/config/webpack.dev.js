const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('../html-add-functions/create-plugins');

// Dev
// const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery"
	}),
	/*new bundleAnalyzerPlugin({
		generateStatsFile: true
	}),*/
];

plugins = plugins.concat(htmlWebpackPlugin);

module.exports = {
	entry: {
		"main": [
			"./webpack/server/client.js",
			"./src/main.js"
		]
	},
	resolve: {
		alias: {
			'@': path.resolve('src'),
			'./@': path.resolve('src'),
			'src/js': '.'
		}
	},
	mode: 'development',
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					name: "vendor",
					chunks: "initial",
					minChunks: 2
				}
			}
		}
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "../../../dist"),
		publicPath: "/",
		libraryTarget: 'umd'
	},
	devServer: {
		stats: "minimal",
		progress: true,
		contentBase: "dist",
		overlay: true,
		hot: true,
		historyApiFallback: true,
		watchContentBase: true
	},
	devtool: "source-map",
	module: {
		rules: [
			//Javascript Loader
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options:
							{
								presets: [
									[
										'@babel/preset-env',
										{
											targets: 'last 5 versions',
											modules: 'umd'
											//debug: true
										}
									]
								],
								"plugins": ["@babel/plugin-transform-runtime"]
							}
					},
				],
				exclude: [/node_modules/]
			},
			// Less Loader
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "less-loader"
					}
				]
			},
			// Pug Loader
			{
				test: /\.pug$/,
				use: [
					{
						loader: "html-loader",
						options: {
							attrs: [
								'img:src',
								'section:data-src',
								'div:data-src',
								'img:data-src',
								'video:src',
								'source:src',
								'link:href'
							],
							interpolate: true
						}
					},
					{
						loader: "pug-html-loader",
						options: {
							pretty: true,
							exports: false
						}
					}
				]
			},
			// Image Loader
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [{
					loader: "file-loader",
					options: {
						name: 'images/[path][name]-[hash:8].[ext]',
						context: 'src/images'
					}
				}]
			},
		]
	},
	plugins: plugins
};


function reloadHtml() {
	this.plugin('compilation',
		thing => thing.plugin('html-webpack-plugin-after-emit', trigger));
	const cache = {};
	function trigger(data, callback) {
		const orig = cache[data.outputName];
		const html = data.html.source();
		// plugin seems to emit on any unrelated change?
		if (orig && orig !== html)
			devServer.sockWrite(devServer.sockets, 'content-changed');
		cache[data.outputName] = html;
		callback();
	}
}
