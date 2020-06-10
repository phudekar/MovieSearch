import React from 'react';
import { MovieItem } from './MovieItem';

const Movies = ({ movies = [] }) => (
    <div className="movie-container">
        {movies.map((movie, i) => <MovieItem key={movie.id} movie={movie} delay={i * 20} />)}
    </div>
)

export default Movies;
