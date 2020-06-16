import React from 'react';
import './App.css';
import Home from './pages/Home';
import MovieOverview from "./Overview";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
    return <div>
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/movie/:movieId" exact component={MovieOverview}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Router>
    </div>
}

export const PageNotFound = () => {
    return <h1>404 Page not found</h1>
}

export default App;
