const express = require('express');					// create our app with express
const bodyParser = require('body-parser');			// pull information from HTML POST (express4)
//const logger = require('morgan');					// log requests to the console (express4)
//const methodOverride = require('method-override');	// simulate DELETE and PUT (express4)

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://audols:marsupial@vesteddb-shard-00-00-gbqec.mongodb.net:27017,vesteddb-shard-00-01-gbqec.mongodb.net:27017,vesteddb-shard-00-02-gbqec.mongodb.net:27017/test?ssl=true&replicaSet=VestedDB-shard-0&authSource=admin";

var db

// Create the app
const app = express();

MongoClient.connect(url, (err, database) => {
 	if (err) throw err;
  
 	db = database

 	// Create a server where browsers can connect to
	app.listen(3000, () => {
		console.log('listening on 3000')
	})

})



// bp extracts data from the <form> element and adds them to the body
// property in the request object
app.use(bodyParser.urlencoded({extended: true}))
//application viewengine
app.set('view engine', 'ejs')




app.get('/', function(req, res){
	db.collection('users').find().toArray(
		function(err,result){
			if(err) throw err
			res.render('signup.ejs', {users: result})
		}
	)
	//res.render('index.ejs', {users: db.collection('users').find().toArray()})
})

app.post('/users', (req, res) => {
	db.collection('users').save(req.body, 
		function(err, result){
			if(err) throw err

			console.log('saved to database')
			res.redirect('/')

		})
})