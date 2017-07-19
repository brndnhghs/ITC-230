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

    var found = JSON.stringify(recordsJS.search(userInput, type, 'recordsArr'));

    if (found == undefined) {
    	found = 'could not find ' + userInput;
    };

    res.render("result", {title: userInput, result: found, type: type});

   	console.log(found);
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


app.listen(3000, function(){
	console.log('server started on port 3000.')
});