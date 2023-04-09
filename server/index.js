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
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS mydb", function (err, result) {
    // will drop the database if it exists, removes all previous data
    // only for testing purposes, will be removed in production
    if (err) throw err;
  });

  con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) throw err;
  });

  // use the database before creating any new tables
  con.query("USE mydb", function (err, result) {
    if (err) throw err;
  });

  var createMovieTable = `CREATE TABLE movies 
    ( id INT AUTO_INCREMENT PRIMARY KEY,
      imdbId VARCHAR(100),
      movieName VARCHAR(100), 
      movieLikes INT, 
      movieDislikes INT)`; // todo add more columns

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

app.use(cors());
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the movie posters api");
});

app.get("/api/search", (req, res) => {
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
      axios.get(url).then((response) => {
        res.send(response.data);
      });
  }
});

function asyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next);
  };
}

app.post(
  "/api/like",
  asyncWrapper(async (req, res) => {
    console.log(req.body); // add this line to check the value of req.body
    const imdbId = "12345";
    const movieName = "test";
    const movieLikes = 1;
    const movieDislikes = 0;

    if (!imdbId) {
      console.log("imdbId is missing from req.body"); // add this line to check if imdbId is missing
      return res.status(400).json({ error: "Missing imdbId field" });
    }

    const addToLikes = `INSERT INTO movies (
    imdbId, movieName, movieLikes, movieDislikes) VALUES (?, ?, ?, ?)`;

    con.query(
      addToLikes,
      [imdbId, movieName, movieLikes, movieDislikes],
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("1 record inserted");
        res.status(200).json({ success: "Record inserted successfully" });
      }
    );
  })
);
