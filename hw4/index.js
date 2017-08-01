//INIT

var recordsJS = require('./lib/records.js');
const 	express = require('express'),
		handlebars = require('express-handlebars'),
		app = express();
app.use(require("body-parser").urlencoded({extended: true}));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');



//INDEX

app.get('/', function(req, res){
	res.render('index',
		{ 	key: 'value',
			record: JSON.stringify(recordsJS)
		 }
	);
});

//ABOUT

app.get('/about', function(req, res){
	res.type('text/plain');
    res.sendFile(__dirname + '/package.json');
});

//SEARCH

var userInput = '';
var type = '';

app.post('/search', function(req, res){

	userInput = req.body.titleofrecord;
	type = req.body.key;

	var found = recordsJS.search(userInput, type, 'recordsArr');

	res.render("result", {title: userInput, result: JSON.stringify(found), type: type});

});

//DELETE

app.get('/delete', function(req, res){
	recordsJS.delete(userInput, type, 'recordsArr');

	var lengthVar = recordsJS.lengthVar;
	var deletedItem = recordsJS.deletedItem;

	res.render("delete", {
		length: lengthVar,
		deleted: deletedItem
	});
});

//ADD

app.get('/add', function(req, res){

	recordsJS.add(userInput, type, 'recordsArr');
	
	res.render("add", {
		length: recordsJS.lengthVar,
		added: recordsJS.addmsg
	});
});

//ALL

app.get('/all', function(req, res){
	console.log(recordsJS.getAll());
	var all = JSON.stringify(recordsJS.getAll());
	res.render("all", {
		all: all
	})
});


app.listen(3000, function(){
	console.log('server started on port 3000.')
});