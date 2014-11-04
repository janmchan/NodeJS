var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

function start() {
  function onRequest(request, response) {
     var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }
         
        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
             
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;