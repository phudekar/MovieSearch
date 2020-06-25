import React from 'react';
import './Loader.css'
import loader from './loader.png'

const Loader = () => (
    <div className="loader">
        <img className="loader-item"
             src={loader} alt="loading..."/>
    </div>
)

export default Loader;