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
        fs.readFile(process.cwd() + '/web/public/index.html', function(error, content) {
            //console.log(content);
            res.write(content);
            res.end();
        });
    } else {
        //console.log(req.url.slice(1));
        fs.readFile(process.cwd() + '/archives/sites' + req.url, function(error, content) {
            if (error) {
            	console.log(process.cwd() + "archives/sites" +req.url);
            	res.writeHead(404);
            	res.end();
            } else {
                res.writeHead(200, {'content-type':'plain/text'});
                res.end(content);
            }

        });
    }

    if (req.method === "POST") {

    }

    //res.end(archive.paths.list);
};
