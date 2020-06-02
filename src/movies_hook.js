import {useEffect, useState} from "react";

const api_key = "ef48c3495c55a3bc5d6e7e1851f90f9b"
const movieBaseUrl = "https://api.themoviedb.org/3/"
const popularMovieUrl = movieBaseUrl + "movie/popular?api_key=" + api_key + "&language=en-US&page=1"
const imageBaseUrl = "https://image.tmdb.org/t/p/w500/"

function buildQueryUrl(query) {
    return movieBaseUrl + "search/movie?api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
}

export function useMovieState(refreshTime) {

    const [movieState, setMovieState] = useState(new MovieStates(false, null, []))

    console.log("Movies " + refreshTime)

    useEffect(() => {
        console.log("Loading..")
        setMovieState(new MovieStates(true, null, []))
        fetch(popularMovieUrl)
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

export function useMovieSearchApi(initialValue) {

    const [movieState, setMovieState] = useState(new MovieStates(false, null, []))
    const [query, setQuery] = useState(initialValue)

    useEffect(() => {
        let didCancel = false
        console.log("Loading..")
        setMovieState(new MovieStates(true, null, []))
        try {
            fetch(buildQueryUrl(query))
                .then(res => res.json())
                .then(
                    result => {
                        if (!didCancel) {
                            setTimeout(() => {
                                console.log("Fetch Done")
                                let movieDetails = result.results.map(it => new MovieDetails(it["original_title"], it["overview"], it["poster_path"]));
                                setMovieState(new MovieStates(false, null, movieDetails))
                            }, 2000)
                        }
                    },
                    error => {
                        if (error) {
                            setMovieState(new MovieStates(false, error.message, []))
                        }
                    }
                )
        } catch (error) {
            setMovieState(new MovieStates(false, error.message, []))
        }
        return () => {
            didCancel = true
        }
    }, [query])
    return [movieState, setQuery]
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