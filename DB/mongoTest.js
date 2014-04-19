var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

var host = 'localhost';
var port = 27017;

console.log("Connecting to " + host + ":" + port);

MongoClient.connect(format("mongodb://%s:%s/test", host, port), function(err,db){s(err,db)});

var s = function(err, db) {
  
  /*db.createCollection('t',function(err,collection){
    if (err) throw err;

   // console.log(collection);
  });*/
  var document = {name:"David", title:"About MongoDB"};
 
  db.collection('test').find({"id": 'b', "password":'c' }).nextObject(function(err, doc) {            
        console.log(doc);
        //console.log("Returned #1 documents");
  });
        

  /*db.collection('test').insert(document, function(err, records) {
    if (err) throw err;
    console.log("Record added as "+records[0]._id);
  });*/

  //console.dir(x)
}