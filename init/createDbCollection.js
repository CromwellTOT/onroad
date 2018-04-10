// create a new collection (table)
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"

// Connect to the db
MongoClient.connect(url, function (err, db) {
   
    if (err) throw err;

    var dbo = db.db("mydb");

    //Write databse Insert/Update/Query code here..
	dbo.createCollection("accounts", function(err, res) {
		if (err) throw err;
		console.log("accounts Collection created!");
		db.close();
	});
        
});