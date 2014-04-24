function Communication() {}

Communication.prototype.doPost = function (url2, data2, type2, reload, ret) {
    returnValue = true;
    if(reload != null)
        returnValue = reload;
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

            if(reload!=null){
                ret(false);
                return;
            }
            ret(true);
            return;
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