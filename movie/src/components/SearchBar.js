import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function SearchBar() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = ( event ) => {
        event.preventDefault();
        // onSearch(query);
        navigate(`/?search=${encodeURIComponent(query)}`);
    
    }

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                className='search-input'
                type = 'text'
                placeholder = 'Enter movie title...'
                onChange = {(event => setQuery(event.target.value))}
            />
            <button className='search-button' type="submit">
                Search
            </button>
        </form>
    );

}

export default SearchBar;