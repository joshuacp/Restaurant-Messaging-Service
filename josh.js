var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
    resID = 0;
    mime = require('mime');
    connect = require('connect');
    static = require('node-static');
    util = require('util');
    qs = require('querystring');
    //db = new Database();

var webroot = './web/',
  port = 44444;


var file = new(static.Server)(webroot, { 
  cache: 600, 
  headers: { 'X-Powered-By': 'node-static' } 
});

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    console.log(req.method);
    if(req.method == "GET"){
        var filename = path.join(process.cwd(), uri);
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end();
        }
      } else {
        console.log('%s - %s', req.url, res.message); 
      }
    });
    }
    else if(req.method == "POST"){

        return processPost(req,res);
           
    }
}).listen(44444);


 
sys.puts("Server running at http://localhost:8080/");
