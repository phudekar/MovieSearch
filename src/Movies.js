import React, {useState} from "react";

import './App.css';
import {useMovieSearchApi, useMovieState} from "./movies_hook";

function Home() {
    const [query, setQuery] = useState("Avengers")
    const [movieState, fetchFromQuery] = useMovieSearchApi(query)
    return <div>
        <input
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value)
            }}
        />
        <button onClick={() => {
            fetchFromQuery(query)
        }}>Search
        </button>
        <Movies movieState={movieState}/>
    </div>
}

function Movies(props) {

    let movieState = props.movieState;

    if (movieState.loading) {
        return <h1>Loading...</h1>
    }

    if (movieState.error) {
        return <h1>{movieState.error}</h1>
    }


    return <div className="Grid-Container">
        {
            movieState.movies.map(mov => <MovieItem item={mov}/>)
        }
    </div>
}

const MovieItem = (props) => {
    const movieItem = props.item
    return <div key={movieItem.title}>
        <img src={movieItem.imageUrl}/>
        <h3>{movieItem.title}</h3>
        <p>{movieItem.description}</p>
    </div>;
}

export default Home;