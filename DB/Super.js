
var loadJSON = require("./loadJSON.js");

function Person(name,password,id,type,restaurantID) {

	
    this.name = name;
    this.password = password;
    this.id = id;
    this.restaurantID = restaurantID;
    this.type = type

}

Person.prototype = loadJSON.prototype;

Person.prototype.setPassword = function(password){
	this.password = password;
};

Person.prototype.setName = function(name) {
	this.name = name;
};

Person.prototype.setID = function(id) {
	this.id = id;
};

Person.prototype.setRestaurantID = function(restaurantID) {
	this.restaurantID = restaurantID;
};

Person.prototype.getRestaurantID = function() {
	return this.restaurantID;
};

Person.prototype.setType = function(type){
	this.type = type;
};

Person.prototype.getType = function(){
	return this.type;
};

Person.prototype.getID = function() {
	return this.id;
};

Person.prototype.getName = function() {
	return this.name;
};

Person.prototype.getPassword = function() {
	return this.password;
};

Person.prototype.toString = function(){
	return this.name + " " + this.id + " " + this.password;
};



module.exports = Person;