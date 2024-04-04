import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function App() {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    if(location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      handleSearch(location.state.searchQuery);
    }
    console.log(location.state)
  },[location.state?.searchQuery]);

  const handleSearch = async (movieTitle) => {
    const apiKey = '7cb4fd5b';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

    try {
      // console.log(url);
      const {data} = await axios.get(url);
      setMovies(data.Search);
    } catch (e) {
      console.log("Encounter error when fetching data", e)
    }
  }

  return (

    <div className="App">
      <div className="background">
        <div className="content-container">
          <h1 className='header'>Movie Search</h1>
          <SearchBar onSearch={handleSearch}/>
          <MovieList movies={movies} />
          {hasMore && <button onClick={() => handleSearch(searchQuery)}>Load More</button>}
        </div>
      </div> 
    </div>
    
  );
}

export default App;
