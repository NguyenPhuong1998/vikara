const express = require("express");
const app = express();
const product = require("./api/product");
const path = require('path');

app.use(express.json({ extended: false }));

app.use("/api/product", product);

// app.use("/", express.static("webapp"))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'webapp/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
