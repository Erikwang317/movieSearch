import React from 'react';
import { useNavigate } from 'react-router-dom';
import noImage from '../assets/noImage.jpeg';

function MovieItem ({movie, searchQuery}) {
    let navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`movie/${movie.imdbID}`, {state: {searchQuery}});
    }

    return (
        movie.Poster === "N/A"? 
        <div className='movie-item' 
            style={{backgroundImage: `url(${noImage})`}}
            onClick={handleMovieClick}
        >
            <h3>{movie.Title}</h3>
            <h4>{movie.Year}</h4>
        </div> :
        <div className='movie-item' 
            style={{backgroundImage: `url(${movie.Poster})`}}
            onClick={handleMovieClick}
        >
        </div>

    );
}

export default MovieItem;