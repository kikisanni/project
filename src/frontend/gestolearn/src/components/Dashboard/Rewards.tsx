import axios from 'axios';
import React, { useState, useEffect } from 'react';
import treasureIcon from "../../assets/1355900.png";
import heartIcon from "../../assets/heart-img.png";
import gestoPointIcon from "../../assets/Star_icon_stylized.svg.png";

const Rewards: React.FC = () => {
  // Initialize results with 0
  const [results, setResults] = useState({ hearts: 0, totalPoints: 0, totalXP: 0 });
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/auth/login/success', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setCurrentUser(data.user?._id);
    })
    .catch(error => console.error('Error fetching current user:', error));
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/summary/results/${currentUser}`);
          setResults(response.data || { hearts: 0, totalPoints: 0, totalXP: 0 }); // Use default values if fetch fails // returns null
        } catch (error) {
          console.error('Error fetching results', error);
          setResults({ hearts: 0, totalPoints: 0, totalXP: 0 }); // Set default values in case of error
        }
      };

      fetchResults();
    }
  }, [currentUser]);

  return (
    <div className="shadow-lg bg-neutral-100 p-4 rounded-lg flex flex-col h-40 justify-center space-y-4">
      <div className="flex items-center justify-center">
        <img src={heartIcon} className="w-6 h-6 mr-2" alt="Heart Icon" />
        <p>Hearts Remaining: {results.hearts}</p> 
      </div>
      <div className="flex items-center justify-center">
        <img src={gestoPointIcon} className="w-6 h-6 mr-2" alt="Star Icon" />
        <p> Gesto Points Gained: {results.totalPoints}</p>
      </div>
      <div className="flex items-center justify-center">
        <img src={treasureIcon} className="w-6 h-6 mr-2" alt="Treasure Icon" />
        <p>Total XP Gained: {results.totalXP}</p>
      </div>
    </div>
  );
};

export default Rewards;
