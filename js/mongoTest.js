var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : 27017;

console.log("Connecting to " + host + ":" + port);

MongoClient.connect(format("mongodb://%s:%s/test", host, port), function(err, db) {
  
  /*db.createCollection('t',function(err,collection){
    if (err) throw err;

   // console.log(collection);
  });*/
  var document = {name:"David", title:"About MongoDB"};
 
  db.collection('test').find({ "name": 'David'}).nextObject(function(err, doc) {            
          console.log("Returned #1 documents");
  });
        

  db.collection('test').insert(document, function(err, records) {
    if (err) throw err;
    console.log("Record added as "+records[0]._id);
  });

  //console.dir(x)
});