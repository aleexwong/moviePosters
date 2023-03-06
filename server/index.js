const express = require("express");


const PORT = process.env.PORT || 3001;

var api = 'https://www.omdbapi.com/'
const app = express();
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

app.get("/", (req, res) => {
    res.send("Welcome to the movie posters api");
  }
);

app.get("/api", (req, res) => {
    res.json({ message: "Hello World" });
  });

app.get("/api/title", (req, res) => {
  

});





