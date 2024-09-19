import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpaceNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
        console.log(response.data);  // Log the fetched data
        setNews(response.data);      // Set the fetched news data
        setLoading(false);           // Turn off loading
      } catch (err) {
        console.error(err);
        setError('Failed to fetch space news');
        setLoading(false);
      }
    };

    fetchNews();  // Call the API to fetch space news
  }, []);  // Empty dependency array to ensure it only runs once when the component mounts

  if (loading) {
    return <p>Loading space news...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Latest Space News</h2>
      {news.length > 0 ? (
        <ul>
          {news.map((article) => (
            <li key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3>{article.title}</h3>
              </a>
              <p>{article.summary}</p>
              <p><strong>Published on:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No space news available at the moment.</p>
      )}
    </div>
  );
};

export default SpaceNews;
