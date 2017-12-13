var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

// 連接MySql
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodeTest"
});
db.connect(function (err) {
    if (err) {
        console.log("database connect error");
        return;
    }
    console.log("database connect success");
})
var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.get("/", function (req, res) {
    res.render("form");
});
app.post("/submit", function (req, res) {
    var data = req.body.data;
    db.query("insert into record(r_data) values('" + data + "')", function (err) {
        res.redirect("/list");
        if (err) {
            console.log("insert query Error!");
            return;
        }
    });
});

app.get("/list", function (res, req) {
    db.query('select * from record', function (err, row) {
        if (err) {
            console.log("select query Error!");
            return;
        }
        req.render("list", {
            data: row
        });
    });
});
var server = app.listen(3000, function () {
    console.log("server run in port 3000");
})