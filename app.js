var express = require('express');
var compress = require('compression');
var app = express();
var port = process.env.PORT || 8080;

//Gzip
app.use(compress());

//Serve
app.use('/', express.static(__dirname + '/build'));

//Run server
app.listen(port);
console.log('Magic happens on port ' + port);
