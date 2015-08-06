var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpH = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function(req, res) {

    //console.log(req.url);
    //console.log(process.cwd());

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, httpH.headers);
        fs.readFile(process.cwd() + '/web/public/index.html',{"encoding": "utf-8"}, function(error, content) {
        res.end(content);
            //console.log(content);
        });
    } else if (req.method === "GET") {

        fs.readFile(process.cwd() + '/archives/sites' + req.url,{"encoding":"utf-8"}, function(error, content) {
            if (error) {
                console.log(process.cwd() + "archives/sites" + req.url);
                //send 404 Response
                httpH.send404Response(res);
            } else {
                //send the contents
                /*
                res.writeHead(200, {
                    'content-type': 'plain/text'
                });
                res.end(content);
                */
                httpH.sendResponse(res,content,200);
            }
        });
    }

    if (req.method === "POST") {
        //check and see if the url exists in the list

        //if exists, indicate that the url is already saved

        //if not, save the url

        httpH.collectData(req, function(data) {
        	res.writeHead(302);
        	archive.addUrlToList(data.toString().slice(4));
            res.end();
           
        });

    }

    //res.end(archive.paths.list);
};
