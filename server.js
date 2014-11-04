var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

var port = process.env.PORT || 1337;

//function start() {
  function onRequest(request, response) {
      try
      {
            var uri = url.parse(request.url).pathname;
            var filename = path.join(process.cwd(), uri);
            if(filename === '/')
            {
                 response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write("Welcome to Jan's Node JS Website");
                    response.end();
                    return;                
            }
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
      catch(ex)
      {
           response.writeHead(200, {"Content-Type": "text/plain"});
                    response.write("Error has occured please see message.\n");
                    response.write(ex.Message);
                    response.end();
                    return;
      }
   
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
//}

//exports.start = start;