const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

// authenticated user
const user = {
  username: "Marwa",
  password: "123456"
}
var users = [{
    username: "Marwa",
    password: "123456"
  },
  {
    username: "Maher",
    password: "456789"
  },
  {
    username: "Mohammad",
    password: "135790"
  }
];

app.post("/users/create", function (req, res) {
  if (
    req.query.username == "" ||
    typeof req.query.username === "undefined" ||
    req.query.password == "" ||
    typeof req.query.password === "undefined" ||
    req.query.password.length != 6
  ) {
    res
      .status(403)
      .send("you cannot create a user without providing a username and a password");
  } else {
    createduser = {
      username: req.query.username,
      password: req.query.password
    };
    users.push(createduser);
    res.send(users);
  }
});

//read users
app.get("/users/read", function (req, res) {
  res.status(200).send(users);
});

//update user
app.put("/users/update/:id", function (req, res) {
  if (req.params.id <= 0 || req.params.id > users.length) {
    res.status(404).send("the user " + req.params.id + " does not exist");
  } else if ((req.query.username == "" || typeof req.query.username === "undefined") && (req.query.password == "" || typeof req.query.password === "undefined")) {
    res.status(404).send("you must provide a new username or password");
  } else if (req.query.username == "" || typeof req.query.username === "undefined") {
    users[req.params.id - 1] = {
      username: users[req.params.id - 1].username,
      password: req.query.password,
    };
  } else if (req.query.password == "" || typeof req.query.password === "undefined") {
    users[req.params.id - 1] = {
      username: req.query.username,
      password: users[req.params.id - 1].password
    };
  } else {
    users[req.params.id - 1] = {
      username: req.query.username,
      password: req.query.password
    }
  }
  res.status(200).send(users);
});


//delete user
app.delete("/users/delete/:id", function (req, res) {
  if (req.params.id <= 0 || req.params.id > users.length) {
    res.status(404).send("the user " + req.params.id + " does not exist");
  } else {
    users.splice(req.params.id - 1, 1);
    res.status(200).send(users);
  }
});

const auth = (users, username, password) => {
  let auth = false
  users.forEach(user => {
    if (user.username == username && user.password == password) {
      auth = true;
      return
    }
  })
  return auth;
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(
  "mongodb+srv://Marwa:82821504Aa@mycluster.wtmi6.mongodb.net/moviesdb?retryWrites=true&w=majority", {
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
  if (auth(users, user.username, user.password)) {
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
  } else {
    res.status(402).send({
      message: "Access Denied!"
    });
  }
});

app.get("/movies/read", async function (req, res) {
  if (auth(users, user.username, user.password)) {
    const allmovies = await Movie.find();
    res.status(200).send(allmovies);
  } else {
    res.status(402).send({
      message: "Access Denied!"
    });
  }
});

app.delete("/movies/delete/:id", async function (req, res) {
  if (auth(users, user.username, user.password)) {
    const deletedmovie = await Movie.remove({
      _id: req.params.id
    });
    res.status(200).send(deletedmovie);
  } else {
    res.status(402).send({
      message: "Access Denied!"
    });
  }
});

app.put("/movies/update/:id", async function (req, res) {
  if (auth(users, user.username, user.password)) {
    const updatedmovie = await Movie.updateOne({
      _id: req.params.id
    }, {
      $set: {
        title: req.query.title,
        year: req.query.year,
        rating: req.query.rating,
      },
    });
    res.status(200).send(updatedmovie);
  } else {
    res.status(402).send({
      message: "Access Denied!"
    });
  }
});