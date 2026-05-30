import { Server } from "socket.io";
import http from "http";

let io: Server;


export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: [
        process.env.ADMIN_FRONTED!,
        process.env.USER_FRONTED!
      ],
      methods: ["GET", "POST"],
    },
  });

  console.log("🔌 Socket initialized");

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};