var	MongoClient = require('mongodb').MongoClient
  , format = require('util').format;
  	PersonDAO = require('./PersonDAO.js');
  	RestaurantDAO = require('./RestaurantDAO.js');
  	TaskDAO = require('./TaskDAO.js');

var dbClass = this;

function Database() {
    
  this.host = 'localhost';
  this.port = 27017;

}

Database.prototype.addUser = function (user){

	personDAO = new PersonDAO();
	personDAO.addUser(user);
}

Database.prototype.editUser = function (user){

	personDAO = new PersonDAO();
	console.log("USER: " + user);
	personDAO.editUser(user);
}


Database.prototype.validateUser = function (user,callback){
	console.log('validation');
	personDAO = new PersonDAO();
	personDAO.validateUser(user,function(response){
		console.log('returned to here: ' + response);
		callback(response);
	});
}

Database.prototype.getRestaurantID = function (restaurant,callback){

	restaurantDAO = new RestaurantDAO();
	restaurantDAO.getRestaurantID(restaurant,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}

Database.prototype.addRestaurant = function(restaurant,callback){

	restaurantDAO = new RestaurantDAO();
	restaurantDAO.addRestaurant(restaurant,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
	
}

Database.prototype.addTask = function(task,callback){

	taskDAO = new TaskDAO();
	taskDAO.addTask(task,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}


Database.prototype.getTasks = function(task,callback){

	taskDAO = new TaskDAO();
	taskDAO.getTasks(function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}


Database.prototype.validateRestaurant = function(restaurant,callback){

	restaurantDAO = new RestaurantDAO();
	restaurantDAO.validateUser(restaurant,function(response){
		console.log('returned to here: ' + response);
		callback(response);
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