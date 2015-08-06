var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpH = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function(req, res) {

    //console.log(req.url);
    //console.log(process.cwd());
    //archive.downloadUrls(["www.google.com", "www.wikipedia.org", "www.hackreactor.com"]);

    /*
        if (req.method === "GET" && req.url === "/") {

            fs.readFile(archive.paths.siteAssets + "/index.html", {"encoding": "utf-8"}, function(error, content) {

                httpH.sendResponse(res, content);

            });
        } else if (req.method === "GET") {

            fs.readFile(archive.paths.archivedSites + req.url, { "encoding": "utf-8"}, function(error, content) {
                if (error) {
                    httpH.send404Response(res);
                } else {
                    httpH.sendResponse(res, content, 200);
                }
            });
        }*/

    if (req.method === "GET") {
        if (req.url === "/") {
            httpH.serveAssets(res, "index.html");
        } else {
            var path = req.url.toString().slice(1);
            console.log(path);
            httpH.serveAssets(res, path);
        }
    }
    if (req.method === "POST") {
        //check and see if the url exists in the list
        //if exists, indicate that the url is already saved

        //if not, save the url
        httpH.collectData(req, function(data) {
            var url = data.toString().slice(4);

            //check if the url is in the list
            archive.isUrlInList(url, function(inList) {
            	//if url in the list
                if (inList) {
                	//check if it is archived
                    archive.isUrlArchived(url, function(isArchived) {
                        if (isArchived) {
                        	//redirect if archived
                            httpH.sendRedirect(res, url); //
                        } else {
                        	//download from the url, then redirect
                            archive.downloadUrl(url, function() {
                                httpH.sendRedirect(res, url);
                            });

                        }
                    });

                } else {
                //if url is not in the list, add it to the list, archive it, then redirect to the page.
                    archive.addUrlToList(url, function() {
                    	//console.log(url);
                        archive.downloadUrl(url, function() {
                        	//console.log(url);
                        	httpH.sendRedirect(res, url);
                        });

                    });
                }
            });
        });

        httpH.sendRedirect(res, "loading.html");
        //redirect to the loading.html page while POST is being handled
    }

    //res.end(archive.paths.list);
};
