

function Message(name,id,message,type,time) {
    
    this.name = name;
    this.id = id;
    this.message = message;
    this.type = type
    this.time = time

}


Person.prototype.setName = function(name) {
	this.name = name;
};

Person.prototype.setID = function(id) {
	this.id = id;
};

Person.prototype.setType = function(type){
	this.type = type;
};

Person.prototype.setTime = function(time){
	this.time = time;
};

Person.prototype.setMessage = function(message){
	this.message = message;
};

Person.prototype.getTime = function(){
	return this.time;
};

Person.prototype.getMessage = function(){
	return this.message;
};

Person.prototype.getType = function(){
	return this.type;
};

Person.prototype.getID = function() {
	return id;
};

Person.prototype.getName = function() {
	return name;
};

Person.prototype.toString = function(){
	return this.name + " " + this.id + " " + this.password;
};

module.exports = Message;