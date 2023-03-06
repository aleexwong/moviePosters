import React, {useEffect, useState} from 'react';
import MoviePosterCard from './components/moviePosterCard';
function App() {
    const [movie, setMovie] = useState("");

    return (
        <div className="App">
        <h1>Movies</h1>
        <MoviePosterCard />
        </div>
    );

}

export default App;
