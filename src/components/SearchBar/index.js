import React from 'react';

const SearchBar = (props) => {
    let queryValue = props.defaultValue ? props.defaultValue : "";
    console.log(queryValue)
    return <input
        className={props.isCenter ? 'search-input-center' : 'search-input'}
        type="text"
        onSubmit={(e) => {
            console.log(e.target)
        }}
        placeholder="Search movies"
        onChange={(e) => {
            queryValue = e.target.value
            if (props.onSearch) {
                props.onSearch(e.target.value)
            }
        }}
        onKeyPress={event => {
            if (event.key === 'Enter') {
                if (props.onSubmit) {
                    props.onSubmit(queryValue)
                }
            }
        }}
    />
}

export default SearchBar;