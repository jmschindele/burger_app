// Add dependencies

var express = require('express');
var exphbs = require('express-handlebars');

//set port

var PORT = process.env.PORT || 3000;

// set app to express

var app = express();

//Serve static content

app.use(express.static('public'));

//Parse application body

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template engine set up(handlbars)

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//import routes and give server access to them

var routes = require('./controllers/burgerController.js');

app.use(routes);

//Start the server so it can begin listening

app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});