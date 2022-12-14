const PORT = 3000;

var http = require('http');
var express = require('express');

var app = express();
var server = http.Server(app);

server.listen(PORT);
console.log("Server nodejs dang chay")

//Cài đặt webapp các fie dữ liệu tĩnh
app.use(express.static("webapp"))
