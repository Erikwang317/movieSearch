import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import noImage from '../assets/noImage.jpeg';

function MovieDetails () {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const { searchQuery } = location.state || {};

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const apiKey = '7cb4fd5b';
            const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

            try {
                const {data} = await axios.get(url);
                setMovieDetails(data);
              } catch (e) {
                console.log("Encounter error when fetching data", e)
              }
        };
        fetchMovieDetails();
    },[movieId]);

    return (
        !movieDetails? <div>Loading ...</div> :
        <div className='movie-detail'>
            <div className="movie-poster">
                <img src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : noImage} alt="No Poster" />
            </div>
            <div className="movie-info">
                <h3>{movieDetails.Title}</h3>
                {movieDetails.Ratings && movieDetails.Ratings.map((rating, index) => (
                    <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
                ))}
                <p><strong>Released:</strong> {movieDetails.Released}</p>
                <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
                <p><strong>Genre:</strong> {movieDetails.Genre}</p>
                <p><strong>Director:</strong> {movieDetails.Director}</p>
                <p><strong>Actors:</strong> {movieDetails.Actors}</p>
                <p><strong>Writer:</strong> {movieDetails.Writer}</p>
                <p><strong>Language:</strong> {movieDetails.Language}</p>
                <p><strong>Country:</strong> {movieDetails.Country}</p>
                <p><strong>Awards:</strong> {movieDetails.Awards}</p>
                <p><strong>Plot:</strong> {movieDetails.Plot}</p>
                <button className='back-button' onClick={() => navigate('/', {state: {searchQuery}})}>Back</button>
            </div>
            
        </div>
    )

}

export default MovieDetails
