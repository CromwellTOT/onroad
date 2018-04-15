var dd = {};

//var dd.collectionName

dd.findAll = function(db, callback) {
	var collection = db.collection(dd.collectionName).find();
	var result = [];
	collection.each(function(err, doc) {
		if (doc !== null) {
			result.push(doc);
		} else {
			callback(result);
		}
	});
};
//keyValuePair = {key: value}
dd.findOne = function(db, keyValuePair, callback) {
	var collection = db.collection(dd.collectionName).find(keyValuePair);
	var result;
	collection.each(function(err, doc) {
		if (doc !== null) {
			result = doc;
		} else{
			callback(result);
		}
	});
};

dd.findMultiple = function(db, key, value, callback) {
	var query = {}
	query[key] = value;
	
	var collection = db.collection(dd.collectionName).find(query);
	var result = [];
	collection.each(function(err, doc) {
		if (doc !== null) {
			result.push(doc);
		} else{
			callback(result);
		}
	});
};

dd.insert = function(db, data, callback) {
	var collection = db.collection(dd.collectionName);
	collection.insertOne(data, function(err, res) {
		callback();
	});
};
//data ={key: value, }
dd.update = function(db, keyValuePair, data, callback) {
	var collection = db.collection(dd.collectionName);
	delete data._id;
	collection.replaceOne(keyValuePair, data, function(err, res) {
		callback();
	});
};

dd.delete = function(db, keyValuePair, callback) {
	var collection = db.collection(dd.collectionName);
	collection.deleteOne(keyValuePair, function(err, res) {
		callback();
	});
};

module.exports = dd;