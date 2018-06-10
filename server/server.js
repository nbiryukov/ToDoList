require('./models/index');
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var http = require('http');
var api = require('./routes');


var app = express();

app.use(express.static(path.resolve(__dirname + '../..' + '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app);
server.listen(port, function () {
  console.log('server is running on port ' + port);
});


app.use('/', api);
