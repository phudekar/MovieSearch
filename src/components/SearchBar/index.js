import React from 'react';

const SearchBar = ({ onSearch }) => (
    <input
        className="search-input"
        type="text"
        placeholder="Search movies"
        onChange={(e) => onSearch(e.target.value)}
    />
)

export default SearchBar;