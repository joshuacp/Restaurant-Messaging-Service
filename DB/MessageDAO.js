
var DatabaseDAO = require("./DatabaseDAO.js");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function MessageDAO() {


}

MessageDAO.prototype = DatabaseDAO.prototype;

MessageDAO.prototype.addMessage = function(message){
	console.log('addmessage');
	MongoClient.connect(format("mongodb://%s:%s/message", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('message').insert(message, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Record added as "+records[0]._id);
			});
		}

	});
}

MessageDAO.prototype.deleteMessage = function(message){
	console.log('deletemessage');
	MongoClient.connect(format("mongodb://%s:%s/message", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('message').remove({ "restaurantID": message.getRestaurantID(), "message": message.getMessage()}, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Deleted");
			});
		}

	});
}

MessageDAO.prototype.getMessages = function(resID,callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/message", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			 var cursor = db.collection('message').find({"restaurantID":resID})
			 cursor.toArray(function(err,obj){
			 	console.log(obj);
			 	callback(obj);
			 });
		}
		
	});
}

MessageDAO.prototype.editMessage = function(message){
	console.log('addmessage');
	var dbs = this;
	MongoClient.connect(format("mongodb://%s:%s/message", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			console.log("UPDATING to: " + message);
			db.collection('message').update({ "restaurantID": message.getRestaurantID(), "id": message.getID()},message, function(err, records) {
				if (err || records == null) sys.puts (err); return;
				//else
					//console.log("Record added as "+records[0]._id);
				console.log(records);

			});
			console.log('after');
			dbs.validatemessage(message,function(re){
				console.log("NEW message?: " + re);
			});

		}

	});
}

MessageDAO.prototype.practiceCallback = function(){

}


module.exports = MessageDAO;