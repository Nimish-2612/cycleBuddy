const Mood = ({ mood, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hover:cursor-pointer px-2 py-8 shadow-md border text-4xl rounded-md ${
        isSelected ? "bg-pink-200 border-pink-400" : "border-gray-200"
      }`}
    >
      {mood}
    </button>
  );
};

export default Mood;
