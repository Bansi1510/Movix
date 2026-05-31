import { Server } from "socket.io";
import { getTokenFromCookie } from "../utils/cookie";
import { verifyToken } from "../utils/jwt";

export let userNamespace: ReturnType<Server["of"]>;
export let adminNamespace: ReturnType<Server["of"]>;

export const registerSocketEvents = (io: Server) => {

  // USER NAMESPACE
  userNamespace = io.of("/user");

  // 🔐 AUTH MIDDLEWARE (ADD HERE)
  userNamespace.use((socket, next) => {
    try {

      const cookie = socket.request.headers.cookie;

      const token = getTokenFromCookie(cookie);

      if (!token) return next(new Error("No token"));

      const decoded = verifyToken(token);

      socket.user = decoded; // 👈 store user here

      next();

    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  userNamespace.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // 👤 USER ROOM (NOW FROM JWT, NOT FRONTEND)
    const userId = socket.user?.id;

    socket.join(`user:${userId}`);
    console.log(`Joined user room: user:${userId}`);

    // 🎥 VIDEO ROOM
    socket.on("join_video", (videoId: string) => {
      socket.join(`video:${videoId}`);
      console.log(`Joined video room: video:${videoId}`);
    });

    socket.on("leave_video", (videoId: string) => {
      socket.leave(`video:${videoId}`);
      console.log(`Left video room: video:${videoId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });

  // ADMIN NAMESPACE
  adminNamespace = io.of("/admin");

  adminNamespace.on("connection", (socket) => {

    console.log("Admin connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Admin disconnected");
    });

  });
};