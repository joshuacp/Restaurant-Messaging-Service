

function loadJSON() {


}
loadJSON.prototype.loadFromJSON = function(json){
	console.log("LOAD FROM JSON");
	for (var i in json) {
		console.log(json[i]);
        this[i] = json[i];
    }

}

module.exports = loadJSON;