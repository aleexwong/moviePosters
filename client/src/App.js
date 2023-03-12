import React, { useEffect, useState } from 'react';
import NavBar from './components/navBar';
import MoviePosterCard from './components/moviePosterCard';


function App() {
    const [movie, setMovie] = useState("");
    const [search, setSearch] = useState("");

    return (
        <div className="App">
            <NavBar />  
            <h1>Results</h1>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => console.log(search)}>Search</button>
            <br />
            <MoviePosterCard />
        </div>
    );

}

export default App;
