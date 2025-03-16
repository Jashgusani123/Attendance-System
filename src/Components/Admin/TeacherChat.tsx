import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MiniChat = () => {
    const [messages, setMessages] = useState<{ text: string; sender: "me" | "other" }[]>([]);
    const [input, setInput] = useState("");
    const chatRef = useRef<HTMLDivElement>(null);
  
    const sendMessage = () => {
      if (!input.trim()) return;
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput("");
    };
  
    // Auto-scroll to the latest message
    useEffect(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, [messages]);
  
    return (
      <motion.div
        className="fixed bottom-6 right-6 bg-white p-4 rounded-2xl shadow-lg w-80 border border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center font-bold text-lg text-pink-500">Teacher Chat 💬</div>
        <div
          className="h-40 overflow-y-auto p-2 bg-blue-50 rounded-lg mt-2 shadow-inner"
          ref={chatRef}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.sender === "me" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2 my-1 rounded-xl max-w-[80%] ${
                msg.sender === "me" ? "bg-pink-400 text-white ml-auto" : "bg-purple-300 text-black"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            -
          </button>
        </div>
      </motion.div>
    );
  };

  export default MiniChat;