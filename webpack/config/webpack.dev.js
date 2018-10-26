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
			// Sass Loader
			{
				test: /\.s[ac]ss$/,
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
						loader: "sass-loader"
					}
				]
			},
			// Css Loader
			{
				test: /\.css$/,
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
			// Html Loader
			{
				test: /\.html$/,
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
