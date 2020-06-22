import React from 'react';
import {Transition} from 'react-transition-group';
import {useHistory} from "react-router-dom";

const duration = 500;

const defaultStyle = (delay) => ({
    transition: `opacity ${duration}ms ease-in-out ${delay}ms`,
    opacity: 0,
})

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exiting: {opacity: 1},
    exited: {opacity: 0},
};

const Movies = ({movies = []}) => (
    <div className="movie-container">
        {movies.map((movie, i) => <MovieItem key={movie.id} {...movie} delay={i * 20}/>)}
    </div>
)

export const MovieItem = ({id, title, imageUrl, description, delay}) => {
    const history = useHistory();
    return <Transition in={true} timeout={{appear: 500, enter: 300, exit: 200}} appear={true} exit={false}
                       enter={false}>
        {state => {
            return <div className="movie"
                        title="movie"
                        style={{
                            ...defaultStyle(delay),
                            ...transitionStyles[state]
                        }}
                        onClick={() => {
                            history.push(`/movie/${id}`)
                        }}
            >
                <img alt={title} src={imageUrl}/>
                <div className="content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        }
        }
    </Transition>
}

export default Movies;
