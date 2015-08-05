var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function(req, res) {

    //console.log(req.url);
    //console.log(process.cwd());

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, httpHelper.headers);
        fs.readFile(process.cwd() + '/web/public/index.html',{"encoding": "utf-8"}, function(error, content) {
            res.end(content);
            console.log(content);
        });
    } else if (req.method === "GET") {

        fs.readFile(process.cwd() + '/archives/sites' + req.url,{"encoding":"utf-8"}, function(error, content) {
            if (error) {
                console.log(process.cwd() + "archives/sites" + req.url);
                //send 404 Response
                res.writeHead(404);
                res.end();
            } else {
                //send the contents
                res.writeHead(200, {
                    'content-type': 'plain/text'
                });
                res.end(content);
            }
        });
    }

    if (req.method === "POST") {
        //check and see if the url exists in the

        //if exists, indicate that the url is already saved

        //if not, save the url

        var collectData = function(request, callback) {
            var data = "";

            request.on("data", function(chunk) {
                data += chunk;
            });

            request.on("end", function() {
                callback(data); //the data will be in json format
            });
        };

        collectData(req, function(data) {
        	res.writeHead(302);
        	var info = data.toString().slice(4);
        	console.log(info);

        	archive.addUrlToList(info);
            res.end();
           
        });

    }

    //res.end(archive.paths.list);
};
