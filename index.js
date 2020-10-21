const express = require("express");
const app = express();
const port = 3000;
var today = new Date();
var hours = today.getHours();
var minutes = today.getMinutes();
if (minutes < 10) {
    minutes = "0" + minutes;
}
var time = hours + ":" + minutes;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.send("ok");
});

app.get("/test", function (req, res) {
    res.send({
        status: 200,
        message: "ok"
    });
});

app.get("/time", function (req, res) {

    res.send("{status: 200, message: " + time + "}");
});