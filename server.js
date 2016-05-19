var express = require("express");
var compress = require("compression");
var ejs = require('ejs');

var app = express();

// Gzip static files
app.use(compress());
// Static file-handling
app.use(express.static(__dirname + '/public'));
app.use('/blackswan', express.static(__dirname + '/projects/black-swan'));

// Templating engine setup
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/projects');

app.get('/api/projects', function(req, res) {
    var projects = [
        {
            type: "web",
            title: "Nassim Taleb Visualization",
            link: "http://blackswan.bpourkazemi.com",
            desc: "Inequality visualization inspired by \"The Black Swan\". Built with D3.js!",
            screenshot_src: "./assets/images/blackswan.png"
        },
        {
            type: "web",
            title: "Comb",
            link: null,
            desc: "Created a webapp to convert unsearchable PDFs to searchable ones using OCR. Built with Django, ImageMagick, and PyTesser. HackUVA Center for Open Science award.",
            screenshot_src: "./assets/images/comb.png" },
        {
            type: "mobile",
            title: "Rapback (in progress)",
            link: null,
            desc: "A social network for making funny rap videos with your friends. On Android and iOS, with a Django backend. Fall '14 release date.",
            screenshot_src: "./assets/images/Rapback.png"
        }
    ];
    res.json({ projects: projects });
});

app.get('/api/resume', function(req, res) {
    res.json({
        resume: { resume_src: "assets/Resume.pdf" }
    });
});

app.get('/blackswan', function(req, res) {
    // Point to submodule's html page
    res.render('black-swan/index.html');
});

var port = 3000;
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
