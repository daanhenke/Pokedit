//NodeJS modules
let path = require('path');
let express = require("express");
let rollup = require("rollup");
let rollupBabel = require("rollup-plugin-babel");

//Server creation
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

//Loading settings
let settings = require('./settings');

//Set up some routing
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "html"));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/tools/tilegen", function (req, res) {
    res.render("tilegen");
});

app.get("/javascript.js", function (req, res) {
    rollup.rollup({
        input: path.join(__dirname, "public", "js", "main.js"),
        plugins: [
            rollupBabel({
                presets: [["env", {
                    modules: false
                }]],
                plugins: ["external-helpers"]
            })
        ]
    }).then(function (bundle) {
        bundle.generate({
            format: "iife"
        }).then(function (result) {
            res.end(result.code);
        })
    });
});

//Socket.IO
io.on('connect', function (socket) {

});

//Starting server
server.listen(settings.webserver.port || 80, function () {
    console.log("Server started on http://localhost:" + settings.webserver.port);
});