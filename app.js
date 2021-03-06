var fs = require("fs"),
    http = require("http"),
    path = require("path");


http.createServer(function(request, response) {
    var fileName = "index.html",
        contentType = "text/html";

    if (request.url !== "/") {
        var extName = path.extname(request.url);
        fileName = request.url.replace("/", "");
        switch (extName) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }
    }

    fs.readFile(fileName, function(err, data) {
        response.writeHead("200", {
            "content-type": contentType
        });
        response.end(data);
    });
}).listen(8001);

console.log("Server Started 80010 new");
