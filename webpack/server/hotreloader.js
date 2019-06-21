(function () {
	"use strict";
	const chokidar = require("chokidar");
	const fs = require("fs");

	function arraysEqual(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;
		a.forEach((el) => {
			if (b.indexOf(el) < 0) {
				return false;
			}
		});
		b.forEach((el) => {
			if (a.indexOf(el) < 0) {
				return false;
			}
		});
		return true;
	}

	function activate(server) {
		const watcher = chokidar.watch("src/templates/", {ignored: /.(css|js|less)/});

		const jsonFilePath = "./webpack/html-add-functions/pug-files.json";
		let pugPaths = {files: []};
		let ready = false;

		watcher.on("ready", function () {
			fs.readFile(jsonFilePath, "utf8", function (err, data) {
				let dataArray = [];
				if (err) {
					if (err.code === "ENOENT") {
						fs.open(jsonFilePath, "wx", () => {
						});
					} else {
						throw err;
					}
				} else {
					data = data === undefined || data === "" ? '{"files":[]}' : data;
					dataArray = JSON.parse(data).files;
				}
				if (!arraysEqual(dataArray, pugPaths.files)) {
					fs.writeFile(jsonFilePath, JSON.stringify(pugPaths), "utf8", (err) => {
						if (err) {
							console.log(err);
						}
					});
				}
				ready = true;
			});
		});
		watcher.on("change", function () {
			server.reloadClient();
		});
		watcher.on("add", function (path) {
			pugPaths.files.push(path.replace(/[\\]/g, "/"));
			if (ready) {
				fs.writeFile(jsonFilePath, JSON.stringify(pugPaths), "utf8", (err) => {
					if (err) {
						console.log(err);
					}
				});
			}
		});
		watcher.on("unlink", function (path) {
			let index = pugPaths.files.indexOf(path.replace(/[\\]/g, "/"));
			if (index > -1) {
				pugPaths.files.splice(index, 1);
			}
			if (ready) {
				fs.writeFile(jsonFilePath, JSON.stringify(pugPaths), "utf8", (err) => {
					if (err) {
						console.log(err);
					}
				});
			}
		});
	}

	// here we export an activate function to activate the watcher
	module.exports = {
		activate: activate,
	};
}());
