
var DatabaseDAO = require("./DatabaseDAO.js");


var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;


function RestaurantDAO() {


}

RestaurantDAO.prototype = DatabaseDAO.prototype;

RestaurantDAO.prototype.addRestaurant = function(restaurant,callback){
	console.log('addRestaurant');
	var res = this;
	var id = null;
	res.getNextSequence("restaurantid",function(response){

		console.log("UPDATE CALBACK: " + response.seq);
		id = response.seq;

		console.log(id);
		MongoClient.connect(format("mongodb://%s:%s/test", res.getHost(), res.getPort()), function(err,db){
			if (err) console.log(err);
			else{
				
				restaurant.setID(id);
				db.collection('test').insert(restaurant, function(err, records) {
					if (err) sys.puts (err);
					else
						console.log("Record added as "+records[0]._id);
					
				});
				
			}

		});
		console.log('firstcall');
		if (typeof callback=="function") callback(id);
	});

}

RestaurantDAO.prototype.practiceCallback = function(){

}


RestaurantDAO.prototype.validateRestaurant = function(restaurant,callback){
var success = false;
	MongoClient.connect(format("mongodb://%s:%s/test", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			  db.collection('test').find({ "name": restaurant.getName(), "password": restaurant.getPassword()}).nextObject(function(err, doc,callback) {            
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

RestaurantDAO.prototype.getNextSequence = function(name,callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/counters", this.getHost(), this.getPort()), function(err,db){
		   
			console.log("IN DB: " + name);
		  db.collection('counters').findAndModify(
          	
            { _id: name },
            [],
            {$inc: { seq: 1 } },
            {},
		    function(err, object) {
		      if (err){
		          console.warn(err.message);  // returns error if no matching object found
		      }else{
		          console.dir(object);
		          callback(object);
     	 	}	
          
   		});
		  
	
	});



}


RestaurantDAO.prototype.getRestaurantID = function(restaurant,callback) {
	var name = name;
	MongoClient.connect(format("mongodb://%s:%s/test", this.getHost(), this.getPort()), function(err,db){
		
		if (err) console.log(err);
		else{
			  db.collection('test').find({ "name": restaurant.getName(), "password": restaurant.getPassword()}).nextObject(function(err, doc) {            
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
			        callback(doc.id);
			        //console.log("Returned #1 documents");
			  });
		}
		
	});



}



module.exports = RestaurantDAO;