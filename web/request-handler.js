var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpH = require('./http-helpers');


// require more modules/folders here!
var postHandler = function(url) {
    //check if the url is in the list
    archive.isUrlInList(url, function(inList) {
        //if url in the list
        if (inList) {
            //check if it is archived
            archive.isUrlArchived(url, function(isArchived) {
                if (isArchived) {
                    console.log(url + "archived");
                    //redirect if archived
                    httpH.sendRedirect(res, url + ".html"); //
                } else {
                    console.log(url + " archiving in progress");
                    //download from the url, then redirect
                    archive.downloadUrl(url, function() {
                        //httpH.sendRedirect(res, url +".html");

                        httpH.sendRedirect(res, "loading.html");
                        //redirect to the loading.html page while url is being downloaded
                    });



                }
            });

        } else {
            console.log(url + " not in the list.");
            //if url is not in the list, add it to the list, archive it, then redirect to the page.
            archive.addUrlToList(url, function() {
                //console.log(url);
                archive.downloadUrl(url, function() {
                    //console.log(url);
                    httpH.sendRedirect(res, "loading.html");
                });

            });
        }
    });
};

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

        var routes = {
        	"/": "/index.html",
        };

    if (req.method === "GET") {
    	var route = routes[req.url];
    	if(!route){
    		routes[req.url] = req.url;
    	} 

    	httpH.serveAssets(res, route);
    	/*
        if (req.url === "/") {
            httpH.serveAssets(res, "index.html");
        }
        if (req.url === "/loading.html") {
            httpH.serveAssets(res, "loading.html");
        } */
    }
    if (req.method === "POST") {
        //I think we can only sendRedirect only once per POST, because response ends when we call the function

        httpH.collectData(req, function(data) {
            var url = data.toString().slice(4);
            postHandler(url);

        });

    }

    //res.end(archive.paths.list);
};
