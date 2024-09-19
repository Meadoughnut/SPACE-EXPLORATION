import React, { useState, useEffect } from 'react';

const Trivia = () => {
  // Array of space-related trivia facts
  const triviaFacts = [
    "Venus is the hottest planet in our solar system with an average temperature of 465°C.",
    "A day on Venus is longer than a year on Venus.",
    "Neutron stars can spin 600 times per second.",
    "There are more stars in the universe than grains of sand on Earth.",
    "Jupiter's Great Red Spot is a storm that has been raging for at least 350 years.",
    "A year on Mercury is just 88 Earth days.",
    "The Milky Way galaxy will collide with the Andromeda galaxy in about 4.5 billion years.",
    "There could be 100 million black holes in our galaxy.",
    "The Sun accounts for 99.86% of the mass in our solar system.",
    "Space is completely silent."
  ];

  const [currentFact, setCurrentFact] = useState('');  // Current trivia fact being displayed

  useEffect(() => {
    // Display a random trivia fact every time the component mounts
    setCurrentFact(triviaFacts[Math.floor(Math.random() * triviaFacts.length)]);
  }, []);

  // Optionally, you can set a timer to change the trivia fact every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(triviaFacts[Math.floor(Math.random() * triviaFacts.length)]);
    }, 10000);  // Change fact every 10 seconds

    return () => clearInterval(interval);  // Clear interval on component unmount
  }, [triviaFacts]);

  return (
    <div>
      <h2>Space Trivia</h2>
      <p>{currentFact}</p>
    </div>
  );
};

export default Trivia;
