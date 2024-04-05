import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


function App() {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    // console.log(searchParams)
    const searchQuery = searchParams.get('search');
    // console.log(searchParams.get('search'))
    if (searchQuery) {
      handleSearch(decodeURIComponent(searchQuery));
    }
  }, [searchParams]);

  const handleSearch = async (movieTitle, page = 1) => {
    setSearchPerformed(true);
    const apiKey = '7cb4fd5b';
    if (page === 1) {
      setCurrentPage(1); 
      // setMovies([]); 
    }
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieTitle)}&page=${page}`;
  
    try {
      const {data} = await axios.get(url);
      if (data.Response === "True") { 
        console.log(data.Search);
        setMovies(prevMovies => page === 1 ? [...data.Search] : [...prevMovies, ...data.Search]);
        setTotalResults(parseInt(data.totalResults, 10));
        setHasMore(movies.length < data.totalResults);
        console.log(movies);
        console.log(totalResults);
        console.log(hasMore);
      } else {
        setMovies([]);
        setHasMore(false);
      }
    } catch (e) {
      console.error("Encounter error when fetching data", e);
    }
  };

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    // console.log(currentPage);
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      handleSearch(decodeURIComponent(searchQuery), nextPage);
    }
  }

  return (

    <div className="App">
      <div className="background">
        <div className="content-container">
          <a href="/">
            <h1 className='header'>Movie Search</h1>
          </a>
          <SearchBar onSearch={handleSearch}/>
          <MovieList movies={movies} searchPerformed={searchPerformed}/>
          {hasMore && <button className='load-button' onClick={loadMoreMovies}>Load More</button>}
        </div>
      </div> 
    </div>
    
  );
}

export default App;
