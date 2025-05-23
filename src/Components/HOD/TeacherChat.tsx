import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSendNotificationMutation } from "../../Redux/API/Hod";

const MiniChat = ({userId}:{userId:string}) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const [SendNotification] = useSendNotificationMutation();

  const sendMessage = async() => {
    if (!input.trim()) return;
    const response = await SendNotification({message:input , teacherId:userId});
    
    if(response && "data" in response && response.data?.success){
      setMessages([...messages, { text: input, sender: "me" }]);
    }else{
      console.log(response.error);
    }
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
      className=" bg-white  p-4 rounded-2xl shadow-lg w-80 h-full border border-blue-800"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="text-center font-bold text-lg text-[#ffc800]">Teacher Chat 💬</div>
      <div
        className="overflow-y-auto p-2 bg-[#C3EBFA] h-[80%] rounded-lg mt-2 shadow-inner"
        ref={chatRef}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: msg.sender === "me" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 my-1 rounded-xl w-fit max-w-[75%] break-words ${msg.sender === "me" ? "bg-blue-900 text-white ml-auto" : "bg-[#ffc800] text-black"
              }`}
          >
            {msg.text}
          </motion.div>
        ))}

      </div>
      <div className="flex items-center gap-2 mt-2 ">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ffc800]"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-[#ffc800] text-white rounded-full hover:bg-yellow-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" /></svg>
        </button>
      </div>
    </motion.div>
  );
};

export default MiniChat;