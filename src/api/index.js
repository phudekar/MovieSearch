const api_key = "ef48c3495c55a3bc5d6e7e1851f90f9b"
const movieBaseUrl = "https://api.themoviedb.org/3/"
const imageBaseUrl = "https://image.tmdb.org/t/p/w400/"

// const popularMovieUrl = movieBaseUrl + "movie/popular?api_key=" + api_key + "&language=en-US&page=1"

function buildQueryUrl(query) {
    return movieBaseUrl + "search/movie?api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
}


class MovieDetails {
    constructor(id, title, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageBaseUrl + imageUrl;
    }
}

const mapResultToMovie = (result) => {
    const { id, original_title, overview, poster_path } = result;
    return new MovieDetails(id, original_title, overview, poster_path);
};


export const fetchMovies = (query) =>
    fetch(buildQueryUrl(query))
        .then(res => res.json())
        .then(result => result.results.map(mapResultToMovie));
