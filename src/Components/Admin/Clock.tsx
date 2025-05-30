import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setShowColon(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");

  return (
    <span className="text-blue-900 text-2xl font-mono font-semibold ">
      {hours}
      <span className={`${showColon ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        :
      </span>
      {minutes}
    </span>
  );
};

export default Clock;
