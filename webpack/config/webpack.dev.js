const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('../html-add-functions/create-plugins');

// Dev
//const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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
		filename: "js/[name].bundle.js",
		//path: path.resolve("dist"),
		publicPath: "/",
		umdNamedDefine: true,
		libraryTarget: 'umd'
	},
	devServer: {
		stats: "minimal",
		progress: true,
		//contentBase: "dist",
		overlay: true,
		hot: true,
		historyApiFallback: true,
		//watchContentBase: true
	},
	devtool: "source-map",
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
						loader: "style-loader",
						options: {sourceMap: true}
					},
					{
						loader: "css-loader",
						options: {sourceMap: true}
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: 'webpack/config/postcss.config.js'
							},
							sourceMap: true
						}
					},
					{
						loader: "less-loader",
						options: {sourceMap: true}
					}
				]
			},
			// Sass Loader
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: "style-loader",
						options: {sourceMap: true}
					},
					{
						loader: "css-loader",
						options: {sourceMap: true}
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: 'webpack/config/postcss.config.js'
							},
							options: {sourceMap: true}
						}
					},
					{
						loader: "sass-loader",
						options: {sourceMap: true}
					}
				]
			},
			// Css Loader
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
						options: {sourceMap: true}
					},
					{
						loader: "css-loader",
						options: {sourceMap: true}
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: 'webpack/config/postcss.config.js'
							},
							options: {sourceMap: true}
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
	plugins: plugins
};
