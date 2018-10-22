(function () {
	'use strict';
	const chokidar = require('chokidar');
	const fs = require('fs');

	function activate(server) {
		const watcher = chokidar.watch('src/templates/**/*.pug', {ignored: '*.js'});
		watcher.on('ready', function () {
			console.log('Initial scan complete. Ready for changes');
		});
		watcher.on('change', function (path) {
			console.log('File [' + path + '] changed !');
			// reload the client on file changes
			server.reloadClient();
		});
		watcher.on('add', function (path) {
			console.log(`Yeni dosya eklendi: ${path}`);
		});
	}

	// here we export an activate function to activate the watcher
	module.exports = {
		activate: activate,
	};
}());
