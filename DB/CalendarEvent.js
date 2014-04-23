
var loadJSON = require("./loadJSON.js");

function CalendarEvent(start,id,title,end,allDay,url,restaurantID) {
    
    this.start = start;
    this.id = id;
    this.title = title;
    this.end = end;
    this.allDay = allDay;
    this.url = url;
    this.restaurantID = restaurantID;

}

CalendarEvent.prototype = loadJSON.prototype;

CalendarEvent.prototype.clearNulls = function(){
	this.title = title;
};

CalendarEvent.prototype.setTitle = function(password){
	this.title = title;
};

CalendarEvent.prototype.setStart = function(start) {
	this.start = start;
};

CalendarEvent.prototype.setID = function(id) {
	this.id = id;
};

CalendarEvent.prototype.setEnd = function(end){
	this.end = end;
};

CalendarEvent.prototype.setAllDay = function(allDay){
	this.allDay = allDay;
};

CalendarEvent.prototype.getAllDay = function(){
	return this.allDay;
};

CalendarEvent.prototype.setRestaurantID = function(restaurantID) {
	this.restaurantID = restaurantID;
};

CalendarEvent.prototype.getRestaurantID = function() {
	return this.restaurantID;
};

CalendarEvent.prototype.setUrl = function(url){
	this.url = url;
};

CalendarEvent.prototype.getUrl = function(){
	return this.url;
};

CalendarEvent.prototype.getEnd = function(){
	return this.end;
};

CalendarEvent.prototype.getID = function() {
	return this.id;
};

CalendarEvent.prototype.getStart = function() {
	return this.start;
};

CalendarEvent.prototype.setTitle = function() {
	return this.title;
};

CalendarEvent.prototype.toString = function(){
	return this.start + " " + this.id + " " + this.title;
};


module.exports = CalendarEvent;