import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpaceWeather = () => {
  const [spaceWeatherData, setSpaceWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpaceWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_NASA_API_KEY;  // Using NASA API Key
        console.log("API Key: ", apiKey);  // Check if the API key is correctly loaded
        const response = await axios.get(
          `https://api.nasa.gov/DONKI/CME?startDate=2023-01-01&endDate=2024-09-01&api_key=${apiKey}`
        );
        console.log(response.data);  // Log the data to check if it’s fetched correctly
        setSpaceWeatherData(response.data);  // Set the fetched data
        setLoading(false);
      } catch (err) {
        console.error(err);  // Log any errors
        setError("Failed to fetch space weather data.");
        setLoading(false);
      }
    };

    fetchSpaceWeather();  // Call the function to fetch space weather data
  }, []);  // Only run this effect once on component mount

  // Handle loading and errors
  if (loading) {
    return <p>Loading space weather data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Display fetched space weather data
  return (
    <div>
      <h2>Space Weather Updates</h2>
      {spaceWeatherData.length > 0 ? (
        <ul>
          {spaceWeatherData.map((event, index) => (
            <li key={index}>
              <p><strong>Event Type:</strong> {event.activityID}</p>
              <p><strong>Date:</strong> {event.startTime}</p>
              <p><strong>Source Location:</strong> {event.sourceLocation || 'Unknown'}</p>
              <p><strong>Note:</strong> {event.note || 'No additional info'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No space weather events available at this time.</p>
      )}
    </div>
  );
};

export default SpaceWeather;
