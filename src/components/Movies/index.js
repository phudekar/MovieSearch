import React from 'react';

const Movies = ({ movies = [] }) => (
    <div className="movie-container">
        {movies.map(movie => <MovieItem key={movie.id} {...movie} />)}
    </div>
)

export const MovieItem = ({ title, imageUrl, description }) => (
    <div className="movie">
        <img alt={title} src={imageUrl} />
        <div className="content">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
)

export default Movies;
