var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var bd = require("./blogdao");
//var url = "mongodb://localhost:27017";
var url = "mongodb://root:wqYNye8QjPAJ@localhost:27017";

var dbName = "mydb";
bd.collectionName = 'blogs'
// init start blog ID for creating
var blogId = "1";
MongoClient.connect(url, function(err, client) {
	var db = client.db(dbName);
	bd.findAll(db, result => {
		result.forEach(function(item) {
			if(item.id > blogId) {
				blogId = item.id + 1 + "";
			}
		});
	});
});
// rest service
router.get("/", function(req, resp) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		bd.findAll(db, result => {
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
		bd.insert(db, data, function() {
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
		bd.findOne(db, {"id": id}, function(result) {
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
		bd.update(db, {"id": id}, data, function() {
			resp.end("Blog " + id + ' updated');
			client.close();
		});
	});
});

router.delete("/:id", function(req, resp) {
	var id = req.params.id;

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		bd.delete(db, {"id": id}, function() {
			resp.end("Blog " + id + ' deleted');
			client.close();
		});
	});
});

module.exports = router;





