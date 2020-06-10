import React from "react";
import { useMovieDetailsApi } from "../hooks/movies";
import Loader from "../components/Loader";

const MovieOverview = ({match}) => {
    const [{loading, movieDetails, error}, updateMovieId] = useMovieDetailsApi(match.params.movieId)
    if (loading) {
        return <Loader />
    }
    if (movieDetails) {
        return <div>
            <h1>{movieDetails.title}</h1>
            <h3>{movieDetails.tagline}</h3>
            <h5>{movieDetails.overview}</h5>
            <img src={movieDetails.posterUrl}/>
            <Genres items={movieDetails.genres}/>
        </div>
    }
    if (error) {
        console.log(error.message)
    }
    return <div>
        <h2>Error</h2>
    </div>
}

export default MovieOverview