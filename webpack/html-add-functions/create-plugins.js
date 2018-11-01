// Pug Dosyaları Tanımlayıcısı

const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pugFiles = require('./pug-files.json').files.filter(a => a.indexOf('pages') > 0);

const plugins = [];
pugFiles.forEach((filePath) => {

	let fileInfo = path.parse(filePath);
	let dir = fileInfo.dir.split(path.sep).pop();
	let dirstring = dir === 'pages' ? '' : `${dir}/`;
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
		}/*,
		inject: dir === 'web.group'*/
	}));
});

exports = module.exports = plugins;
