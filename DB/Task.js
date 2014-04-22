
var loadJSON = require("./loadJSON.js");

function Task(issuer,id,restaurantID,details,completed,date) {
    
    this.issuer = issuer;
    this.id = id; 
    this.restaurantID = restaurantID;
    this.details = details;
    this.completed= completed;
    this.date = date // -- later

}

Task.prototype = loadJSON.prototype;

Task.prototype.setDetails = function(password){
	this.details = details;
};

Task.prototype.setIssuer = function(issuer) {
	this.issuer = issuer;
};

Task.prototype.setID = function(id) {
	this.id = id;
};

Task.prototype.setCompleted= function(completed){
	this.completed= completed;
};

Task.prototype.setDate = function(date){
	this.date = date;
};

Person.prototype.setRestaurantID = function(restaurantID) {
	this.restaurantID = restaurantID;
};

Person.prototype.getRestaurantID = function() {
	return this.restaurantID;
};

Task.prototype.getDate = function(){
	return this.date;
};

Task.prototype.getCompleted= function(){
	return this.completed;
};

Task.prototype.getID = function() {
	return this.id;
};

Task.prototype.getIssuer = function() {
	return this.issuer;
};

Task.prototype.getDetails = function() {
	return this.details;
};

Task.prototype.toString = function(){
	return this.issuer + " " + this.id + " " + this.details;
};


module.exports = Task;