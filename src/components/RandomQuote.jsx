import { MessageSquareQuote } from "lucide-react";
import data from "../data";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
const RandomQuote = () => {
  const messages = data.comfortingMessages;

  const [currentMessage, setCurrentMessage] = useState("");
  const [isCycling, setIsCycling] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [canSend, setCanSend] = useState(false);

  const intervalRef = useRef(null);

  // Random cycling effect
  useEffect(() => {
    if (isCycling) {
      intervalRef.current = setInterval(() => {
        const random = messages[Math.floor(Math.random() * messages.length)];
        setCurrentMessage(random.message);
      }, 2000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isCycling, messages]);

  // Enable Send button if something is selected or typed
  useEffect(() => {
    if (selectedMessage || customMessage.trim().length > 0) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [selectedMessage, customMessage]);

  function selectMessage() {
    setIsCycling(false);
    setSelectedMessage(currentMessage);
  }

  function sendMessage() {
    const messageToSend = customMessage.trim() || selectedMessage;
    if (messageToSend) {
      toast.success(`Message sent:\n\n"${messageToSend}"`);
    } else {
      toast.error("❗Please select or type a message before sending.");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 bg-white rounded-md shadow-lg">
      <div className="flex items-center mb-6 gap-2">
        <MessageSquareQuote size={30} color="#e2b9e3" />
        <h1 className="text-2xl font-bold">Send a Comforting Message</h1>
      </div>

      {/* Message Display Box */}
      <div className="bg-pink-200 text-pink-900 font-semibold text-xl px-4 py-6 rounded-md text-center mb-4 min-h-[80px] flex items-center justify-center">
        {selectedMessage || currentMessage || "Loading Comfort Messages..."}
      </div>

      {/* Select Button (disabled after selection) */}
      <button
        onClick={selectMessage}
        disabled={!!selectedMessage}
        className={`w-full rounded-md px-4 py-2 text-xl font-semibold text-white transition ${
          selectedMessage
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-500 hover:bg-pink-600"
        }`}
      >
        {selectedMessage ? "Message Selected" : "Select This Message"}
      </button>

      {/* Custom Input */}
      <div className="my-3.5">
        <p className="font-semibold text-lg mb-2">Or type a custom message...</p>
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows={4}
          placeholder="Write your own message..."
          className="bg-purple-100 w-full px-4 py-3 rounded-md text-lg border border-purple-300 resize-none"
        />
      </div>

      {/* Send Message */}
      <button
        onClick={sendMessage}
        disabled={!canSend}
        className={`w-full rounded-md px-4 py-2 text-xl font-bold transition  ${
          canSend
            ? "bg-pink-400 hover:bg-pink-500 text-white"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Send Message ❤️
      </button>
    </div>
  );
};

export default RandomQuote;
