var express = require("express"),
    compress = require("compression"),
    app = express();

// Gzip static files
app.use(compress());
// Static file-handling
app.use(express.static(__dirname + '/public'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
