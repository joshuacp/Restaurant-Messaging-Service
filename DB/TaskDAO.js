
var DatabaseDAO = require("./DatabaseDAO.js");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function TaskDAO() {


}

TaskDAO.prototype = DatabaseDAO.prototype;

TaskDAO.prototype.addTask = function(task){
	console.log('addTask');
	MongoClient.connect(format("mongodb://%s:%s/task", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('task').insert(task, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Record added as "+records[0]._id);
			});
		}

	});
}

TaskDAO.prototype.getTasks = function(callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/task", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			 var cursor = db.collection('task').find({})
			 cursor.toArray(function(err,obj){
			 	console.log(obj);
			 	callback(obj);
			 });
		}
		
	});
}

TaskDAO.prototype.editTask = function(task){
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
}

TaskDAO.prototype.practiceCallback = function(){

}


module.exports = TaskDAO;