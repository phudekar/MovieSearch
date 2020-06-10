import React from 'react'
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = (delay) => ({
    transition: `opacity ${duration}ms ease-in-out ${delay}ms`,
    opacity: 0,
})

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
};

export const MovieItem = (props) => {
    const { movie, delay } = props;
    const {title, description, imageUrl} = movie || {};
    return (
        <Transition in={true} timeout={{ appear: 500, enter: 300, exit: 200 }} appear={true} exit={false} enter={false}>
            {state => {
                return <div className="movie"
                    title="movie"
                    style={{
                        ...defaultStyle(delay),
                        ...transitionStyles[state]
                    }}>
                    <img alt={title} src={imageUrl} />
                    <div className="content">
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            }
            }
        </Transition>
    )
}

MovieItem.propTypes = {
    movie: PropTypes.objectOf({
        title: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.number,
        imageUrl: PropTypes.string
    })
}

export default MovieItem;