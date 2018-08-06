// Global Components
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// Custom Components
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge.smart(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/theme.js',
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js($|\?)/i
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {minimize: true}
					},
					'postcss-loader',
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
