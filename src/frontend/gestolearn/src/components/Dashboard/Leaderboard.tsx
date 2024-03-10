import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultImage from "../../assets/Default_pfp.png";
import { Results } from "./types";

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Results[]>([]);

  function handleImageError(e: { currentTarget: { src: string } }) {
    if (defaultImage) {
      e.currentTarget.src = defaultImage;
    } else {
      console.error("Default image is not set or invalid");
    }
  }
  useEffect(() => {
    const getLeaders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/dashboard/leaderboard"
        );
        setLeaders(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    getLeaders();
  }, []);
  return (
      <div className="text-base shadow-lg bg-neutral-100 rounded-lg p-8 max-w-md w-full mx-auto min-h-[340px]">
        <div className="flex flex-col">
          <div className="pb-4">
            <h3 className="text-xl font-bold text-gray-900 text-center">
              Leaderboard
            </h3>
          </div>
          <ul className="space-y-14">
            {leaders.map((leader, index, array) => {
              // Give the same rank to users with the same XP.
              let rank = index + 1;
              if (index > 0 && leader.totalXP === array[index - 1].totalXP) {
                rank = array[index - 1].rank; // use the rank of the previous user
              }

              // Store the rank in the current leader object for future reference
              leader.rank = rank;

              return (
                <li
                  key={leader.userId._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={leader.userId.profilePicture || defaultImage}
                      alt="Profile"
                      onError={handleImageError}
                      className="flex-shrink-0 rounded-full h-8 w-8 object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {leader.userId.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        Score: {leader.totalXP} XP
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">
                      #{rank}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
  );
};
export default Leaderboard;
