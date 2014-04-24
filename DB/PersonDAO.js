
var DatabaseDAO = require("./DatabaseDAO.js"),
	crypto = require("crypto");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function PersonDAO() {


}

PersonDAO.prototype = DatabaseDAO.prototype;

PersonDAO.prototype.addUser = function(user,callback){
	console.log('adduser');
	var d = this;
	user.encryptPassword(function(ret){
		MongoClient.connect(format("mongodb://%s:%s/user", d.getHost(), d.getPort()), function(err,db){
			if (err) console.log(err);
			else{
				user.generateID(function(ret){
					db.collection('user').insert(user, function(err, records) {
						if (err) sys.puts (err);
						else
							console.log("Record added as "+records[0]._id);
						callback(true);
					});
				});
			}

		});
	});
}

PersonDAO.prototype.loginUser = function(user,callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/user", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			  db.collection('user').find({ "name": user.getName()}).nextObject(function(err, doc) {            
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
			        console.log(user);
			        user.checkPassword(user.password,doc.password,function(ret){
			        	console.log("DID IT WORK: " +ret);
			        });
			        callback(doc);
			        //console.log("Returned #1 documents");
			  });
		}
		
	});
}

PersonDAO.prototype.editUser = function(user){
	console.log('adduser');
	var dbs = this;
	MongoClient.connect(format("mongodb://%s:%s/user", this.getHost(), this.getPort()), function(err,db){
		if (err) console.log(err);
		else{
			console.log("UPDATING to: " + user);
			db.collection('user').update({ "name": user.getName(), "password": user.getPassword()},user, function(err, records) {
				if (err || records == null) console.log (err); return;
				//else
					//console.log("Record added as "+records[0]._id);
				console.log(records);

			});
			console.log('after');
			dbs.validateUser(user,function(re){
				console.log("NEW USER?: " + re);
			});

		}

	});
}

PersonDAO.prototype.practiceCallback = function(){

}


PersonDAO.prototype.validateUser = function(user,callback){
var success = false;
	MongoClient.connect	(format("mongodb://%s:%s/user", this.getHost(), this.getPort()), function(err,db){
		//console.log(user.getName());
		if (err) console.log(err);
		else{
			  db.collection('user').find({ "name": user.getName(), "cookieID": user.getCookieID()}).nextObject(function(err, doc) {            
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