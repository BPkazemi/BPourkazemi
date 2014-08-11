var express = require("express"),
    compress = require("compression"),
    app = express();

// Gzip static files
app.use(compress());
// Static file-handling
app.use(express.static(__dirname + '/public'));

app.get('/about', function(req, res) {
    res.json({ "about": "Welcome." });
});

app.get('/projects', function(req, res) {
    var projects = [
        { title: "Nassim Taleb Visualization", desc: "Inequality visualization", screenshot_src: "./assets/images/blackswan.png" },
        { title: "Comb", desc: "Converting unsearchable PDFs to searchable ones using OCR. Built with Django, ImageMagick.", screenshot_src: "./assets/images/comb.png" }
    ];
    res.json({ projects: projects });
});

app.get('/resume', function(req, res) {
    res.json({resume: "My resume."});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
