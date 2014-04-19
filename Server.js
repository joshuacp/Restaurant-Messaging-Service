var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
    mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/test');
    resID = 0;
    Restaurant = require("./DB/Restaurant.js");
    Database = require("./DB/Database.js");
    Person = require("./DB/Person.js");
    CalendarEvent = require("./DB/CalendarEvent.js");
    mime = require('mime');
    connect = require('connect');
    static = require('node-static');
    util = require('util');
    qs = require('querystring');
    $ = require('jquery')
    jsdom = require('jsdom');
    //db = new Database();


var file = new(static.Server)('./web/', { 
  cache: 600, 
  headers: { 'X-Powered-By': 'node-static' } 
});

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    console.log(req.method);
    if(req.method == "GET"){
        var filename = path.join(process.cwd(), uri);
        console.log(filename);
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

//http://www.sitepoint.com/serving-static-files-with-node-js/

function P(name,id,password,type) {


    this.name = name;

}

P.prototype.getName = function() {
    return this.name;
};


processPost = function(request,response){
    console.log('process');
   
    var body = '';
    request.on('data', function (data) {
        body += data;
        //console.log(body);
    });
    request.on('end', function () {

        var POST = JSON.parse(body);
        var p = new CalendarEvent();
        p.loadFromJSON(POST);

        
        //console.log("NAME: " + p.getName());
        var url = request.url;
        console.log(url);

        //console.log(body);

        //interpret cookies
        //decode the URI

        var db = new Database();
        if(url == "/user/create")
            db.addUser(p);
        if(url == "/user/login"){
            var stat = false;
            db.validateUser(p,function(response,returnValue){
                console.log('returned to Server');
                console.log(returnValue);
                if(returnValue){

                    response.header("Set-cookie", "user=" + p.getName() +";Path=/;");
                    response.setHeader("200", {"Content-Type": "text/plain"});
                    response.write("Post is not implemented yet.");
                    response.end();
                    return;

                }
                else{
                    console.log("BAD");
                }

            });
        }
    });
}
 
sys.puts("Server running at http://localhost:44444/");
