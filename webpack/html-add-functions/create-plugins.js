// Pug Dosyaları Tanımlayıcısı

const glob = require('glob');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let pugs = glob.sync('./src/templates/pages/**/*.{pug,html}');
const plugins = [];
pugs.forEach((val) => {

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
