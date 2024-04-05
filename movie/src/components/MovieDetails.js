import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import noImage from '../assets/noImage.jpeg';

function MovieDetails () {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState(null);
    const detailKeys = [
        { key: 'Released', label: 'Released' },
        { key: 'Runtime', label: 'Runtime' },
        { key: 'Genre', label: 'Genre' },
        { key: 'Director', label: 'Director' },
        { key: 'Actors', label: 'Actors' },
        { key: 'Writer', label: 'Writer' },
        { key: 'Language', label: 'Language' },
        { key: 'Country', label: 'Country' },
        { key: 'Awards', label: 'Awards' },
        { key: 'Plot', label: 'Plot' },
    ];

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
        !movieDetails ? <div>Loading...</div> :
        <div className='movie-detail'>
            <div className="movie-poster">
                <img src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : noImage} alt="No Poster" />
            </div>
            <div className="movie-info">
                <h3>{movieDetails.Title}</h3>
                {movieDetails.Ratings && movieDetails.Ratings.map((rating, index) => (
                    <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
                ))}
                {detailKeys.map(({key, label}) => ( 
                    movieDetails[key]?
                    <p key={key}>
                        <strong>{label}:</strong> {movieDetails[key]}
                    </p> : null
                ))}
                <button className='back-button' onClick={() => navigate(-1)}>Back</button>
            </div>
            
        </div>
    )
}

export default MovieDetails
