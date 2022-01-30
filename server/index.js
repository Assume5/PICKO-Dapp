const express = require("express");
const bodyParser = require("body-parser"); //https://www.npmjs.com/package/body-parser
const escapeHtml = require("escape-html"); //https://www.npmjs.com/package/escape-html
const cors = require("cors"); //https://www.npmjs.com/package/cors

const PORT = 4000;
const HOST = "0.0.0.0";

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send("PICKO-Dapp Serve");
});

app.get("/test", (req, res) => {
    res.json("Success get /test");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
