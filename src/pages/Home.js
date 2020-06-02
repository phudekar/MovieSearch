import React from "react";
import Movies from '../components/Movies';
import { useMovieSearchApi } from "../hooks/movies";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {
    const [{ loading, movies, error }, searchMovies] = useMovieSearchApi()
    return <div className="container">
        <SearchBar onSearch={query => searchMovies(query)} />

        {loading && <Loader />}

        {error && <div className="error">{error}</div>}

        {!loading && !error && <Movies {...{ movies }} />}
    </div>
}

export default Home;