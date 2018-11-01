// Pug Dosyaları Tanımlayıcısı

const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const pugFiles = require('./pug-files.json').files.filter(a => a.indexOf('pages') > 0);

const plugins = [];
pugFiles.forEach((val) => {

	let pugfile = path.parse(val);
	let pugfileDirArray = pugfile.dir.split('/');
	let dir = pugfileDirArray[pugfileDirArray.length - 1];
	let dirstring = dir === 'pages' ? '' : `${dir}/`;
	let filename = `${dirstring}${pugfile.name}.html`;

	plugins.push(new htmlWebpackPlugin({
		filename: filename,
		hash: false,
		template: val,
		cache: false,
		alwaysWriteToDisk: true/*,
		inject: dir === 'web.group'*/
	}));
});

exports = module.exports = plugins;
