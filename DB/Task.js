
var loadJSON = require("./loadJSON.js");

function CalendarEvent(issuer,id,restaurantID,details,type,date) {
    
    this.issuer = issuer;
    this.id = id; 
    this.restaurantID = restaurantID;
    this.details = details;
    this.completed= completed;
    this.date = date // -- later

}

CalendarEvent.protocompleted= loadJSON.prototype;

CalendarEvent.prototype.setDetails = function(password){
	this.details = details;
};

CalendarEvent.prototype.setIssuer = function(issuer) {
	this.issuer = issuer;
};

CalendarEvent.prototype.setID = function(id) {
	this.id = id;
};

CalendarEvent.prototype.setCompleted= function(completed){
	this.completed= completed;
};

CalendarEvent.prototype.setDate = function(date){
	this.date = date;
};

Person.prototype.setRestaurantID = function(restaurantID) {
	this.restaurantID = restaurantID;
};

Person.prototype.getRestaurantID = function() {
	return this.restaurantID;
};

CalendarEvent.prototype.getDate = function(){
	return this.date;
};

CalendarEvent.prototype.getCompleted= function(){
	return this.completed;
};

CalendarEvent.prototype.getID = function() {
	return this.id;
};

CalendarEvent.prototype.getIssuer = function() {
	return this.issuer;
};

CalendarEvent.prototype.getDetails = function() {
	return this.details;
};

CalendarEvent.prototype.toString = function(){
	return this.issuer + " " + this.id + " " + this.details;
};


module.exports = CalendarEvent;