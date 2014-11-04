var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var port = process.env.PORT || 1337;

//function start() {
  function onRequest(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World\n');
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
//}

//exports.start = start;