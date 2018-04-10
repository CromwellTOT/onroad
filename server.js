//node server
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var ts = require("./routes/tripservice");
var us = require("./routes/userservice")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/rest/trip/", ts);
app.use("/rest/user/", us);

app.use(express.static(__dirname + "/public")); // use for front end file access

// REST
/*
app.get("/:filename", function(req, resp) {
	var fileName = req.params.filename;
	resp.sendFile(__dirname + "/public/" + fileName + ".html");
});
*/

app.get("/", function(req, resp) {
	resp.sendFile(__dirname + "/public/main.html");
});

// started
app.listen(4444);

console.log("server started");