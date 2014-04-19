
var loadJSON = require("./loadJSON.js");

function CalendarEvent(name,id,message,type,date) {
    
    this.name = name;
    this.id = id;
    this.message = message;
    this.type = type
    this.date = date

}

CalendarEvent.prototype = loadJSON.prototype;

CalendarEvent.prototype.setMessage = function(password){
	this.message = message;
};

CalendarEvent.prototype.setName = function(name) {
	this.name = name;
};

CalendarEvent.prototype.setID = function(id) {
	this.id = id;
};

CalendarEvent.prototype.setType = function(type){
	this.type = type;
};

CalendarEvent.prototype.setDate = function(date){
	this.date = date;
};

CalendarEvent.prototype.getDate = function(){
	return this.date;
};

CalendarEvent.prototype.getType = function(){
	return this.type;
};

CalendarEvent.prototype.getID = function() {
	return this.id;
};

CalendarEvent.prototype.getName = function() {
	return this.name;
};

CalendarEvent.prototype.getMessage = function() {
	return this.message;
};

CalendarEvent.prototype.toString = function(){
	return this.name + " " + this.id + " " + this.message;
};


module.exports = CalendarEvent;