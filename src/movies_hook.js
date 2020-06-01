import {useEffect, useState} from "react";

const movieUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ef48c3495c55a3bc5d6e7e1851f90f9b&language=en-US&page=1"
const imageBaseUrl = "https://image.tmdb.org/t/p/w500/"

export function useMovieState(refreshTime) {
    const [movieState, setMovieState] = useState(new MovieStates(false, null, []))

    console.log("Movies " + refreshTime)

    useEffect(() => {
        console.log("Loading..")
        setMovieState(new MovieStates(true, null, []))
        fetch(movieUrl)
            .then(res => res.json())
            .then(
                result => {
                    setTimeout(() => {
                        console.log("Fetch Done")
                        let movieDetails = result.results.map(it => new MovieDetails(it["original_title"], it["overview"], it["poster_path"]));
                        setMovieState(new MovieStates(false, null, movieDetails))
                    }, 2000)
                },
                error => {
                    if (error) {
                        setMovieState(new MovieStates(false, error.message, []))
                    }
                }
            )

    }, [refreshTime])
    return movieState
}

function MovieStates(loading, error, movies) {
    this.loading = loading
    this.error = error
    this.movies = movies
}

function MovieDetails(title, description, imageUrl) {
    this.title = title
    this.description = description
    this.imageUrl = imageBaseUrl + imageUrl
}