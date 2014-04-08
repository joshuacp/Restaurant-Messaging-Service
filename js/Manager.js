
var Person = require("./Person.js");

function Manager(name,id,password,type) {
    
    this.name = name;
    this.id = id;
    this.password = password;
    this.type = type

}

Manager.prototype = Person.prototype;

module.exports = Employee;