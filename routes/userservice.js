var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var dd = require("./userdao");
var url = "mongodb://localhost:27017";

dbName = "mydb";
dd.collectionName = 'users'

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
			resp.end("user " + data.name + " created");
			client.close();
		});
	});
});

router.get("/:name", function(req, resp) {
	var name = req.params.name;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.findOne(db, {"name": name}, function(result) {
			resp.json(result);
			client.close();
		});
	});
});

router.put("/", function(req, resp) {
	var data = req.body;

	var name = data.name

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.update(db, {"name": name}, data, function() {
			resp.end("user " + name + " updated");
			client.close();
		});
	});
});

router.delete("/:name", function(req, resp) {
	var name = req.params.name;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.delete(db, {"name": name}, function() {
			resp.end("user " + name + " deleted");
			client.close();
		});
	});
});

module.exports = router;





