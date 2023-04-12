const express = require("express");
const cors = require("cors");
var mysql = require("mysql");
// may be better to replace with mysql2,
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "secret",
  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("DROP DATABASE IF EXISTS mydb", function (err, result) {
    // will drop the database if it exists, removes all previous data
    // only for testing purposes, will be removed in production
    console.log("Database dropped successfully");
    if (err) throw err;
  });

  con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created successfully");
  });

  // use the database before creating any new tables
  con.query("USE mydb", function (err, result) {
    console.log("Using mydb database");
    if (err) throw err;
  });

  var createMovieTable = `CREATE TABLE movies 
    ( id INT AUTO_INCREMENT PRIMARY KEY,
      imdbId VARCHAR(100),
      movieName VARCHAR(100), 
      movieLikes INT DEFAULT 0, 
      movieDislikes INT DEFAULT 0)`; // todo add more columns

  con.query(createMovieTable, function (err, result) {
    if (err) throw err;
    console.log("Table created successfully");
  });
});

// dotenv file needed
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;
const apiKey = process.env.API_KEY;
const axios = require("axios");

var api = "https://www.omdbapi.com/";
const app = express();

app.use(express.json());
// no need for body-parser, express.json() is enough

app.use(cors());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the movie posters api");
});

app.get("/api/search", async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const page = req.query.page;
  const url = `${api}?s=${searchQuery}&page=${page}&apikey=${apiKey}`;
  switch (searchQuery) {
    case "": // if search bar is empty, return nothing to the user
      break;
    case undefined:
      res.send([]);
      break;
    case null:
      res.send([]);
      break;
    default:
      await axios.get(url).then((response) => {
        res.send(response.data);
      });
  }
});

app.post("/api/like", async (req, res) => {
  console.log(req.body); // add this line to check the value of req.body
  const { imdbId, movieName } = req.body;
  const checkIfMovieExists = `SELECT * FROM movies WHERE imdbId = '${imdbId}'`;

  if (!imdbId) {
    console.log("imdbId is missing from req.body"); // add this line to check if imdbId is missing
    return res.status(400).json({ error: "Missing imdbId field" });
  }

  con.query(checkIfMovieExists, function (err, result) {
    try {
      if (result.length === 0) {
        console.log("Movie does not exist in database");
        const addToLikes = `INSERT INTO movies (imdbId, movieName, movieLikes, movieDislikes) VALUES ('${imdbId}', '${movieName}', 1, 0)`;
        try {
          con.query(addToLikes, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            return res
              .status(200)
              .json({ success: "Record inserted successfully" });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      } else {
        const currentLikes = result[0].movieLikes;
        const updateLikes = `UPDATE movies SET movieLikes = ${
          currentLikes + 1
        } WHERE imdbId = '${imdbId}'`;
        try {
          con.query(updateLikes, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
            console.log(currentLikes);
            return res
              .status(200)
              .json({ success: "Record updated successfully" });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

app.post("/api/dislike", async (req, res) => {
  const { imdbId, movieName } = req.body;
  const checkIfMovieExists = `SELECT * FROM movies WHERE imdbId = '${imdbId}'`;

  if (!imdbId) {
    console.log("imdbId is missing from req.body");
    return res.status(400).json({ error: "Missing imdbId field" });
  }

  con.query(checkIfMovieExists, function (err, result) {
    try {
      if (result.length === 0) {
        console.log("Movie does not exist in database");
        const addToDisLikes = `INSERT INTO movies (imdbId, movieName, movieLikes, movieDislikes) VALUES ('${imdbId}', '${movieName}', 0, 1)`;
        try {
          con.query(addToDisLikes, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            return res
              .status(200)
              .json({ success: "Record inserted successfully" });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      } else {
        const currentDislikes = result[0].movieDislikes;
        const updateDislikes = `UPDATE movies SET movieDislikes = ${
          currentDislikes + 1
        } WHERE imdbId = '${imdbId}'`;
        try {
          con.query(updateDislikes, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
            console.log(currentDislikes);
            return res
              .status(200)
              .json({ success: "Record updated successfully" });
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
});
