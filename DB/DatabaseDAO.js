var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;



  function DatabaseDAO(){


  }

  DatabaseDAO.prototype.getFormat = function(){

  	return format("mongodb://%s:%s/test", host, port);
  }

    DatabaseDAO.prototype.getHost = function(){

  	return "localhost";
  }

    DatabaseDAO.prototype.getPort = function(){

  	return 27017;
  }

module.exports = DatabaseDAO;