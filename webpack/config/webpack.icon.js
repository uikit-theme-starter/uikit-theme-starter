const writeFilePlugin = require("write-file-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [{
	mode: "production",
	entry: "./webpack/icon.js",
	plugins: [
		new copyWebpackPlugin([
			{
				from: "./src/images/icon-set/*.svg",
				to: "../node_modules/uikit/src/images/icons/[name].[ext]",
				toType: "template",
				transform(content, path) {
					return content.toString("utf8").replace(/(<\?)(.+)(\?>)/, "").replace(/(<!--)(.+)(-->)/, "")
				}
			}
		], {debug: false}),
		new writeFilePlugin({
			test: /images/
		})
	]
}];
