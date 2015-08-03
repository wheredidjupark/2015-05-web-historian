var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

	//console.log(req.url);
	//console.log(process.cwd());

	if(req.method === "GET"){
		res.writeHead(200, httpHelper.headers);
		fs.readFile(process.cwd()+'/web/public/index.html', function(error, content){
			//console.log(content);
			res.write(content);
			res.end();
		});
	}

	if(req.method === "POST"){

	}

  //res.end(archive.paths.list);
};
