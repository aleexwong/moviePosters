import React, {useState, useEffect} from "react";

function MoviePosterCard(props) {
    const [movie, setMovie] = useState("");

    const fetchMovie = () => {
        fetch("https://www.omdbapi.com/?t=batman&apikey=a35d47f2")
        .then((res) => res.json())
        .then((data) => {
            setMovie(data);
        });
    }

    useEffect(() => {
        fetchMovie();
    }, []);


    return (
        <div className="movie-poster-card">
            <h1>Movie Poster Card</h1>
            <h2>{movie.Title}</h2>
            <h2>{movie.Year}</h2>
            <img src={movie.Poster} alt="movie poster" />
        </div>
    );
}

export default MoviePosterCard;