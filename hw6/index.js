//INIT

const 	express = require('express'),
		handlebars = require('express-handlebars'),
		app = express();
app.use(require("body-parser").urlencoded({extended: true}));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

var mongo = require('./models/albums.js');



//INDEX

app.get('/', function(req, res){
	res.render('index',
		{ 	key: 'value'
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


 app.post('/search', function(req, res){

	userInput = req.body.titleofrecord;

	mongo.model.findOne({title: userInput}, function(err, docs){
		if (err) {
			console.log(err);
		};

		if (docs == null) {
			docs = 'not found';
		};

		res.render("result", {
			title: userInput,
			result: docs
		});
	});
});

//DELETE

app.get('/delete', function(req, res){

	mongo.model.remove({title: userInput}, function(err, result){

		if (err) return next(err);

		var deleted = result.result.n !== 0;

		mongo.model.count( function(err, total){
			res.render('delete', {
				title: req.query.title, 
				deleted: deleted,
				length: total
			});
		});
	});
});

//ADD

app.get('/add', function(req, res){

	var newRecord = {title: userInput, artist: 'lorem', year:'9999', length:'99:99', genre:'noise'};

	mongo.model.update({title: userInput}, newRecord, {upsert: true}, function(err, result){

		var added = result;

		console.log(result);

		mongo.model.count( function(err, total){
			res.render('add', {
				title: req.query.title, 
				added: added,
				length: total
			});
		});
	});
});

//ALL

app.get('/all', function(req, res) {
	
	mongo.model.find({}, function(err, docs){
		if (err) {
			console.log(err);
		} else {
			console.log(docs);
			res.render("all", {
				all: docs
			});
		};
	});
});

//API

//GET ALL

app.get('/api/record', function(req,res, next){
    mongo.model.find( function(err,results){
        if (err || !results) return next(err);
        res.json(results);
    });
});

//SEARCH GET SINGLE

app.get('/api/search/:title', function(req, res, next){
    var title = req.params.title;
    console.log(title);
    mongo.model.findOne({title: title}, function(err, result){
        if (err || !result) return next(err);
        res.json( result );    
    });
});

//DELETE

app.get('/api/delete/:title', function(req, res, next){
    var title = req.params.title;
    console.log(title);
    mongo.model.remove({title: title}, function(err, result){
        if (err) return next(err);
        res.json({"deleted": result.result.n});
    });
});

//ADD

app.get('/api/add/:title/:artist/:year/:length/:genre', function(req, res, next){
    var title = req.params.title;
    console.log(title);
    mongo.model.update({title: title}, {title:title, artist:req.params.artist, year:req.params.year, length:req.params.length, genre:req.params.genre}, {upsert: true }, function(err, result){
        if (err) return next(err);
        res.json({updated: result.nModified});
    });
});

app.listen(3000, function(){
	console.log('server started on port 3000.')
});