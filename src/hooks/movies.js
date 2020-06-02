import { useState, useEffect } from 'react';
import { fetchMovies } from '../api';

export function useMovieSearchApi() {
    const [movieState, setMovieState] = useState([]);
    const [query, setQuery] = useState(null);

    const handleError = (error) => {
        setMovieState({ loading: false, movies: [], error: error.message });
    };

    const searchMovies = (searchText) => setQuery(searchText);

    useEffect(() => {
        if (query) {
            setMovieState({ loading: true, movies: [] });
            fetchMovies(query)
                .then(movies => {
                    setMovieState({ loading: false, movies });
                }, handleError);
        }
    }, [query]);

    return [movieState, searchMovies];
}