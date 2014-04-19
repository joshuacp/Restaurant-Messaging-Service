function Communication() {}

Communication.prototype.doPost = function (url2, data2, type2) {
    console.log({
        url: url2,
        method: "POST",
        data: data2,
        async: 'true',
        type: type2
    });
    $.ajax({
        url: url2,
        method: "POST",
        data: data2,
        async: 'true',
        type: type2,
        success: function (result) {
            //tempproxy.getModel().loadDataFromJson(result);
        }

    });
}

Communication.prototype.doGet = function (url) {
    var newModel;
    $.ajax({
        url: url,
        type: 'GET',
        async: 'true',
        success: function (result) {
        }
    });
}