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
    // upload banner
    // =========================

    let bannerUrl: string | null = null;

    if (files?.bannerImage?.[0]) {
      const bannerUpload = await cloudinary.uploader.upload(
        files.bannerImage[0].path,
        {
          folder: "movix/banners",
        }
      );

      bannerUrl = bannerUpload.secure_url;
    }

    // =========================
    // upload trailer
    // =========================

    let trailerUrl: string | null = null;

    if (files?.trailer?.[0]) {
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
        bannerImage: bannerUrl,

        videoUrl: videoUpload.secure_url,
        trailerUrl,

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