import React from "react";
import Movies from '../components/Movies';
import { useMovieSearchApi } from "../hooks/movies";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const [{ loading, movies, error }, searchMovies] = useMovieSearchApi()
    return <div className="container">
        <SearchBar onSearch={query => searchMovies(query)} />
        
        {loading && <h1>Loading...</h1>}

        {error && <h1>{error}</h1>}

        {!loading && !error && <Movies {...{ movies }} />}
    </div>
}

export default Home;