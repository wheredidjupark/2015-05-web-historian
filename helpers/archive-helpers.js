var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var url = require('url');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
    'siteAssets': path.join(__dirname, '../web/public'),
    'archivedSites': path.join(__dirname, '../archives/sites'),
    'list': path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj) {
    _.each(pathsObj, function(path, type) {
        exports.paths[type] = path;
    });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
    //read list of urls from sites.txt

    fs.readFile(exports.paths.list, function(error, content) {
        if (error) {
            console.log("Couldn't read URL");
        } else {
            callback(content.toString().split('\n'));
        }
    });

};

exports.isUrlInList = function(url, callback) {
    exports.readListOfUrls(function(urls) {
        var found = false;
        for (var i = 0; i < urls.length; i++) {
            if (urls[i] === url) {
                found = true;
                break;
            }
        }
        //callback on boolean value
        if(callback){
        	callback(found);
        }
    });
};

exports.addUrlToList = function(url, callback) {
    //console.log("Appending "+ url + " to the list");

    fs.appendFile(exports.paths.list, url + '\n', function(error) {
    	//read the file to which you appended the data
    	
    	/*
    	fs.readFile(exports.paths.list,{encoding: "utf-8"} ,function(err, content){
    		console.log(content +"is the content in the requested file");
    	});*/
        if (error) {
            console.error(url + ": unsuccessful in adding the url to the list");
		}
		console.log("adding " + url + " to the list successful!");
    });

    if(callback){
    	callback();
    }
};

exports.isUrlArchived = function(url, callback) {
	//look at the node.js API. fs.exists will be deprecated

	var sitePath = path.join(exports.paths.archivedSites, url+".html");
	console.log(sitePath + " is the sitePath for isUrlArchived");
	fs.exists(sitePath, function(exists){
		callback(exists);
	});
};

exports.downloadUrls = function(urls, callback) {	
	_.each(urls, function(url){

		http.get({host: url}, function(res){
			console.log(exports.paths.archivedSites+"/"+url+".html");
			res.pipe(fs.createWriteStream(exports.paths.archivedSites+"/"+url+".html"));
		});
	});
	if(callback){
		callback();
	}
};

exports.downloadUrl = function(url, callback){
	http.get({host: url}, function(res){
		res.pipe(fs.createWriteStream(exports.paths.archivedSites+"/"+url+".html"));
	});

	if(callback){
		callback();
	}
};