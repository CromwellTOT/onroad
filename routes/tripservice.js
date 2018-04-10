var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var dd = require("./tripdao");
var url = "mongodb://localhost:27017";

dbName = "mydb";
dd.collectionName = 'trips'

router.get("/", function(req, resp) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.findAll(db, result => {
			resp.json(result);
			client.close();
		});
	});
});

router.post("/", function(req, resp) {
	var data = req.body;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.insert(db, data, function() {
			resp.end('trip ' + data.id + " created");
			client.close();
		});
	});
});

router.get("/:id", function(req, resp) {
	var id = req.params.id;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.findOne(db, {"id": id}, function(result) {
			resp.json(result);
			client.close();
		});
	});
});

router.put("/", function(req, resp) {
	var data = req.body;

	var id = data.id
	
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.update(db, {"id": id}, data, function() {
			resp.end("trip " + id + ' updated');
			client.close();
		});
	});
});

router.delete("/:id", function(req, resp) {
	var id = req.params.id;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.delete(db, {"id": id}, function() {
			resp.end("trip " + id + ' deleted');
			client.close();
		});
	});
});

module.exports = router;





