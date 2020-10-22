const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(
  "mongodb+srv://Marwa:82821504Aa@mycluster.wtmi6.mongodb.net/moviesdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function () {
    console.log("Connected to moviesdb");
  }
);

const moviesSchema = mongoose.Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
    min: 1000,
    max: 9999,
  },
  rating: {
    type: Number,
    default: 4,
  },
});

const Movie = mongoose.model("Movie", moviesSchema);

app.post("/movies/create", async function (req, res) {
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
    movie = new Movie({
      title: req.query.title,
      year: req.query.year,
      rating: 4,
    });
    const addedmovie = await movie.save();
    res.status(200).send(addedmovie);
  } else {
    movie = new Movie({
      title: req.query.title,
      year: req.query.year,
      rating: req.query.rating,
    });
    const addedmovie = await movie.save();
    res.status(200).send(addedmovie);
  }
});

app.get("/movies/read", async function (req, res) {
  const allmovies = await Movie.find();
  res.status(200).send(allmovies);
});

app.delete("/movies/delete/:id", async function (req, res) {
  const deletedmovie = await Movie.remove({ _id: req.params.id });
  res.status(200).send(deletedmovie);
});

app.put("/movies/update/:id", async function (req, res) {
  const updatedmovie = await Movie.updateOne(
    { _id: req.params.id },
    {
      $set: {
        title: req.query.title,
        year: req.query.year,
        rating: req.query.rating,
      },
    }
  );
  res.status(200).send(updatedmovie);
});
