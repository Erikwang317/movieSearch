import React, { useState } from 'react'


function SearchBar( {onSearch} ) {

    const [query, setQuery] = useState('');

    const handleChange = ( event ) => {
        setQuery(event.target.value);
    }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        onSearch(query);
    }

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                className='search-input'
                type = 'text'
                placeholder = 'Please enter the moive name'
                onChange = {handleChange}
            />
            <button className='search-button' type="submit">
                Search
            </button>
        </form>
    );

}

export default SearchBar;