import { HeartPulse } from "lucide-react";
import Mood from "./Mood";
import data from "../data";
import { useState } from "react";
import { toast } from "react-toastify";
const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // getting the logged-in user
  const token = localStorage.getItem("token");
  async function sendMoodToBackend(e) {
    e.preventDefault(); // prevent page reload

    if (!selectedMood) {
      alert("Please select a mood before submitting");
      return;
    }

    try {
      const res = await fetch("https://cyclebuddy-backend.onrender.com/api/mood/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token in header
        },
        body: JSON.stringify({
          mood: selectedMood,
          senderName: user.name,
        }),
      });

      const data = await res.json();
      console.log(data.message);
      toast.success("Mood Updated successfully!");
      setSelectedMood(""); // reset selected mood after sending
    } catch (err) {
      console.error("Error sending mood:", err);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-100% h-auto py-8 px-2 bg-white md:mx-13 rounded-md shadow-sm">
      <div className="flex items-center mx-3">
        <HeartPulse size="30" color="#e2b9e3" />
        <h1 className="py-3 px-1 text-2xl font-bold">Mood Tracker</h1>
      </div>

      <form onSubmit={sendMoodToBackend}>
        <div className="grid md:grid-cols-4 lg:grid-cols-4 grid-cols-3 gap-3 px-4 py-2 w-100%">
          {data.moods.map((moodObj) => (
            <Mood
              key={moodObj.id}
              mood={moodObj.mood}
              isSelected={selectedMood === moodObj.mood}
              onClick={() => setSelectedMood(moodObj.mood)}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-400 hover:bg-pink-500 rounded-lg mt-4 py-2 text-xl font-semibold text-white"
        >
          Submit Mood
        </button>
      </form>
    </div>
  );
};

export default MoodTracker;
