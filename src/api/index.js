import config from '../config';

// const popularMovieUrl = movieBaseUrl + "movie/popular?api_key=" + api_key + "&language=en-US&page=1"

function buildQueryUrl(query) {
    return `${config.movieBaseUrl}search/movie?api_key=${config.api_key}&language=en-US&query=${query}&page=1&include_adult=false`
}


class MovieDetails {
    constructor(id, title, description, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = config.imageBaseUrl + imageUrl;
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
