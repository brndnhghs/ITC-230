var mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
var connectionString = "mongodb://brndnhghs:oknotok1@ds133378.mlab.com:33378/brndnhghsdb";
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));

exports.db = mongoose.connection;

// define Book model in JSON key/value pairs
// values indicate the data type of each key
var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 artist: String,
 year: String
}); 

module.exports = mongoose.model('Album', mySchema);
