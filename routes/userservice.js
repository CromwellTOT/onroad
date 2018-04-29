var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var ud = require("./userdao");
var url = "mongodb://root:wqYNye8QjPAJ@localhost:27017";

var dbName = "mydb";
ud.collectionName = 'users'

router.get("/", function(req, resp) {
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.findAll(db, result => {
			resp.json(result);
			client.close();
		});
	});
});

router.post("/", function(req, resp) {
	var data = req.body;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.insert(db, data, function() {
			resp.end("User " + data.username + " created");
			client.close();
		});
	});
});

router.post("/auth", function(req, resp) {
	var data = req.body;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.findAll(db, result => {
			var auth = false;
			result.forEach((user) => {
				if(user.username == data.username && user.password == data.password) {
					auth = true;
					console.log(data.username + ' auth success');
				}
			});
			resp.end(auth + "");
			client.close();
		});
	});
})

router.get("/:name", function(req, resp) {
	var name = req.params.name;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.findOne(db, {"username": name}, function(result) {
			resp.json(result);
			client.close();
		});
	});
});

router.put("/", function(req, resp) {
	var data = req.body;

	var name = data.username

	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.update(db, {"username": name}, data, function() {
			resp.end("User " + name + " updated");
			client.close();
		});
	});
});

router.delete("/:name", function(req, resp) {
	var name = req.params.name;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.delete(db, {"username": name}, function() {
			resp.end("User " + name + " deleted");
			client.close();
		});
	});
});

router.delete("/id/:value", function(req, resp) {
	var _id = req.params.value;
	MongoClient.connect(url, function(err, client) {
		var db = client.db(dbName);
		ud.deleteBy_id(db, _id, function() {
			resp.end("Limited use ONLY!!!! User " + _id + " deleted");
			client.close();
		})
	})
})

module.exports = router;





