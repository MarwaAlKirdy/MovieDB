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

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];
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

app.get("/movies/create", function (req, res) {});

app.get("/movies/read", function (req, res) {
  res.status(200).send(movies);
});

app.get("/movies/update", function (req, res) {});

app.get("/movies/delete", function (req, res) {});

app.get("/movies/read/by-date", function (req, res) {
  movies.sort(function (a, b) {
    return a.year - b.year;
  });
  res.status(200).send(movies);
});

app.get("/movies/read/by-date", function (req, res) {
  movies.sort(function (a, b) {
    return a.year - b.year;
  });
  res.status(200).send(movies);
});

app.get("/movies/read/by-rating", function (req, res) {
  movies.sort(function (a, b) {
    return b.rating - a.rating;
  });
  res.status(200).send(movies);
});

app.get("/movies/read/by-title", function (req, res) {
  movies.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  res.status(200).send(movies);
});
