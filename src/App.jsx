import React from 'react';
  // Import the SolarSystem component
import APOD from './components/APOD';
function App() {
  return (
    <div>
      {/* Place the heading outside of the Canvas */}
      <h1>Space Exploration Dashboard</h1>
      {/* Render the SolarSystem component */}
      {/* <SolarSystem /> */}
      <APOD />
    </div>
  );
};

export default App;
