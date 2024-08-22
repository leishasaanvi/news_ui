

import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [records, setRecords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/news')
      .then(response => response.json())
      .then(data => {
        setRecords(data.articles);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? records.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === records.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading news articles...</p>
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div className="error-container">
        <p>No articles available.</p>
      </div>
    );
  }

  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = records[currentIndex];

  return (
    <div className="container">
      <div className="content">
        <div className="intro-text">
          <p className="greeting">Hello, hope you are having a good day!</p>
          <p className="headline">Gen AI Summarized News for you today</p>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="source">
              <h4>{source?.name || 'Unknown Source'}</h4>
            </div>
            <div className="title-container">
              <h5 className="title">{title || 'No Title Available'}</h5>
              <p className="date">
                {new Date(publishedAt).toLocaleDateString() || 'No Date'}
              </p>
            </div>
            {urlToImage ? (
              <div className="image">
                <img src={urlToImage} alt={title} />
              </div>
            ) : (
              <div className="image-placeholder">
                <p>No Image Available</p>
              </div>
            )}
            <div className="summary">
              <p>{description || content || 'No Summary Available'}</p>
            </div>
            <div className="author">
              <p>{author ? `By ${author}` : 'Author Unknown'}</p>
            </div>
            <div className="read-more">
              <a href={url} target="_blank" rel="noopener noreferrer">
                Read Full Article
              </a>
            </div>
          </div>

          <button className="nav-button prev" onClick={handlePrev}>
            &larr; 
          </button>
          <button className="nav-button next" onClick={handleNext}>
             &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;


