const PORT = 8080;

var express = require('express');
const test = require("./api/test");

var app = express();

app.use("/api/test", test);
app.use(express.json({ extended: false }));
app.use(express.static("webapp"))

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
