var	MongoClient = require('mongodb').MongoClient
  , format = require('util').format;
  	PersonDAO = require('./PersonDAO.js');

var dbClass = this;

function Database() {
    
  this.host = 'localhost';
  this.port = 27017;

}

Database.prototype.addUser = function (user){

	personDAO = new PersonDAO();
	personDAO.addUser(user);
}


Database.prototype.validateUser = function (user,callback){
	console.log('validation');
	personDAO = new PersonDAO();
	personDAO.validateUser(user,function(response){
		console.log('returned to here');
		callback(response);
	});
}

Database.prototype.addRestaurant = function(name){

	MongoClient.connect(format("mongodb://%s:%s/test", this.host, this.port), function(err, db) {
		  
		  /*db.createCollection('t',function(err,collection){
		    if (err) throw err;

		   // console.log(collection);
		  });*/
		  
		  var t = db.collection('test');

		  t.insert({"name":name},function(err,records){
		    if(err) throw err;
		    console.log("record added " + records[0]._id);
		  });
		  console.log(t.find()[0]);  

		  //console.dir(x)
	});
	
}

Database.prototype.deleteDocument = function(name,password){

	dbClass.name = name;

	MongoClient.connect(format("mongodb://%s:%s/test", this.host, this.port),function(err,db){
		
		dbClass.deleteCollection(db,dbs.name);
	});

	console.log("far");
}

Database.prototype.leaveRestaurant = function(name,person){
	
}

Database.prototype.deleteCollection = function (db,name){
	console.log("DELEITING: " + name);
	console.log('here');
	//console.log(db);
	 var t = db.collection('test');

   db.collection('test').find({ "name": 'David'}).nextObject(function(err, doc) {            
      console.log("Returned #1 documents");
      
	 });
  

};

Database.prototype.addToCollection = function (db,object){

}



module.exports = Database;