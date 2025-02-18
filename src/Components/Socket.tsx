import { io } from "socket.io-client";

const SOCKET_URL = `${import.meta.env.VITE_SERVER}`;  // Replace with your backend URL

export const socket = io(SOCKET_URL, {
  withCredentials: true,  // Allows cookies (important for authentication)
  transports: ["websocket"], // Ensures a stable connection
});

export default socket;
