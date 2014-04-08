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

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.static(__dirname))

http.createServer(app).listen(8081);

/*http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    console.log(request.method);
    if(request.method == "GET"){
        var filename = path.join(process.cwd(), uri);
        fs.exists(filename, function(exists) {
            console.log(filename);
            if(!exists) {
                console.log(err);
                return processPost(request,response);

                response.setHeader("404", {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }
             
            fs.readFile(filename, "binary", function(err, file) {
                if(err) {
                    console.log(err);
                    response.setHeader("500", {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                }
                console.log("MIMETYPE: " + mime.lookup(filename));
                response.setHeader("200", {"Content-Type": mime.lookup(filename)});
                response.write(file,"binary");
                response.end();
            });
        });
    }
    else if(request.method == "POST"){

        return processPost(request,response);
           
    }
}).listen(8080);*/

//https://gist.github.com/rpflorence/701407

processPost = function(request,response){
    console.log('process');
    
    var body = request.body;
    var url = request.url;
    //console.log(request);
    console.log(body);
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