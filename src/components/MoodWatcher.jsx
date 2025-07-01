import { Laugh } from "lucide-react";
import React, { useEffect, useState } from "react";

const MoodWatcher = () => {
  const [latestMoods, setLatestMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mood/latest");
        const data = await res.json();
        setLatestMoods(data.mood); // this is an array of last 5 moods
      } catch (err) {
        console.error("Failed to fetch moods:", err);
      }
    };

    fetchMoods();
    const interval = setInterval(fetchMoods, 3000); // update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 bg-white rounded-md shadow-lg">
      <div className="flex items-center mb-2 gap-2">
        <Laugh size={30} color="#e2b9e3" />
        <h1 className="text-2xl my-0 font-bold">View Her Moods</h1>
      </div>

      <h2 className="text-lg font-semibold mb-2">Last 5 Mood Updates:</h2>

      <ul className="space-y-3">
        {latestMoods.map((m, idx) => (
          <li
            key={idx}
            className="border rounded-md p-3 shadow-sm flex justify-between items-center"
          >
            <span className="text-4xl">{m.mood}</span>
            <div className="text-sm text-gray-500 text-right">
              <p>{new Date(m.timeStamp).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodWatcher;
