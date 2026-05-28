import { Request, Response } from "express";
import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { prisma } from "../config/db.config";
import response from "../utils/resHandler";

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      genre,
      language,
      tags,
      type,
      price,
      hasAds,
      downloadable,
      isPublished,
    } = req.body;

    const adminId = req.user.id;
    if (!adminId) {
      return response(res, 401, "Unauthorized");
    }
    // files
    const files = req.files as {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      bannerImage?: Express.Multer.File[];
      trailer?: Express.Multer.File[];
    };

    // validation
    if (!title || !description || !genre) {
      return response(res, 400, "All required fields missing");
    }

    if (!files?.video?.[0]) {
      return response(res, 400, "Video file required");
    }

    if (!files?.thumbnail?.[0]) {
      return response(res, 400, "Thumbnail required");
    }

    // =========================
    // upload video
    // =========================

    const videoUpload = await cloudinary.uploader.upload(
      files.video[0].path,
      {
        resource_type: "video",
        folder: "movix/videos",
      }
    );

    // =========================
    // upload thumbnail
    // =========================

    const thumbnailUpload = await cloudinary.uploader.upload(
      files.thumbnail[0].path,
      {
        folder: "movix/thumbnails",
      }
    );



    // =========================
    // upload trailer
    // =========================

    let trailerUpload = null;

    if (files?.trailer?.[0]) {
      trailerUpload = await cloudinary.uploader.upload(
        files.trailer[0].path,
        {
          resource_type: "video",
          folder: "movix/trailers",
        }
      );
    }
    let bannerUpload = null;

    if (files?.bannerImage?.[0]) {
      bannerUpload = await cloudinary.uploader.upload(
        files.bannerImage[0].path,
        {
          folder: "movix/banners",
        }
      );
    }

    // =========================
    // delete local files
    // =========================

    const allFiles = [
      files?.video?.[0],
      files?.thumbnail?.[0],
      files?.bannerImage?.[0],
      files?.trailer?.[0],
    ];

    allFiles.forEach((file) => {
      if (file?.path) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.log("File delete error:", err);
          }
        });
      }
    });


    // =========================
    // save in database
    // =========================

    const newVideo = await prisma.video.create({
      data: {
        title,
        description,

        thumbnail: thumbnailUpload.secure_url,
        thumbnailPublicId: thumbnailUpload.public_id,

        bannerImage: bannerUpload?.secure_url,
        bannerPublicId: bannerUpload?.public_id,

        videoUrl: videoUpload.secure_url,
        videoPublicId: videoUpload.public_id,

        trailerUrl: trailerUpload?.secure_url,
        trailerPublicId: trailerUpload?.public_id,

        genre,
        language,

        tags: tags ? JSON.parse(tags) : [],

        duration: Math.floor(videoUpload.duration),

        type: type || "FREE",

        price: price ? Number(price) : 0,

        hasAds: hasAds === "true",
        downloadable: downloadable === "true",

        isPublished: isPublished !== "false",

        uploadedById: adminId,
      },
    });

    return response(res, 201, "Video uploaded successfully", newVideo);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search as string;
    const genre = req.query.genre as string;
    const type = req.query.type as string;

    const skip = (page - 1) * limit;

    const where: any = {
      isPublished: true,
    };

    // search by title
    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    // filter by genre
    if (genre) {
      where.genre = genre;
    }

    // filter by type
    if (type) {
      where.type = type;
    }

    // get videos
    const videos = await prisma.video.findMany({
      where,

      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        title: true,
        description: true,

        thumbnail: true,
        bannerImage: true,

        genre: true,
        language: true,

        tags: true,

        duration: true,

        type: true,
        price: true,

        views: true,

        createdAt: true,

        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // total count
    const totalVideos = await prisma.video.count({
      where,
    });

    return response(res, 200, "Videos fetched successfully", {
      videos,

      pagination: {
        total: totalVideos,
        page,
        limit,
        totalPages: Math.ceil(totalVideos / limit),
      },
    });
  } catch (error) {
    console.log(error);

    return response(res, 500, "Server error");
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    const video = await prisma.video.findUnique({
      where: {
        id: videoId as string
      },
      select: {
        id: true,

        title: true,
        description: true,

        thumbnail: true,
        bannerImage: true,

        genre: true,
        language: true,

        tags: true,

        duration: true,

        type: true,
        price: true,

        views: true,

        createdAt: true,

        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      }
    });

    if (!video) return response(res, 402, "this video not found");

    return response(res, 200, "", video);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
}

export const updateVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const id = videoId as string
    const {
      title,
      description,
      genre,
      language,
      tags,
      type,
      price,
      hasAds,
      downloadable,
      isPublished,
    } = req.body;

    const adminId = req.user?.id;

    if (!adminId) {
      return response(res, 401, "Unauthorized");
    }

    const existingVideo = await prisma.video.findUnique({
      where: { id },
    });

    if (!existingVideo) {
      return response(res, 404, "Video not found");
    }

    const files = req.files as {
      video?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      bannerImage?: Express.Multer.File[];
      trailer?: Express.Multer.File[];
    };

    // =========================
    // VIDEO
    // =========================
    let videoUrl = existingVideo.videoUrl;
    let duration = existingVideo.duration;

    if (files?.video?.[0]) {
      await cloudinary.uploader.destroy(existingVideo.videoPublicId, {
        resource_type: "video",
      });

      const videoUpload = await cloudinary.uploader.upload(
        files.video[0].path,
        {
          resource_type: "video",
          folder: "movix/videos",
        }
      );

      videoUrl = videoUpload.secure_url;
      duration = Math.floor(videoUpload.duration);
    }

    // =========================
    // THUMBNAIL
    // =========================
    let thumbnail = existingVideo.thumbnail;

    if (files?.thumbnail?.[0]) {
      await cloudinary.uploader.destroy(existingVideo.thumbnailPublicId);

      const thumbnailUpload = await cloudinary.uploader.upload(
        files.thumbnail[0].path,
        {
          folder: "movix/thumbnails",
        }
      );

      thumbnail = thumbnailUpload.secure_url;
    }

    // =========================
    // BANNER
    // =========================
    let bannerImage = existingVideo.bannerImage;

    if (files?.bannerImage?.[0]) {
      if (existingVideo.bannerPublicId) {
        await cloudinary.uploader.destroy(existingVideo.bannerPublicId);
      }

      const bannerUpload = await cloudinary.uploader.upload(
        files.bannerImage[0].path,
        {
          folder: "movix/banners",
        }
      );

      bannerImage = bannerUpload.secure_url;
    }

    // =========================
    // TRAILER
    // =========================
    let trailerUrl = existingVideo.trailerUrl;

    if (files?.trailer?.[0]) {
      if (existingVideo.trailerPublicId) {
        await cloudinary.uploader.destroy(existingVideo.trailerPublicId, {
          resource_type: "video",
        });
      }

      const trailerUpload = await cloudinary.uploader.upload(
        files.trailer[0].path,
        {
          resource_type: "video",
          folder: "movix/trailers",
        }
      );

      trailerUrl = trailerUpload.secure_url;
    }

    // =========================
    // CLEAN LOCAL FILES
    // =========================
    const allFiles = [
      files?.video?.[0],
      files?.thumbnail?.[0],
      files?.bannerImage?.[0],
      files?.trailer?.[0],
    ];

    allFiles.forEach((file) => {
      if (file?.path) {
        fs.unlink(file.path, (err) => {
          if (err) console.log("File delete error:", err);
        });
      }
    });

    // =========================
    // UPDATE DATABASE
    // =========================
    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        title: title ?? existingVideo.title,
        description: description ?? existingVideo.description,
        genre: genre ?? existingVideo.genre,
        language: language ?? existingVideo.language,

        tags: tags ? JSON.parse(tags) : existingVideo.tags,

        type: type ?? existingVideo.type,
        price: price !== undefined ? Number(price) : existingVideo.price,

        hasAds:
          hasAds !== undefined
            ? hasAds === "true" || hasAds === true
            : existingVideo.hasAds,

        downloadable:
          downloadable !== undefined
            ? downloadable === "true" || downloadable === true
            : existingVideo.downloadable,

        isPublished:
          isPublished !== undefined
            ? isPublished === "true" || isPublished === true
            : existingVideo.isPublished,

        videoUrl,
        thumbnail,
        bannerImage,
        trailerUrl,
        duration,
      },
    });

    return response(res, 200, "Video updated successfully", updatedVideo);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const id = videoId as string;
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return response(res, 404, "Video not found");
    }

    // =========================
    // DELETE FROM CLOUDINARY
    // =========================

    // video
    await cloudinary.uploader.destroy(video.videoPublicId, {
      resource_type: "video",
    });

    // thumbnail
    await cloudinary.uploader.destroy(video.thumbnailPublicId);

    // banner (optional)
    if (video.bannerPublicId) {
      await cloudinary.uploader.destroy(video.bannerPublicId);
    }

    // trailer (optional)
    if (video.trailerPublicId) {
      await cloudinary.uploader.destroy(video.trailerPublicId, {
        resource_type: "video",
      });
    }

    // =========================
    // DELETE FROM DATABASE
    // =========================

    await prisma.video.delete({
      where: { id },
    });

    return response(res, 200, "Video deleted successfully");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const likeVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const userId = req.user?.id;
    const id = videoId as string
    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return response(res, 404, "Video not found");
    }

    // check already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId: id,
        },
      },
    });

    if (existingLike) {
      return response(res, 400, "Already liked");
    }

    await prisma.like.create({
      data: {
        userId,
        videoId: id,
      },
    });

    return response(res, 200, "Video liked");
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const commentOnVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { message } = req.body;
    const userId = req.user?.id;
    const id = videoId as string
    if (!userId) {
      return response(res, 401, "Unauthorized");
    }

    if (!message) {
      return response(res, 400, "Comment required");
    }

    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return response(res, 404, "Video not found");
    }

    const comment = await prisma.comment.create({
      data: {
        message,
        userId,
        videoId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return response(res, 201, "Comment added", comment);
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};

export const incrementViewCount = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const id = videoId as string
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      return response(res, 404, "Video not found");
    }

    const updatedVideo = await prisma.video.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return response(res, 200, "View updated", {
      views: updatedVideo.views,
    });
  } catch (error) {
    console.log(error);
    return response(res, 500, "Server error");
  }
};