var	MongoClient = require('mongodb').MongoClient
  , format = require('util').format;
  	PersonDAO = require('./PersonDAO.js');
  	RestaurantDAO = require('./RestaurantDAO.js');
  	TaskDAO = require('./TaskDAO.js');
  	CalendarDAO = require('./CalendarDAO.js');
  	MessageDAO = require('./MessageDAO.js');

var dbClass = this;

function Database() {
    
  this.host = 'localhost';
  this.port = 27017;

}

Database.prototype.addUser = function (user,callback){

	personDAO = new PersonDAO();
	personDAO.addUser(user,function(ret){
		callback(ret);
	});
}

Database.prototype.editUser = function (user){

	personDAO = new PersonDAO();
	console.log("USER: " + user);
	personDAO.editUser(user);
}

Database.prototype.getUser = function (user,callback){
	console.log('validation');
	personDAO = new PersonDAO();
	personDAO.getUser(user,function(response){
		console.log('returned to here: ' + response);
		callback(response);
	});
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


Database.prototype.deleteTask = function(task,callback){

	taskDAO = new TaskDAO();
	taskDAO.deleteTask(task,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}


Database.prototype.getTasks = function(restID,callback){

	taskDAO = new TaskDAO();
	taskDAO.getTasks(restID,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}

Database.prototype.getMessages = function(restID,callback){

	messageDAO = new MessageDAO();
	messageDAO.getMessages(restID,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}

Database.prototype.addMessage = function(restID,callback){

	messageDAO = new MessageDAO();
	messageDAO.addMessage(restID,function(response){
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

Database.prototype.addEvent = function(calEvent,callback){

	calDAO = new CalendarDAO();
	calDAO.addEvent(calEvent,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}


Database.prototype.getCalendarEvents = function(restID,callback){

	calDAO = new CalendarDAO();
	calDAO.getEvents(restID,function(response){
		console.log('returned to ID?: ' + response);
		if (typeof callback=="function") callback(response);
	});
}



module.exports = Database;