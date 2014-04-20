
var DatabaseDAO = require("./DatabaseDAO.js");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function PersonDAO() {


}

PersonDAO.prototype = DatabaseDAO.prototype;

PersonDAO.prototype.addUser = function(user){
	console.log('adduser');
	MongoClient.connect(format("mongodb://%s:%s/test", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			db.collection('test').insert(user, function(err, records) {
				if (err) sys.puts (err);
				else
					console.log("Record added as "+records[0]._id);
			});
		}

	});
}

PersonDAO.prototype.practiceCallback = function(){

}


PersonDAO.prototype.validateUser = function(user,callback){
var success = false;
	MongoClient.connect	(format("mongodb://%s:%s/test", this.getHost(), this.getPort()), function(err,db){
		//console.log(user.getName());
		if (err) console.log(err);
		else{
			  db.collection('test').find({ "name": user.getName(), "password": user.getPassword()}).nextObject(function(err, doc) {            
			       	if(err){
			       		console.log(err);
			       		callback(false);
			       		return false;
			       	}

			        if(doc == null){
			        	callback(false);
			        	return false;
			        }
			        console.log(doc);
			        console.log("WE GOT ONE");
			        success =  true;
			        callback(success);
			        //console.log("Returned #1 documents");
			  });
		}
		
	});
	//callback(false);
	//callback(success);
}



module.exports = PersonDAO;