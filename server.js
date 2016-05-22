var express = require('express');
var compress = require('compression');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var morgan = require('morgan');
var fs = require('fs');
var exec = require('child_process').exec;
var content = require('./content.json');

var app = express();

///////////// Middleware
app.use(compress());  // gzip static files
app.use(bodyParser.json());
var accessLogStream = fs.createWriteStream(__dirname + '/logs/out.log', {flags: 'a'})
app.use(morgan('dev', {stream: accessLogStream}));
app.use(express.static(__dirname + '/public'));
app.use('/blackswan', express.static(__dirname + '/projects/black-swan'));

///////////// Config
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/projects');

///////////// Routing
app.get('/api/projects', function(req, res) {
    res.json({ projects: content.projects });
});

app.get('/api/bio', function(req, res) {
    res.json({ bio: content.bio });
});

app.get('/blackswan', function(req, res) {
    res.render('black-swan/index.html'); // Point to submodule's html page
});

app.post('/webhooks/push', function(req, res) {
    exec('./pull_and_restart.sh');
});

var port = 3000;
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
