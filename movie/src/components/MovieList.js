
import React, { useEffect } from "react";
import MovieItem from "./MovieItem";

function MovieList ({movies, searchPerformed}) {

    if (movies.length > 0) {
        return (
            <div className="movie-grid">
                {movies.map((movie) => <MovieItem key={movie.imdbID} movie={movie}/>)}
            </div>
        );
    } else if (searchPerformed) {
        return (
            <div className="no-movies">
                <p>No movies found</p>
            </div>
        );
    } else {
        return null; 
    }
}

export default MovieList;