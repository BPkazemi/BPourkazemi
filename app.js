var express = require("express"),
    app = express();

app.get("/", function(req, res) {
    res.send("Hello, world!");
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Express listening on port " + port);
});
