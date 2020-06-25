import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    const [query, setQuery] = useState(props.defaultValue ? props.defaultValue : "")
    return <input
        className={props.isCenter ? 'search-input-center' : 'search-input'}
        type="text"
        value={query}
        placeholder="Search movies"
        onChange={(e) => {
            setQuery(e.target.value)
            if (props.onSearch) {
                props.onSearch(query)
            }
        }}
        onKeyPress={event => {
            if (event.key === 'Enter') {
                if (props.onSubmit) {
                    props.onSubmit(query)
                }
            }
        }}
    />
}

export default SearchBar;