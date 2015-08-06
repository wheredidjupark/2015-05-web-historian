var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpH = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function(req, res) {

    //console.log(req.url);
    //console.log(process.cwd());
    //archive.downloadUrls(["www.google.com", "www.wikipedia.org", "www.hackreactor.com"]);

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
    }

    if (req.method === "POST") {
        //check and see if the url exists in the list
        //if exists, indicate that the url is already saved

        //if not, save the url
        httpH.collectData(req, function(data) {
        	var url = data.toString().slice(4);

        	archive.isUrlInList(url, function(inList){
        		if(inList){
					//check if the url is archived
        			archive.isUrlArchived(url, function(isArchived){
        				if(isArchived){
        					//serve up the page
        				} else {
        					archive.downloadUrl(url, function(){
        						//then serve up the page
        					});

        				}
        			});
        		} else {
        			//add it to the list, archive it, then serve the page.
        			archive.addUrlToList(url, function(){
        				archive.downloadUrl(url, function(){
        					//serve the page
        				});

        			});
        		}
        	});
            httpH.sendResponse(res, null, 302);
            archive.addUrlToList(url);

        });


        //serve the loading.html page while POST is being handled
    }

    //res.end(archive.paths.list);
};
