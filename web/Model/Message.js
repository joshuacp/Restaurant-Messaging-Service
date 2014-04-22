

function Message(name,id,message,type,time) {
    
    this.name = name;
    this.id = id;
    this.message = message;
    this.type = type
    this.time = time

}


Message.prototype.setName = function(name) {
	this.name = name;
};

Message.prototype.setID = function(id) {
	this.id = id;
};

Message.prototype.setType = function(type){
	this.type = type;
};

Message.prototype.setTime = function(time){
	this.time = time;
};

Message.prototype.setMessage = function(message){
	this.message = message;
};

Message.prototype.getTime = function(){
	return this.time;
};

Message.prototype.getMessage = function(){
	return this.message;
};

Message.prototype.getType = function(){
	return this.type;
};

Message.prototype.getID = function() {
	return id;
};

Message.prototype.getName = function() {
	return name;
};

Message.prototype.toString = function(){
	return this.name + " " + this.id + " " + this.password;
};