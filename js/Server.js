var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
    mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/test');
    resID = 0;
    Restaurant = require("./Restaurant.js");
    Employee = require("./Employee.js");
    Database = require("./Database.js");
    mime = require('mime');
    connect = require('connect');
    static = require('node-static');
    util = require('util');
    qs = require('querystring');
    //db = new Database();

/*

POST URLS:
create/manager
create/restaurant
create/employee

delete/restaurant
delete/person

join/restaurant

GET URLS:
index.html

event/calendar
event/messages

*/
/*
var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.static(__dirname))
  .createServer(



);
http.createServer(app).listen(8081);
*/
var webroot = '../web/',
  port = 8080;


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
}).listen(8080);

//http://www.sitepoint.com/serving-static-files-with-node-js/

processPost = function(request,response){
    console.log('process');
    
    var body = '';
    request.on('data', function (data) {
        body += data;
        console.log(body);
    });
    request.on('end', function () {

        var POST = qs.parse(body);
        body = POST;
        console.log(body);
        // use POST

    });

    var url = request.url;
    url.parse
    console.log(url);
    //interpret cookies
    //decode the URI



    

    /*
    //if()
    name = "";
    id = resID;
    password = "";

    var r = new Restaurant(name,id,password);
    var e = new Employee(name,id,password,"d");
    
    var db = new Database();
    console.log(db);
    db.deleteRestaurant("name");
    */
    //console.log(e.getType());
    response.setHeader("200", {"Content-Type": "text/plain"});
    response.write("Post is not implemented yet.");
    response.end();
    return;

}
 
sys.puts("Server running at http://localhost:8080/");