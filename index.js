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

app.get("/movies/create", function (req, res) {
  if (
    req.query.title == "" ||
    typeof req.query.title === "undefined" ||
    req.query.year == "" ||
    typeof req.query.year === "undefined" ||
    req.query.year.toString().length != 4 ||
    isNaN(req.query.year)
  ) {
    res
      .status(403)
      .send("you cannot create a movie without providing a title and a year");
  } else if (
    req.query.rating == "" ||
    typeof req.query.rating === "undefined"
  ) {
    movie = { title: req.query.title, year: req.query.year, rating: 4 };
    movies.push(movie);
    res.send(movies);
  } else {
    movie = {
      title: req.query.title,
      year: req.query.year,
      rating: req.query.rating,
    };
    movies.push(movie);
    res.send(movies);
  }
});

app.get("/movies/read", function (req, res) {
  res.status(200).send(movies);
});

app.get("/movies/update/:id", function (req, res) {
  if (req.params.id <= 0 || req.params.id > movies.length) {
    res.status(404).send("the movie " + req.params.id + " does not exist");
  } else if (
    (req.query.title == "" && req.query.year == "") ||
    (typeof req.query.title === "undefined" &&
      typeof req.query.year === "undefined")
  ) {
    movies[req.params.id - 1] = {
      title: movies[req.params.id - 1].title,
      year: movies[req.params.id - 1].year,
      rating: req.query.rating,
    };
  } else if (
    (req.query.title == "" && req.query.rating == "") ||
    (typeof req.query.title === "undefined" &&
      typeof req.query.rating === "undefined")
  ) {
    movies[req.params.id - 1] = {
      title: movies[req.params.id - 1].title,
      year: req.query.year,
      rating: movies[req.params.id - 1].rating,
    };
  } else if (
    (req.query.year == "" && req.query.rating == "") ||
    (typeof req.query.year === "undefined" &&
      typeof req.query.rating === "undefined")
  ) {
    movies[req.params.id - 1] = {
      title: req.query.title,
      year: movies[req.params.id - 1].year,
      rating: movies[req.params.id - 1].rating,
    };
  } else if (req.query.title == "" || typeof req.query.title === "undefined") {
    movies[req.params.id - 1] = {
      title: movies[req.params.id - 1].title,
      year: req.query.year,
      rating: req.query.rating,
    };
  } else if (req.query.year == "" || typeof req.query.year === "undefined") {
    movies[req.params.id - 1] = {
      title: req.query.title,
      year: movies[req.params.id - 1].year,
      rating: req.query.rating,
    };
  } else if (
    req.query.rating == "" ||
    typeof req.query.rating === "undefined"
  ) {
    movies[req.params.id - 1] = {
      title: req.query.title,
      year: req.query.year,
      rating: movies[req.params.id - 1].rating,
    };
  } else {
    movies[req.params.id - 1].title = req.query.title;
    movies[req.params.id - 1].year = req.query.year;
    movies[req.params.id - 1].rating = req.query.rating;
  }
  res.status(200).send(movies);
});

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

app.get("/movies/read/id/:id", function (req, res) {
  if (req.params.id <= 0 || req.params.id > movies.length) {
    res.status(404).send("the movie " + req.params.id + " does not exist");
  } else {
    res.status(200).send(movies[req.params.id - 1]);
  }
});

app.get("/movies/delete/:id", function (req, res) {
  if (req.params.id <= 0 || req.params.id > movies.length) {
    res.status(404).send("the movie " + req.params.id + " does not exist");
  } else {
    movies.splice(req.params.id - 1, 1);
    res.status(200).send(movies);
  }
});
