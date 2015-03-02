var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/app'));

//add this so the browser can GET the bower files
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() { 
    console.log('Your files will be served through this web server')
});