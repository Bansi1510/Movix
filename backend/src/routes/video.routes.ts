import express from "express"
import { upload } from "../middlewares/multer.middleware";
import { uploadVideo } from "../controllers/video.controller";
import isAdmin from "../middlewares/isAdmin";

const videoRouter = express();

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


export default videoRouter;