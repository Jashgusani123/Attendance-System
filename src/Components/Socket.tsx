import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";  // Replace with your backend URL

export const socket = io(SOCKET_URL, {
  withCredentials: true,  // Allows cookies (important for authentication)
  transports: ["websocket"], // Ensures a stable connection
});

export default socket;
