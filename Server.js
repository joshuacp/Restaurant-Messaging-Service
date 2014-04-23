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
    Task = require("./DB/Task.js");
    CalendarEvent = require("./DB/CalendarEvent.js");
    Message = require("./DB/Message.js");
    mime = require('mime');
    connect = require('connect');
    static = require('node-static');
    util = require('util');
    qs = require('querystring');
    $ = require('jquery')
    jsdom = require('jsdom');
    //db = new Database();
    host = "162.243.88.146";


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
            || uri == "/Scripts/Communication/Communication.js"|| uri == "/Model/Person.js" || 
            uri == "/Model/Restaurant.js" || isCSSData(uri) ){
            console.log("serving normal");
            serve(req,res);

        }
        else if(uri == "/Views/CreateRestaurant.html" || uri == "/Views/LoginRestaurant.html"){
            validateUserCookie(req,res,function(r){
                if(r)
                    serve(req,res);
                else
                    console.log("No GooD");

            })

        }
        else if(uri == "/get/tasks"){
            validateCookies(req,res,function(r){

                if(r){
                    var u = new Person();
                    var s = JSON.parse(getCookie(req,"user"));
                    u.loadFromJSON(s);
                    var db = new Database();
                    console.log(u);
                    db.getTasks(u.getRestaurantID(),function(ret){
                        console.log("BACK: " + ret);
                        var a = [];
                        if(ret == null || ret == ""){
                            console.log("EMPTY: " + JSON.stringify(a));
                            res.end(JSON.stringify(a));
                            return;
                        }
                        res.end(JSON.stringify(ret));
                    });
                    
                }
                else{

                }
            })
        }
        else if(uri == "/get/calendar"){
            console.log("IN GET CAL");
                    var date = new Date();

            validateCookies(req,res,function(r){

                if(r){
                    var u = new Person();
                    var s = JSON.parse(getCookie(req,"user"));
                    u.loadFromJSON(s);
                    var db = new Database();
                    console.log(u);
                    db.getCalendarEvents(u.getRestaurantID(),function(ret){
                        console.log("BACK: " + ret);
                        var a = [];
                        if(ret == null || ret == ""){
                            console.log("EMPTY: " + JSON.stringify(a));
                            res.end(JSON.stringify(a));
                            return;
                        }
                        res.end(JSON.stringify(ret));
                    });
                    
                }
                else{

                }
            })
        }
        else if(uri == "/get/messages"){
            validateCookies(req,res,function(r){

                if(r){
                    var u = new Person();
                    var s = JSON.parse(getCookie(req,"user"));
                    u.loadFromJSON(s);
                    var db = new Database();
                    console.log(u);
                    db.getMessages(u.getRestaurantID(),function(ret){
                        console.log("BACK: " + ret);
                        var a = [];
                        if(ret == null || ret == ""){
                            console.log("EMPTY: " + JSON.stringify(a));
                            res.end(JSON.stringify(a));
                            return;
                        }
                        res.end(JSON.stringify(ret));
                    });
                    
                }
                else{

                }
            })
        }
        else{
            console.log("serving cookies");
            console.log(uri);

            validateCookies(req,res,function(r){
                console.log('returned');
                console.log(r);
                if(r)
                    serve(req,res);
                else{
                    console.log("NO GOOD");
                    //redirectTo(res,"/Views/Login.html");

                }
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

function isCSSData(uri){

    return uri == "/Conetent/Site.css"  || uri == "/Content/app.css" 
    || uri == "/Content/bootstrap.css" || uri == "/Content/bootstrap.min.css";

}

function validateUserCookie(req,res,callback){
    console.log("COOKIE");
    var userCook = getCookie(req,'user');
   // console.log(userCook);
    if(userCook == null){
       redirectTo(res,"/Views/Login.html");
        callback(false);
        res.end();
        return;
        console.log("DIDNT RETURN");
    }
    p = new Person();
    p.loadFromJSON(JSON.parse(userCook));

    console.log(p);
    db = new Database();
    db.validateUser(p,function(returnValue){

        if(returnValue)
            console.log('good');
        else{
            redirectTo(res,"/Views/Login.html");
            callback(false);
        }
        //console.log("R: " + returnValue);
       callback(returnValue);
        
    })



}

function validateCookies(req,res,callback){
    console.log("COOKIE");
    var userCook = getCookie(req,'user');
   // console.log(userCook);
    if(userCook == null){
       redirectTo(res,"/Views/Login.html");
        callback(false);
        res.end();
        return;
        console.log("DIDNT RETURN");
    }
  //  console.log("ID: " + JSON.parse(userCook).restaurantID);
    if(JSON.parse(userCook).restaurantID == null){
        console.log("SEND TO RESLOGIN");
        redirectTo(res,"/Views/LoginRestaurant.html");
        callback(false);
        res.end();
        return;
        console.log("DIDNT RETURN");
    }

    p = new Person();
    p.loadFromJSON(JSON.parse(userCook));

   // console.log(p);
    db = new Database();
    db.validateUser(p,function(returnValue){

        if(returnValue)
            console.log('good');
        else{
            redirectTo(res,"/Views/Login.html");
            callback(false);
        }
       // console.log("R: " + returnValue);
        callback(returnValue);
        
    })



}

function getCookie(req,name){

    var cookie = req.headers.cookie
    var cookies = parseCookies(req);
    
    if(cookies == null)
        return null;

    return cookies[name]; 
}

function redirectTo(res,url){

    res.writeHead(302, {'Location': url});
    //res.end("http://localhost:44444/Views/Login.html");
    console.log("Sending to: " + url);
    res.end();
    return;


}

function serve(req,res){
    var uri = url.parse(req.url).pathname;
   // console.log(uri);
    var filename = path.join(process.cwd(), uri);
    //console.log('Serving ' + filename);
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
   // console.log('process');
   
    var body = '';
    request.on('data', function (data) {
        body += data;
        //console.log(body);
    });
    request.on('end', function () {

      //  console.log(body);
        if(body == ""){
            //set response
            response.end();
            return;
        }
        var POST = JSON.parse(body);

        var url = request.url;
     //   console.log(url);


        var db = new Database();
        if(url == "/user/create"){
            var u = new Person();
            u.loadFromJSON(POST);
            db.addUser(u,function(ret){
                console.log("WE ACTUALLY RETURNED");
            })
                console.log("GOOD");
            response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
            response.end("http://"+host+":44444/Views/JoinRestaurant.html");
            return;

//validate user isn't repeat


        }
        else if(url == "/user/login"){
            var u = new Person();
            console.log("LOGIN")

            console.log(u);
            u.loadFromJSON(POST);
            console.log(u);
            db.getUser(u,function(returnValue){
            
                if(returnValue != null){

                    response.setHeader("Set-cookie", "user=" + JSON.stringify(returnValue) +";Path=/;");
                    console.log('back');
                    
                    response.end("http://"+host+":44444/Views/Show.html");
                }
                else
                    console.log("BAD");

            });
        }
        else if(url == "/restaurant/join"){
            
            console.log("RestJOIN");
            var userCookie = getCookie(request,"user");
            if(userCookie == null)
                response.end("http://"+host+":44444/Views/Login.html");
            var u = new Person();
            u.loadFromJSON(JSON.parse(userCookie));
            var r = new Restaurant();
            db.validateUser(u,function(returnValue){
                console.log("User validated, trying to do stuff");
                console.log(returnValue);
                if(returnValue){
                    
                    r.loadFromJSON(POST);
                    console.log(r);
                    db.validateRestaurant(r,function(returnValue){
                        console.log(returnValue);
                        if(returnValue){
                            //response.setHeader("Set-cookie", "restaurant=" + JSON.stringify(p) +";Path=/;");

                            db.getRestaurantID(r,function(returnValue){

                                console.log(returnValue);
                                var u = new Person();
                                var jU = JSON.parse(userCookie);
                               // console.log(jU);
                               // console.log(jU['name'] + " " + jU['password'] + " " + r.getID());
                                u.loadFromJSON(jU);
                                u.setRestaurantID(returnValue);
                               // console.log(u.getName() + " " + u.getPassword());
                                db.editUser(u);
                                response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                                response.end("http://"+host+":44444/Views/Show.html");
                            
                            })

                        }
                        else
                            console.log("BAD");

                    });


                   /**/
                }
            });

        }
         else if(url == "/restaurant/create"){
            console.log('okay');
            var u = new Person();
            u.loadFromJSON(JSON.parse(getCookie(request,"user")));
            db.validateUser(u,function(returnValue){
              // console.log("Validate:"+returnValue);
              var p = new Restaurant();
              p.loadFromJSON(POST);
                if(returnValue){
                    db.addRestaurant(p,function(cresponse){
                            
                        db.getRestaurantID(p,function(returnValue){
                            console.log(returnValue);
                            var u = new Person();
                            var jU = JSON.parse(getCookie(request,"user"));
                            console.log(jU);
                            console.log(jU['name'] + " " + jU['password'] + " " + p.getID());
                            u.loadFromJSON(jU);
                            u.setRestaurantID(returnValue);
                            console.log(u.getName() + " " + u.getPassword());
                            db.editUser(u);
                            response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                            response.end("http://"+host+":44444/Views/Show.html");
                        });

                    });
                }
            });   

        }
        else if(url == "/create/task"){
            var u = new Person();
            u.loadFromJSON(JSON.parse(getCookie(request,"user")));
           // console.log(u);
            db.validateUser(u,function(returnValue){
                console.log("User validated, trying to do stuff");
                var userCookie = getCookie(request,"user");
                if(userCookie == null)
                    response.end("http://"+host+":44444/Views/Login.html");
                if(returnValue){

                    console.log(returnValue);
                    var t = new Task();
                    console.log(body);
                    var jT = JSON.parse(body);
                    console.log(jT);
                    console.log(t);
                    
                    t.loadFromJSON(jT);
                    t.setRestaurantID(u.getRestaurantID());
                    t.setIssuer(u.getName());
                    console.log(t);
                    //console.log(ta.getName() + " " + ta.getPassword());
                    db.addTask(t);
                    /*response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                    response.end("http://"+host+:44444/Views/Show.html");*/
                    // set happy headers?
                    response.end();
                }
                else
                    console.log("BAD");
                
            }); 

        }
        else if(url == "/delete/task"){
            var u = new Person();
            u.loadFromJSON(JSON.parse(getCookie(request,"user")));
           // console.log(u);
            db.validateUser(u,function(returnValue){
                console.log("User validated, trying to do stuff");
                var userCookie = getCookie(request,"user");
                if(userCookie == null)
                    response.end("http://"+host+":44444/Views/Login.html");
                if(returnValue){

                    console.log(returnValue);
                    var t = new Task();
                    console.log(body);
                    var jT = JSON.parse(body);
                    console.log(jT);
                    console.log(t);
                    
                    t.loadFromJSON(jT);
                    t.setRestaurantID(u.getRestaurantID());
                    t.setIssuer(u.getName());
                    console.log(t);
                    //console.log(ta.getName() + " " + ta.getPassword());
                    db.deleteTask(t);
                    /*response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                    response.end("http://"+host+":44444/Views/Show.html");*/
                    // set happy headers?
                    response.end();
                }
                else
                    console.log("BAD");
                
            }); 

        }
        else if(url == "/create/event"){
            var u = new Person();
            u.loadFromJSON(JSON.parse(getCookie(request,"user")));
           // console.log(u);
            db.validateUser(u,function(returnValue){
                console.log("User validated, trying to do stuff");
                var userCookie = getCookie(request,"user");
                if(userCookie == null)
                    response.end("http://"+host+":44444/Views/Login.html");
                if(returnValue){

                    console.log(returnValue);
                    var calEvent = new CalendarEvent();
                    console.log(body);
                    var jT = JSON.parse(body);
                    console.log(jT);
                    console.log(calEvent);
                    
                    calEvent.loadFromJSON(jT);
                    calEvent.setRestaurantID(u.getRestaurantID());
                    //calEvent.setIssuer(u.getName());
                    console.log(calEvent);
                    //console.log(ta.getName() + " " + ta.getPassword());
                    db.addEvent(calEvent);
                    /*response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                    response.end("http://"+host+":44444/Views/Show.html");*/
                    // set happy headers?
                    response.end();
                }
                else
                    console.log("BAD");
                
            }); 

        }
        else if(url == "/create/message"){
            var u = new Person();
            u.loadFromJSON(JSON.parse(getCookie(request,"user")));
           // console.log(u);
            db.validateUser(u,function(returnValue){
                console.log("User validated, trying to do stuff");
                var userCookie = getCookie(request,"user");
                if(userCookie == null)
                    response.end("http://"+host+":44444/Views/Login.html");
                if(returnValue){

                    console.log(returnValue);
                    var message = new Message();
                    console.log(body);
                    var jT = JSON.parse(body);
                    console.log(jT);
                    console.log(message);
                    
                    message.loadFromJSON(jT);
                    message.setRestaurantID(u.getRestaurantID());
                    //calEvent.setIssuer(u.getName());
                    message.setIssuer(u.getName());
                    console.log(message);
                    //console.log(ta.getName() + " " + ta.getPassword());
                    db.addMessage(message);
                    /*response.setHeader("Set-cookie", "user=" + JSON.stringify(u) +";Path=/;");
                    response.end("http://"+host+":44444/Views/Show.html");*/
                    // set happy headers?
                    response.end();
                }
                else
                    console.log("BAD");
                
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
