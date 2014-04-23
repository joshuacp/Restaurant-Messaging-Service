function Communication() {}

Communication.prototype.doPost = function (url2, data2, type2, ret) {
    returnValue = true;
    if(ret != null)
        returnValue = ret;
    console.log({
        url: url2,
        method: "POST",
        data: data2,
        async: 'false',
        type: type2
    });
    $.ajax({
        url: url2,
        method: "POST",
        data: data2,
        async: 'true',
        type: type2,
        success: function (result) {
            //console.log("YEAH");
            //console.log(result);
            console.log("SUCCES");
            console.log(result);

            if(result != "")
                window.location = result;

            if(returnValue == true)
                return true;          
            //tempproxy.getModel().loadDataFromJson(result);
        }

    });
}

Communication.prototype.doGet = function (url) {
    var newModel;
    $.ajax({
        url: url,
        type: 'GET',
        async: 'false',
        success: function (result) {
           

           console.log(result);
           return result;
        }
    });
}

Communication.prototype.doGetSynch = function (url,callback) {
    var newModel;
    $.ajax({
        url: url,
        type: 'GET',
        async: 'false',
        success: function (result) {
           console.log("returned: " + result);
           callback(result);
        }
    });
}