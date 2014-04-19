

function loadJSON() {


}
loadJSON.prototype.loadFromJSON = function(json){

	for (var i in json) {

        this[i] = json[i];
    }

}

module.exports = loadJSON;