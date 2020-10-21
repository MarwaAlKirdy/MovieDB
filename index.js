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

app.get("/", function (req, res) {
  res.send("ok");
});

app.get("/test", function (req, res) {
  res.status(200).send("{message: ok}");
});

app.get("/time", function (req, res) {
  res.status(200).send("{message: " + time + "}");
});

app.get("/hello", function (req, res) {
  res.status(200).send("Hello!");
});
app.get("/hello/:id", function (req, res) {
  res.status(200).send("Hello, " + req.params.id);
});

app.get("/search", function (req, res) {
  if (req.query.s == "" || typeof req.query.s === "undefined") {
    res.status(500).send("{error: true message: you have to provide a search}");
  } else {
    res.status(200).send("{message: ok data: " + req.query.s + "}");
  }
});
