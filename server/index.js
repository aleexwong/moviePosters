const express = require("express");
const cors = require("cors");

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
    case "":
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
