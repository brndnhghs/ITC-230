var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var records = require('./lib/records.js');

http.createServer(function(req, res){

	let url = req.url.split("?");
    let params = qs.parse(url[1]);
    let path = url[0].toLowerCase();

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

		case '/getall':
			let recordList = records.getAll();
			res.writeHead(200, { 'content-type': 'text/plain' });
			recordList = JSON.stringify(recordList);
			res.end(recordList);

		case '/get':
			let found = records.get(params.title);
           
            res.writeHead(200, { 'content-type': 'text/plain' });
            let results = (found) ? JSON.stringify(found) : "not found";
            res.end(params.title + ": " + results);
            break;

      	case '/delete':
        	let deletedRecord = records.get(params.title);
      		records.delete(params.title);
		    let newRecordsList = records.getAll();
		    let deleteMessage = (deletedRecord) ? 'Deleted: ' + JSON.stringify(deletedRecord) + '\nTotal Records: ' + newRecordsList.length : 'Record not found. No records deleted. Total Records: ' + newRecordsList.length;
		    res.writeHead(200, { 'Content-Type': 'text/plain' } );
		    res.end(deleteMessage);
      break;

		default: 
			res.writeHead(404, {'Content-Type': 'text/plain'});
      		res.end('Not found');
      		console.log(path);
      		break;
	}




}).listen(3000);