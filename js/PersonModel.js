
function Person(name,id,password,type) {

	
    this.name = name;
    this.id = id;
    this.password = password;
    this.type = type

}

Person.prototype.setPassword = function(password){
	this.password = password;
};

Person.prototype.setName = function(name) {
	this.name = name;
};

Person.prototype.setID = function(id) {
	this.id = id;
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
