var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
        callback(found);
    });
};

exports.addUrlToList = function(url, callback) {
    console.log("Appending "+ url + " to the list");

    fs.appendFile(exports.paths.list, url + '\n', function(error) {
    	fs.readFile(exports.paths.list,{encoding: "utf-8"} ,function(err, content){
    		console.log(content +"is the content in the requested file");
    	});
        if (error) {
            console.error(url + ": unsuccessful in adding the url to the list");
		}
		console.log("successful!");
    });

    callback();
};

exports.isURLArchived = function(url) {
    //check if url is in the list
    //if the url is in the list
    //check if the url is archived under sites/
    //if yes, return true

    //if not 
    //if the url isn't in the list, 
};

exports.downloadUrls = function() {
    //	
};
