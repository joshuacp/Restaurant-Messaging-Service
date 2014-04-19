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
    console.log("SERVER");
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    console.log(req.method);
    if(req.method == "GET"){
        if(uri == "/Views/Show.html")
            console.log(req.headers.cookie);
        var filename = path.join(process.cwd(), uri);
        console.log(filename);
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          //file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
          return;
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

        return processPost(req,res, function(){
            req.end();
            return;
        });
        //req.url ="";
           
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
        var home = this;

        var db = new Database();
        if(url == "/usercreate")
            db.addUser(p);
        if(url == "/userlogin"){
            var stat = false;
            function s(){
                console.log('yeah');
                    db.validateUser(p,function(returnValue){
                    console.log('returned to Server ' + returnValue);
                    
                    if(returnValue){
                        console.log("return value good");
                        response.setHeader("Set-cookie", "user=" + JSON.stringify(("name=" + p.getName()+" "+"password=" + p.getPassword())) +";Path=/;");
                        
                        //response.setHeader("Redirect",  "location=" +{Location: ''});
                        //response.writeHead(302, {'Location': 'Views/Create.html'});
                        //console.log(request.url);
                        //response.write("Post is not implemented yet.");
                        //console.log("HEDERS" + response.headers);
                        var a = {Location:'http://localhost:44444/Views/Create.html'};
                        response.end("http://localhost:44444/Views/Show.html");

                    }
                    else{
                        console.log("BAD");
                    }

                });
            }
            s();
        }

    });
}
 
sys.puts("Server running at http://localhost:44444/");
