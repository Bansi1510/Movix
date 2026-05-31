import { Request, Response } from "express";
import { prisma } from "../config/db.config";
import response from "../utils/resHandler";

import {
  createVideoService,
  getAllVideosService,
  getVideoByIdService,
  deleteVideoService,
  likeVideoService,
  commentOnVideoService,
  incrementViewService,
  findExistingLikeService,
  getPersonalizedFeed,
  smartSearchVideos,
} from "../services/video.service";
import { adminNamespace, userNamespace } from "../sockets/socket.handler";
import { updateUserEmbedding } from "../services/userEmedding.service";

// =========================
// UPLOAD VIDEO
// =========================

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.id;

    if (!adminId) {
      return response(res, 401, "Unauthorized");
    }

    const files = req.files as any;

    if (!req.body.title || !req.body.description || !req.body.genre) {
      return response(res, 400, "All required fields missing");
    }

    if (!files?.video?.[0]) {
      return response(res, 400, "Video file required");
    }

    if (!files?.thumbnail?.[0]) {
      return response(res, 400, "Thumbnail required");
    }

    const newVideo = await createVideoService(req.body, files, adminId);

    adminNamespace.to(`video:${newVideo.id}`).emit("video_uploaded", newVideo);

    return response(res, 201, "Video uploaded successfully", newVideo);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

// =========================
// GET ALL VIDEOS
// =========================

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const data = await getAllVideosService(req.query);

    return response(res, 200, "Videos fetched successfully", data);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

// =========================
// GET VIDEO BY ID
// =========================

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const vId = videoId as string;
    const video = await getVideoByIdService(vId);

    if (!video) {
      return response(res, 404, "Video not found");
    }

    return response(res, 200, "", video);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

// =========================
// DELETE VIDEO
// =========================

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const vId = videoId as string;

    const video = getVideoByIdService(vId)

    if (!video) {
      return response(res, 404, "Video not found");
    }

    await deleteVideoService(video);

    return response(res, 200, "Video deleted successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

// =========================
// LIKE VIDEO
// =========================

export const likeVideo = async (req: Request, res: Response) => {
  try {

    const userId = req.user?.id;
    const { videoId } = req.params;
    const vId = videoId as string
    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    const existingLike = await findExistingLikeService(
      userId,
      vId
    );

    if (existingLike) {
      return response(res, 400, "Already liked");
    }

    const like = await likeVideoService(userId, vId);
    await updateUserEmbedding(userId);
    userNamespace.to(`video:${videoId}`).emit("video_liked", {
      videoId,
      userId,
    });

    return response(res, 200, "Video liked", like);

  } catch (error) {
    console.log(error);

    return response(res, 500, "Server error");
  }
};

// =========================
// COMMENT VIDEO
// =========================

export const commentOnVideo = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { videoId } = req.params;
    const { message } = req.body;
    const vId = videoId as string;

    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    if (!message) {
      return response(res, 400, "Comment required");
    }

    const comment = await commentOnVideoService(userId, vId, message);
    await updateUserEmbedding(userId);
    userNamespace.to(`video:${videoId}`).emit("new_comment", {
      videoId, comment
    })

    return response(res, 201, "Comment added", comment);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

// =========================
// INCREMENT VIEW
// =========================

export const incrementViewCount = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const vId = videoId as string;
    const userId = req.user.id as string;
    const updatedVideo = await incrementViewService(vId);
    await updateUserEmbedding(userId);
    userNamespace.to(`video:${videoId}`).emit("view_updated", {
      videoId,
      views: updatedVideo.views,
    });
    return response(res, 200, "View updated", {
      views: updatedVideo.views,
    });

  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const feedController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id as string;

    const videos = await getPersonalizedFeed(userId);

    res.json({
      success: true,
      data: videos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load feed",
    });
  }
};

export const searchController = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    const videos = await smartSearchVideos(q);

    res.json({
      success: true,
      data: videos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};