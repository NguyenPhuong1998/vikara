const express = require("express");
const app = express();
const product = require("./api/product");
const path = require('path');
var fs = require('fs');

app.use(express.json({ extended: false }));

app.use("/api/product", product);

app.get('/*', function(req, res) {
    var url = req.url.toString();

    if (url == "/") {
        url = "/index.html";
    }
    
    if (url.endsWith(".html") || url.endsWith(".css") || url.endsWith(".js")) {
        var pathFile = path.join(__dirname, 'views' + url)
        // console.log(fs.readdirSync(path.join(__dirname, 'views')))
        if (fs.existsSync(pathFile)) {
            res.sendFile(pathFile);
        }
        else {
            res.writeHead(404);
            res.write("Not found");
        }
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
