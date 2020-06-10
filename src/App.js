import React from 'react';
import './App.css';
import Home from './pages/Home';
import MovieOverview from "./Overview";

function App() {
    return (
        <div className="App">
            <MovieOverview movieId={299534}/>
        </div>
    );
}

export default App;
