const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('../html-add-functions/create-plugins');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
			path: path.resolve("dist"),
			publicPath: env.local ?  "" : "/",
			umdNamedDefine: true,
			libraryTarget: 'umd'
		},
		module: {
			rules: [
				// Javascript Loader
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
												targets: "> 1%, not dead",
												modules: 'umd'
												//debug: true
											}
										]
									],
									comments: false,
									plugins: ["@babel/plugin-transform-runtime"]
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
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								config: {
									path: 'webpack/config/postcss.config.js'
								}
							}
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
							loader: miniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								config: {
									path: 'webpack/config/postcss.config.js'
								}
							}
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
							loader: miniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader"
						},
						{
							loader: "postcss-loader",
							options: {
								config: {
									path: 'webpack/config/postcss.config.js'
								}
							}
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
									':src',
									':data-src',
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
									':src',
									':data-src',
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
				// Font Loader
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					use: [{
						loader: "file-loader",
						options: {
							name: 'fonts/[path][name].[ext]',
							context: 'src/fonts'
						}
					}]
				},
				// Media Loader (Video and Audio)
				{
					test: /\.(mp4|mov|webm|ogg|flac)$/i,
					use: [{
						loader: 'file-loader',
						options: {
							name: 'media/[path][name]-[hash:8].[ext]',
							outputPath: 'src/files/media/'
						}
					}]
				},
				// Document Loader
				{
					test: /\.(pdf|doc?x|xls)$/i,
					use: [{
						loader: 'file-loader',
						options: {
							name: 'docs/[path][name].[ext]',
							outputPath: 'src/files/docs'
						}
					}]
				},
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new optimizeCssAssetsWebpackPlugin(),
			new webpack.HashedModuleIdsPlugin(),
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
