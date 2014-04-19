/**

The Communication Class David Bentz
 <pre>
    Domain:

	url : URL
	data : Object
	host : String
	port : int
	message : String
	
    Invariants:
    data is a serialized object from the model classes

    Constructor Specifications

       Token().Pre-condition: params are valid classes
       Object is a serialized object from the model
       URL is valid path to server
           
       Token().Post-condition: host, port are valid and set
            
</pre>
@class Communication
@param host
@param port
@constructor
*/
//var Person = require("./Person.js");

function Communication(proxy) {
    this.proxy = proxy;
}

Communication.prototype.getProxy = function() {
    return this.proxy;
}

Communication.prototype.setProxy = function(proxy) {
    if(proxy == null){
        return "Invalid input";
    }
    this.proxy = proxy;
}

/**
	Post the information using message port and host as URL
	<pre>
		Pre-condition: Class is non null and instantiated
		Post-condition: Post is sent with a valid response
	</pre>
	@method doPost
	@param Object
	@param message
	@param function(){}
	@return {Object} obj
	*/
Communication.prototype.doPost = function(url2, data2, type2) {
    var newModel;
    var tempproxy = this.proxy;
    var stuff = data2;
    console.log({
        url: url2,
        method: "POST",
        data: data2,
        async: 'true',
        type: type2});
    $.ajax({
        url: url2,
        method: "POST",
        data: data2,
        async: 'true',
        type: type2,
        success: function(result) {
            //tempproxy.getModel().loadDataFromJson(result);
        }

    });
}

Communication.prototype.doGet = function(url) {
    var newModel;
    var tempproxy = this.proxy;
    $.ajax({
        url: url,
        type: 'GET',
        async: 'true',
        success: function(result) {
            //tempproxy.getModel().loadDataFromJson(result);
        }
    });
}


var com = new Communication("localhost:44444/");

com.doPost("localhost:44444/","datar","dont");
