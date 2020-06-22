import React from "react";
import './Home.css';
import Movies from '../components/Movies';
import {useMovieSearchApi} from "../hooks/movies";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import {useHistory} from "react-router-dom";

export const SearchResult = ({match}) => {
    const query = match.params.query;
    const [{loading, movies, error}, searchMovies] = useMovieSearchApi(query)
    return <div className="container">
        <SearchBar defaultValue={query} onSearch={query => searchMovies(query)}/>

        {loading && <Loader/>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && <Movies {...{movies}} />}
    </div>
}

export const Home = () => {
    const history = useHistory();
    return <div className="home-container">
        <SearchBar
            isCenter={true}
            onSubmit={(value) => {
                history.push(`/search/${value}`)
            }}/>
    </div>
}

export default Home;