const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('../html-add-functions/create-plugins');

// Prod
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const minifyPlugin = require("babel-minify-webpack-plugin");
const compressionPlugin = require("compression-webpack-plugin");
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let extraPlugin = [];

module.exports = env => {

	if(env.stats){
		extraPlugin.push(
			new bundleAnalyzerPlugin({
				generateStatsFile: true
			}));
	}

	return {
		entry: {
			"main": [
				//"core-js/fn/promise",
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
		mode: 'production',
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
			filename: "js/[name]-[hash].bundle.js",
			path: path.resolve(__dirname, "../../dist"),
			publicPath: "",
			libraryTarget: 'umd'
		},
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
									comments: false,
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
							loader: miniCssExtractPlugin.loader,
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
		plugins: [
			new optimizeCssAssetsWebpackPlugin(),
			new miniCssExtractPlugin({
				filename: "css/[name]-[contenthash].bundle.css",
			}),
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery"
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(env.NODE_ENV)
				}
			}),
			new minifyPlugin(),
			new compressionPlugin({
				algorithm: "gzip"
			})
		]
			.concat(htmlWebpackPlugin)
			.concat(extraPlugin)
	}
};
