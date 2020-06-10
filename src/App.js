import React from 'react';
import './App.css';
import Home from './pages/Home';
import ThemeProvider from './theme';

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <Home />
            </div>
        </ThemeProvider>

    );
}

export default App;
