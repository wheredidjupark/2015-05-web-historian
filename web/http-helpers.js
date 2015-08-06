var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};


exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)


//data 
fs.readFile(archive.);
  exports.sendResponse(res, data, 200);

};

exports.collectData = function(req, callback){

	var data = "";

	req.on("data", function(chunk){
		data += chunk;
	});

	req.on("end", function(){
		callback(data);
	});
};

exports.send404Response = function(res){
	res.writeHead(404, "Error");
	res.end();
};

exports.sendResponse = function(res, data, statCode){
	var statusCode = statCode || 200;
	res.writeHead(statusCode, exports.headers);
	res.end(data);
};
// As you progress, keep thinking about what helper functions you can put here!
