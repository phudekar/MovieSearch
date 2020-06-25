import config from '../config';

// const popularMovieUrl = movieBaseUrl + "movie/popular?api_key=" + api_key + "&language=en-US&page=1"

function buildMovieDetailsUrl(movieId) {
    return `${config.movieBaseUrl}movie/${movieId}?api_key=${api_key}&language=en-US&page=1&include_adult=false`
}

function buildQueryUrl(query) {
    return `${config.movieBaseUrl}search/movie?api_key=${config.api_key}&language=en-US&query=${query}&page=1&include_adult=false`
}


class MoviesUI {
    constructor(id, title, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = config.imageBaseUrl + imageUrl;
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
