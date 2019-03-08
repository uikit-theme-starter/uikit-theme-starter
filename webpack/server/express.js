const express = require("express");
const webpack = require("webpack");
const fp = require("find-free-port");

function createServer() {
	const server = express();

	const config = require("../config/webpack.dev");

	const compiler = webpack(config);

	const webpackDevMiddleware = require("webpack-dev-middleware")(
		compiler,
		config.devServer
	);

	const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

	server.use(webpackDevMiddleware);
	server.use(webpackHotMiddleware);

	const staticMiddleware = express.static("dist");

	server.use(staticMiddleware);

	function startServer() {
		fp(8080).then(([freePort]) => {
			server.listen(freePort, (error) => {
				if (error) {
					console.error(error);
					return;
				}
				console.log(`Sunucu adresi: http://localhost:${freePort}`);
			});
		}).catch((err) => {
			console.error(err);
		});
	}

	function reloadClient() {
		webpackHotMiddleware.publish({action: "reload"});
	}

	return {
		start: startServer,
		reloadClient: reloadClient,
	};
}

module.exports = createServer();
