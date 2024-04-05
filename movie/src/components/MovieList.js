
import React, { useEffect } from "react";
import MovieItem from "./MovieItem";

function MovieList ({movies}) {

    // useEffect(() => {
    //     console.log(movies);
    // }, [])

    // if (!movies || movies.length === 0) {
    //     return <div>No movies found</div>
    // }

    // console.log(movies);
    return (
        movies.length !== 0 ?
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie}/>
            ))}
        </div> :
        <div>No movies found</div>
    );
}

export default MovieList;