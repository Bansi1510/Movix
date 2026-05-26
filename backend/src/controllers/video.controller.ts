import { Request, Response } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import response from "../utils/resHandler";

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return response(res, 400, "No video file uploaded");
    }

    const filePath = file.path;

    // 1. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "videos",
    });

    // 2. Delete local file after upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("File delete error:", err);
      }
    });

    // 3. Return success response
    return response(res, 200, "Video uploaded successfully", {
      url: result.secure_url,
      public_id: result.public_id,
      duration: result.duration,
      format: result.format,
    });

  } catch (error) {
    console.log(error);
    return response(res, 502, "server error");
  }
};