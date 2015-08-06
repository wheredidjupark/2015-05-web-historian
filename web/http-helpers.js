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

    var encoding = {
        encoding: "utf-8"
    };

    fs.readFile(archive.paths.siteAssets + "/" + asset, encoding, function(error, content) {
        if (error) {
            fs.readFile(archive.paths.archivedSites + "/" + asset, encoding, function(error2, content2) {
                if (error2) {
                    if (callback) {
                        callback();
                    } else {
                        exports.send404Response(res);
                    }
                } else {
                    exports.sendResponse(res, content2);
                }
            });
        } else {
            exports.sendResponse(res, content);
        }
    });

    if (callback) {
        callback();
    }

};


exports.sendRedirect = function(response, location, status){
	console.log("redirecting to "+location);
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.collectData = function(req, callback) {

    var data = "";

    req.on("data", function(chunk) {
        data += chunk;
    });

    req.on("end", function() {
        callback(data);
    });
};

exports.send404Response = function(res) {
    res.writeHead(404, "Error");
    res.end();
};

exports.sendResponse = function(res, data, statCode) {
    var statusCode = statCode || 200;
    res.writeHead(statusCode, exports.headers);
    res.end(data);
};
// As you progress, keep thinking about what helper functions you can put here!
