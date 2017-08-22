//INIT


const 	express = require('express'),
		handlebars = require('express-handlebars'),
		app = express(),
		bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // note to self, bugs were because this line was missing
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

var mongo = require('./models/albums.js');



//INDEX

app.get('/', function(req, res){

	mongo.find({}, function(err, records){
		console.log(records)
        if (err) return next(err);
        res.render('index', 
        	{	records: JSON.stringify(records)
			}
		);
	});
});


//ABOUT

app.get('/about', function(req, res){
	res.type('text/plain');
    res.sendFile(__dirname + '/package.json');
});

// ALL

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

// DELETE

app.get('/api/delete/:id', (req,res, next) => {
    mongo.remove({"_id":req.params.id }, (err, result) => {

        if (err) return next(err);

        res.json({"deleted": result.result.n});
    });
});

//ADD


app.post('/api/add/', (req,res, next) => {

	console.log(req.body.title);

    if (!req.body._id) {
    var newRecord = new mongo({title:req.body.title, artist:req.body.artist, year:req.body.year});

    newRecord.save((err,record) => {
            if (err) return next(err);
            //console.log(record)
            res.json({updated: 0, _id: record._id});
        });

    } else { 
        mongo.updateOne({ _id: req.body._id}, {title:req.body.title, artist: req.body.artist, year: req.body.year }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.listen(3000, function(){
	console.log('server started on port 3000.')
});