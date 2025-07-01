import { Droplets } from "lucide-react";
const CycleTracker = () => {
  return (
    <div className="w-100% h-60 bg-white my-8 mx-8 md:mx-13  rounded-md shadow-sm">
      <div className="flex items-center mx-3">
        <Droplets size="30" color="#e2b9e3"/>
        <h1 className="py-3 px-1 text-2xl font-bold">Cycle Tracker</h1>
      </div>
    </div>
  );
};

export default CycleTracker;
