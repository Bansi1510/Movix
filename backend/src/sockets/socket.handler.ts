import { Server } from "socket.io";

export let userNamespace: ReturnType<Server["of"]>;
export let adminNamespace: ReturnType<Server["of"]>;

export const registerSocketEvents = (io: Server) => {

  // USER NAMESPACE
  userNamespace = io.of("/user");

  userNamespace.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // JOIN ROOM
    socket.on("join_video", (videoId: string) => {

      socket.join(videoId);

      console.log(`Socket joined room: ${videoId}`);

    });

    // LEAVE ROOM
    socket.on("leave_video", (videoId: string) => {

      socket.leave(videoId);

      console.log(`Socket left room: ${videoId}`);

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