

function Restaurant(name,id,password) {
    
    this.name = name;
    this.id = id;
    this.password = password;

}

Restaurant.prototype.setPassword = function(password){
	this.password = password;
}

Restaurant.prototype.setName = function(name) {
	this.name = name;
};

Restaurant.prototype.setID = function(id) {
	this.id = id;
};

Restaurant.prototype.getID = function() {
	return id;
};

Restaurant.prototype.getName = function() {
	return name;
};

Restaurant.prototype.getPassword = function() {
	return password;
};

Restaurant.prototype.toString = function(){
	return this.name + " " + this.id + " " + this.password;
}
