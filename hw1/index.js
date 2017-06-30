var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){

	var path = req.url.toLowerCase();

	switch(path) {
		case '/':
			fs.readFile('./public/home.html', function(err, data) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				res.end();
			});
			break;

		case '/about':
			fs.readFile('./package.json', function(err, data) {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write(data);
				res.end();
			});
			break;

		default: 
			res.writeHead(404, {'Content-Type': 'text/plain'});
      		res.end('Not found');
      		console.log(path);
      		break;
	}




}).listen(3000);