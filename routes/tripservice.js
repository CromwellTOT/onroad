var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var td = require("./tripdao");
//var url = "mongodb://localhost:27017";
var url = "mongodb://root:wqYNye8QjPAJ@localhost:27017";

var dbName = "mydb";
td.collectionName = 'trips'
// init start trip ID for creating
var tripId = "1";
MongoClient.connect(url, function(err, client) {
	var db = client.db(dbName);
	td.findAll(db, result => {
		result.forEach(function(item) {
			if(item.id > tripId) {
				tripId = item.id + 1 + "";
			}
		});
	});
});
// rest service
router.get("/", function(req, resp) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.findAll(db, result => {
			resp.json(result);
			client.close();
		});
	});
});

router.post("/", function(req, resp) {
	var data = req.body;
	data.id = tripId;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.insert(db, data, function() {
			resp.end('Trip ' + data.id + " created");
			tripId++;
			tripId = tripId.toString();
			client.close();
		});
	});
});
/*
router.get("/id/:id", function(req, resp) {
	var id = req.params.id;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.findOne(db, {"id": id}, function(result) {
			resp.json(result);
			client.close();
		});
	});
});
*/
router.get("/:key/:value", function(req, resp) {
	var key = req.params.key,
		value = req.params.value;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.findMultiple(db, key, value, function(result) {
			resp.json(result);
			client.close();
		})
	})
});

router.put("/", function(req, resp) {
	var data = req.body;
	var id = data.id
	
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.update(db, {"id": id}, data, function() {
			resp.end("Trip " + id + ' updated');
			client.close();
		});
	});
});

router.delete("/:id", function(req, resp) {
	var id = req.params.id;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		td.delete(db, {"id": id}, function() {
			resp.end("Trip " + id + ' deleted');
			client.close();
		});
	});
});

module.exports = router;





