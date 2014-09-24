var express = require("express"),
    compress = require("compression"),
    app = express();

// Gzip static files
app.use(compress());
// Static file-handling
app.use(express.static(__dirname + '/public'));

app.get('/api/about', function(req, res) {
    res.json({ "about": "Welcome." });
});

app.get('/api/projects', function(req, res) {
    var projects = [
        { type: "web", title: "Nassim Taleb Visualization", link: "http://blackswan.bpourkazemi.com", desc: "Inequality visualization inspired by \"The Black Swan\". Built with D3.js!", screenshot_src: "./assets/images/blackswan.png" },
        { type: "web", title: "Comb", link: null, desc: "Created a webapp to convert unsearchable PDFs to searchable ones using OCR. Built with Django, ImageMagick, and PyTesser. HackUVA Center for Open Science award.", screenshot_src: "./assets/images/comb.png" },
        { type: "mobile", title: "Rapback (in progress)", link: null, desc: "A social network for making funny rap videos with your friends. On Android and iOS, with a Django backend. Fall '14 release date.", screenshot_src: "./assets/images/Rapback.png" }
    ];
    res.json({ projects: projects });
});

app.get('/api/resume', function(req, res) {
    res.json({
        resume: { resume_src: "assets/Resume.pdf" }
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
