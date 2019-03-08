// Pug Dosyaları Tanımlayıcısı

const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const plugins = [];
try {
	const pugFiles = require("./pug-files.json").files.filter(a => a.indexOf("pages") > 0);

	pugFiles.forEach((filePath) => {

		let fileInfo = path.parse(filePath);
		//let dir = fileInfo.dir.split(path.sep).pop();
		let dirstring = fileInfo.dir.replace(/src[\/\\]templates[\/\\]pages/, "");
		dirstring = dirstring ? dirstring.substr(1) + "/" : "";
		let filename = `${dirstring}${fileInfo.name}.html`;

		plugins.push(new htmlWebpackPlugin({
			filename: filename,
			hash: false,
			template: `.${path.sep}${filePath}`,
			cache: false,
			minify: {
				preserveLineBreaks: true,
				collapseWhitespace: false,
				removeComments: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: false
			},
			inject: true
		}));
	});
} catch (e) {
	const hotreloader = require("../server/hotreloader");
	hotreloader.activate();
	//console.error(e);
}

exports = module.exports = plugins;
