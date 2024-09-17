import React from 'react';
import APOD from './components/APOD';
import SolarSystem from './components/SolarSystem';
import  SpaceNews from './components/SpaceNews';
import SpaceWeather from './components/SpaceWeather';
import './index.css';


const App = () => {
    return (
        <div>
            <h1>Space Exploration</h1>
            {/* Render Componenets */}
            <APOD />
            <SolarSystem />
            <SpaceNews />
            <SpaceWeather />
        </div>
    );
};
export default App;
