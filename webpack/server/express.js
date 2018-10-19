const express = require('express');
const path =  require('path');

const server = express();

const webpack = require("webpack");
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

server.listen(8080, ()=>{
	console.log('Sunucu adresi: http://localhost:8080')
});
