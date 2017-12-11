var express = require("express");

var app = express();
app.engine(".ejs",require("ejs").__express);

app.set("views",__dirname+"/views");
app.set("view engine",'ejs');

app.get("/Hello",function(req,res){
    res.send("Hello World");
});

app.get("/",function(req,res){
    res.render("index",{title:"Node"});
});

var server = app.listen(3000,function(){
    console.log("server run in port:3000");
});