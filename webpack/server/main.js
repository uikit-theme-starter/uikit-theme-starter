require("@babel/register");
const server = require("./express");
const hotReloader = require("./hotreloader");

hotReloader.activate(server);
server.start();
