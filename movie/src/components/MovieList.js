
import MovieItem from "./MovieItem";

function MovieList ({movies}) {
    return (
        movies?  
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieItem key={movie.imdbID} movie={movie}/>
            ))}
        </div> :
        <div>No movies found</div> 
    );
}

export default MovieList;