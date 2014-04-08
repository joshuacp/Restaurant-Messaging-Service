
var Person = require("./Person.js");

function Employee(name,id,password,type) {
    
    this.name = name;
    this.id = id;
    this.password = password;
    this.type = type

}

Employee.prototype = Person.prototype;

module.exports = Employee;