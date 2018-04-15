var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var dd = require("./blogdao");
var url = "mongodb://localhost:27017";
var blogId = "1";


dbName = "mydb";
dd.collectionName = 'blogs'

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
	data.id = blogId;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.insert(db, data, function() {
			resp.end('Blog ' + data.id + " created");
			blogId++;
			blogId = blogId.toString();
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
	var data = req.body,
		id = data.id;
	
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.update(db, {"id": id}, data, function() {
			resp.end("Blog " + id + ' updated');
			client.close();
		});
	});
});

router.delete("/:id", function(req, resp) {
	var id = req.params.id;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		dd.delete(db, {"id": id}, function() {
			resp.end("Blog " + id + ' deleted');
			client.close();
		});
	});
});

module.exports = router;




