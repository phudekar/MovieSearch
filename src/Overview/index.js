import React from "react";
import {useMovieDetailsApi} from "../hooks/movies";
import Loader from "../components/Loader";

const MovieOverview = (props) => {
    const [{loading, movieDetails, error}, updateMovieId] = useMovieDetailsApi(props.movieId)
    if (loading) {
        return <Loader/>
    }
    if (movieDetails) {
        return <div>
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.tagline}</h3>
            <h5>{movieDetails.overview}</h5>
            <img src={movieDetails.posterUrl}/>
            <Genres items={movieDetails.genres}/>
            {/*<ul>
                {movieDetails.genres.map((name, i) => <h4 key={i}>{name}</h4>)}
            </ul>*/}
        </div>
    }
    if (error) {
        console.log(error.message)
    }
    return <div>
        <h2>Error</h2>
    </div>
}

const Genres = (props) => {
    return <ul>{props.items.map((name, i) => <li key={i}>{name}</li>)}</ul>
}

export default MovieOverview