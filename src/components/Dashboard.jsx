import React, { useEffect } from "react";
import CycleTracker from "./CycleTracker";
import MoodTracker from "./MoodTracker";
import RandomQuote from "./RandomQuote";
import MoodWatcher from "./MoodWatcher";
const Dashboard = () => {
  const authToken = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isBoyfriend = user.isBoyfriend;
  console.log(isBoyfriend);
  // console.log("AuthToken:",authToken);
  return (
    <>
      <main>
        <CycleTracker />
        <div className=" grid lg:grid-cols-2 gap-6 my-8">
          {isBoyfriend ? (
            <>
              <RandomQuote />
              <MoodWatcher />
            </>
          ) : (
            <>
              <MoodTracker />
              {/* Add something else here if you want it to occupy the second column */}
              <div></div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
