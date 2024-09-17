import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APOD = () => {
  const [apodData, setApodData] = useState(null); // State to store the APOD data
  const [loading, setLoading] = useState(true);   // State to handle loading
  const [error, setError] = useState(null);       // State to handle errors

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const apiKey = process.env.REACT_APP_NASA_API_KEY;  // Access the API key from the .env file
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        setApodData(response.data);  // Set the fetched data in state
        setLoading(false);           // Turn off loading
      } catch (err) {
        setError("Failed to fetch the Astronomy Picture of the Day.");
        setLoading(false);           // Turn off loading even on error
      }
    };

    fetchAPOD();  // Call the API fetch function
  }, []);  // Empty dependency array to run effect once on mount

  // Conditional Rendering
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="apod-container">
      <h2>{apodData.title}</h2>
      <p>{apodData.date}</p>
      {apodData.media_type === 'image' ? (
        <img
          src={apodData.url}
          alt={apodData.title}
          style={{ width: '100%', borderRadius: '10px' }}
        />
      ) : (
        <iframe
          src={apodData.url}
          title={apodData.title}
          width="100%"
          height="400px"
        //   frameBorder="0"
          allow="encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      <p style={{ marginTop: '10px' }}>{apodData.explanation}</p>
    </div>
  );
};

export default APOD;
