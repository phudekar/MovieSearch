const api_key = "ef48c3495c55a3bc5d6e7e1851f90f9b"
const movieId = 299534
const movieDetails = "https://api.themoviedb.org/3/movie/299534?api_key=ef48c3495c55a3bc5d6e7e1851f90f9b&language=en-US"
const movieBaseUrl = "https://api.themoviedb.org/3/"
const imageBaseUrl = "https://image.tmdb.org/t/p/w400/"

// const popularMovieUrl = movieBaseUrl + "movie/popular?api_key=" + api_key + "&language=en-US&page=1"

function buildMovieDetailsUrl(movieId) {
    return movieBaseUrl + "movie/" + movieId + "?api_key=" + api_key + "&language=en-US&page=1&include_adult=false"
}

function buildQueryUrl(query) {
    return movieBaseUrl + "search/movie?api_key=" + api_key + "&language=en-US&query=" + query + "&page=1&include_adult=false"
}


class MoviesUI {
    constructor(id, title, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageBaseUrl + imageUrl;
    }
}

class MoviesDetailsUI {
    constructor(id, title, description, tagline, imageUrl, genres) {
        this.id = id;
        this.title = title;
        this.overview = description;
        this.tagline = tagline;
        this.posterUrl = imageBaseUrl + imageUrl;
        this.genres = genres.map(result => result.name)
    }
}

const mapResultToMovie = (result) => {
    const {id, original_title, overview, poster_path} = result;
    return new MoviesUI(id, original_title, overview, poster_path);
};

const mapResultToMovieDetails = (result) => {
    const {id, original_title, overview, poster_path, tagline, genres} = result;
    return new MoviesDetailsUI(id, original_title, overview, tagline, poster_path, genres);
};

export const fetchMovies = (query) =>
    fetch(buildQueryUrl(query))
        .then(res => res.json())
        .then(result => result.results.map(mapResultToMovie));

export const fetchDetails = (movieId) =>
    fetch(buildMovieDetailsUrl(movieId))
        .then(res => res.json())
        .then(mapResultToMovieDetails);
