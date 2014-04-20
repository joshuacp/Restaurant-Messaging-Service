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
    console.log(req.method);
    if(req.method == "GET"){
        if(uri == "/Views/Login.html" || uri == "/Views/Create.html"
            || uri == "/Scripts/Communication/Communication.js"|| uri == "/Model/Person.js"){
            console.log("serving normal");
            serve(req,res);

        }
        else{
            console.log("serving cookies");
            console.log(uri);

            validateCookie(req,res,function(r){
                console.log('returned');
                console.log(r);
                if(r)
                    serve(req,res);
                else
                    console.log("NO GOOD");
            })

            

        }
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

function validateCookie(req,res,callback){

    var cookie = req.headers.cookie
            var cookies = parseCookies(req);
            
            if(cookies != null){
                var cook = cookies['user']
                console.log(JSON.parse(cook));
                p = new Person();
                p.loadFromJSON(JSON.parse(cook));
                db = new Database();
                db.validateUser(p,function(returnValue){

                    if(returnValue)
                        console.log('good');
                    else{
                        res.writeHead(302, {'Location': '/Views/Login.html'});
                        //res.end("http://localhost:44444/Views/Login.html");
                        console.log("BAD");
                        res.end();
                        callback(false);
                    }
                    console.log("R: " + returnValue);
                    callback(returnValue);
                    
                })
            }
            else{
                console.log('no cookie');
                 callback(false);
            }



}

function serve(req,res){
    var uri = url.parse(req.url).pathname;
    console.log(uri);
    var filename = path.join(process.cwd(), uri);
    console.log('Serving ' + filename);
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


processPost = function(request,response){
    console.log('process');
   
    var body = '';
    request.on('data', function (data) {
        body += data;
        //console.log(body);
    });
    request.on('end', function () {

        var POST = JSON.parse(body);
        var p = new Person();
        p.loadFromJSON(POST);

        var url = request.url;
        console.log(url);


        var db = new Database();
        if(url == "/user/create"){
            db.addUser(p);
            response.setHeader("Set-cookie", "user=" + JSON.stringify(p) +";Path=/;");
            response.end("http://localhost:44444/Views/CreateRestaurant.html");

        }
        else if(url == "/user/login"){
            db.validateUser(p,function(returnValue){
                
                if(returnValue){
                    response.setHeader("Set-cookie", "user=" + JSON.stringify(p) +";Path=/;");
                    response.end("http://localhost:44444/Views/Show.html");

                }
                else
                    console.log("BAD");

            });
        }
        else if(url == "/restaurant/join"){
            db.validateRestaurant(p,function(returnValue){
                
                if(returnValue){
                    response.setHeader("Set-cookie", "restaurant=" + JSON.stringify(p) +";Path=/;");
                    response.end("http://localhost:44444/Views/Show.html");

                }
                else
                    console.log("BAD");

            });

        }
         else if(url == "/restaurant/create"){
            console.log('okay');
            db.addRestaurant(p,function(cresponse){
                console.log("LAST: " + cresponse);
                p.setID(cresponse);
                console.log(p)
                response.setHeader("Set-cookie", "restaurant=" + JSON.stringify(p) +";Path=/;");
                response.end("http://localhost:44444/Views/Show.html");

            });


        }   

        

    });

}

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
    //http://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
}

 
sys.puts("Server running at http://localhost:44444/");
