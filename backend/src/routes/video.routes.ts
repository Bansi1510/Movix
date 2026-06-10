import express from "express"
import { upload } from "../middlewares/multer.middleware";
import { commentOnVideo, deleteVideo, feedController, getAllVideos, getVideoById, incrementViewCount, likeVideo, uploadVideo } from "../controllers/video.controller";
import isAdmin from "../middlewares/isAdmin";
import isLoggedInUser from "../middlewares/isLoggedInUser";

const videoRouter = express.Router();

videoRouter.post(
  "/upload",
  isAdmin,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
  ]),
  uploadVideo
);


videoRouter.get("/", getAllVideos);
videoRouter.get("/feed", isLoggedInUser, feedController)

videoRouter.get("/:videoId", getVideoById);

// videoRouter.put(
//   "/:videoId",
//   isAdmin,
//   upload.fields([
//     { name: "video", maxCount: 1 },
//     { name: "thumbnail", maxCount: 1 },
//     { name: "bannerImage", maxCount: 1 },
//     { name: "trailer", maxCount: 1 },
//   ]),
//   updateVideo
// );


videoRouter.delete("/:videoId", isAdmin, deleteVideo);
videoRouter.post("/:videoId/view", isLoggedInUser, incrementViewCount);
videoRouter.post("/:videoId/like", isLoggedInUser, likeVideo);
videoRouter.post("/:videoId/comment", isLoggedInUser, commentOnVideo);


export default videoRouter;