const express = require("express");
const app = express();
const product = require("./api/product");
const path = require('path');

app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.get('/*', function(req, res) {
    var url = req.url.toString();
    console.log(url);

    if (url == "/") {
        url = "/index.html";
    }
    
    if (url.endsWith(".html") || url.endsWith(".css") || url.endsWith(".js")) {
        console.log('views' + url);
        res.sendFile(path.join(__dirname, 'views' + url));
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
