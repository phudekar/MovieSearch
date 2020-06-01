import React, {useState} from "react";
import './App.css';
import {useMovieState} from "./movies_hook";

function Home() {
    const [refreshTimeStamp, setRefreshTimeStamp] = useState(0)
    console.log("Home " + refreshTimeStamp)
    return <div>
        <button onClick={() => {
            const date = new Date()
            setRefreshTimeStamp(date.getMilliseconds())
        }}>Refresh
        </button>
        <Movies refreshTime={refreshTimeStamp}/>
    </div>
}

function Movies(props) {

    const movieState = useMovieState(props.refreshTime)

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