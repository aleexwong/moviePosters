import React, { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import MoviePosterCard from "./components/moviePosterCard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MoviePosterCard />
    </div>
  );
}

export default App;
