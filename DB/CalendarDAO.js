
var DatabaseDAO = require("./DatabaseDAO.js");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function CalendarDAO() {


}

CalendarDAO.prototype = DatabaseDAO.prototype;

CalendarDAO.prototype.addEvent = function(calEvent){
	console.log('addEvent');
	MongoClient.connect(format("mongodb://%s:%s/calendar", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('calendar').insert(calEvent, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Record added as "+records[0]._id);
			});
		}

	});
}

CalendarDAO.prototype.getEvents = function(resID,callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/calendar", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			 var cursor = db.collection('calendar').find({"restaurantID":resID})
			 cursor.toArray(function(err,obj){
			 	console.log(obj);
			 	callback(obj);
			 });
		}
		
	});
}

CalendarDAO.prototype.deleteEvent = function(calEvent,callback){
	console.log('deleteEvent');
	console.log(calEvent);
	MongoClient.connect(format("mongodb://%s:%s/calendar", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('calendar').remove({ "title": calEvent.title, "restaurantID": calEvent.getRestaurantID()}, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Deleted");
				callback(true);
			});
		}

	});
}

/*CalendarDAO.prototype.editTask = function(task){
	console.log('addtask');
	var dbs = this;
	MongoClient.connect(format("mongodb://%s:%s/task", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			console.log("UPDATING to: " + task);
			db.collection('task').update({ "restaurantID": task.getRestaurantID(), "id": task.getID()},task, function(err, records) {
				if (err || records == null) sys.puts (err); return;
				//else
					//console.log("Record added as "+records[0]._id);
				console.log(records);

			});
			console.log('after');
			dbs.validatetask(task,function(re){
				console.log("NEW task?: " + re);
			});

		}

	});
}*/

CalendarDAO.prototype.practiceCallback = function(){

}


module.exports = CalendarDAO;