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
    if (err) throw err;
  });
  con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) throw err;
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

app.get("/api/title", (req, res) => {});
