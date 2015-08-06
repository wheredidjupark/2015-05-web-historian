var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpH = require('./http-helpers');


var postUrlHandler = function(url) {
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
                    //download from the url, then redirect to the loading page
                    archive.downloadUrl(url, function() {

                        httpH.sendRedirect(res, "loading.html");
                    });



                }
            });

        } else {
            console.log(url + " not in the list.");
            //if url is not in the list, add it to the list, archive it, then redirect to the page.
            archive.addUrlToList(url, function() {
                archive.downloadUrl(url, function() {
                    httpH.sendRedirect(res, "loading.html");
                });

            });
        }
    });
};

exports.handleRequest = function(req, res) {
    //console.log(process.cwd());

    var routes = {
        "/": "/index.html",
    };

    if (req.method === "GET") {
    	//serve up the url after saving the route
        var route = routes[req.url];
        if (!route) {
            routes[req.url] = req.url;
        }
        httpH.serveAssets(res, route);
    }
    if (req.method === "POST") {
        //I think we can only sendRedirect only once per POST, because response ends when we call the function

        httpH.collectData(req, function(data) {
            var url = data.toString().slice(4);
            postUrlHandler(url);
        });

    }
};
