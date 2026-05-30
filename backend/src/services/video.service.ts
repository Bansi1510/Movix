import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { prisma } from "../config/db.config";

type VideoFiles = {
  video?: Express.Multer.File[];
  thumbnail?: Express.Multer.File[];
  bannerImage?: Express.Multer.File[];
  trailer?: Express.Multer.File[];
};

// =========================
// CREATE VIDEO
// =========================

export const createVideoService = async (
  body: any,
  files: VideoFiles,
  adminId: string,
) => {
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
  } = body;

  // upload video
  const videoUpload = await cloudinary.uploader.upload(files.video![0].path, {
    resource_type: "video",
    folder: "movix/videos",
  });

  // upload thumbnail
  const thumbnailUpload = await cloudinary.uploader.upload(
    files.thumbnail![0].path,
    {
      folder: "movix/thumbnails",
    },
  );

  // upload trailer
  let trailerUpload = null;

  if (files?.trailer?.[0]) {
    trailerUpload = await cloudinary.uploader.upload(files.trailer[0].path, {
      resource_type: "video",
      folder: "movix/trailers",
    });
  }

  // upload banner
  let bannerUpload = null;

  if (files?.bannerImage?.[0]) {
    bannerUpload = await cloudinary.uploader.upload(files.bannerImage[0].path, {
      folder: "movix/banners",
    });
  }

  // delete local files
  deleteLocalFiles(files);

  // save db
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

  return newVideo;
};

// =========================
// GET ALL VIDEOS
// =========================

export const getAllVideosService = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const search = query.search as string;
  const genre = query.genre as string;
  const type = query.type as string;

  const skip = (page - 1) * limit;

  const where: any = {
    isPublished: true,
  };

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (genre) {
    where.genre = genre;
  }

  if (type) {
    where.type = type;
  }

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

  const totalVideos = await prisma.video.count({
    where,
  });

  return {
    videos,

    pagination: {
      total: totalVideos,
      page,
      limit,
      totalPages: Math.ceil(totalVideos / limit),
    },
  };
};

// =========================
// GET VIDEO BY ID
// =========================

export const getVideoByIdService = async (videoId: string) => {
  return await prisma.video.findUnique({
    where: {
      id: videoId,
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
};

// =========================
// DELETE VIDEO
// =========================

export const deleteVideoService = async (video: any) => {
  await cloudinary.uploader.destroy(video.videoPublicId, {
    resource_type: "video",
  });

  await cloudinary.uploader.destroy(video.thumbnailPublicId);

  if (video.bannerPublicId) {
    await cloudinary.uploader.destroy(video.bannerPublicId);
  }

  if (video.trailerPublicId) {
    await cloudinary.uploader.destroy(video.trailerPublicId, {
      resource_type: "video",
    });
  }

  await prisma.video.delete({
    where: {
      id: video.id,
    },
  });
};

// =========================
// LIKE VIDEO
// =========================

export const likeVideoService = async (userId: string, videoId: string) => {
  return await prisma.like.create({
    data: {
      userId,
      videoId,
    },
  });
};

// =========================
// COMMENT VIDEO
// =========================

export const commentOnVideoService = async (
  userId: string,
  videoId: string,
  message: string,
) => {
  return await prisma.comment.create({
    data: {
      message,
      userId,
      videoId,
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
};

// =========================
// INCREMENT VIEW
// =========================

export const incrementViewService = async (videoId: string) => {
  return await prisma.video.update({
    where: {
      id: videoId,
    },

    data: {
      views: {
        increment: 1,
      },
    },
  });
};

// =========================
// DELETE LOCAL FILES
// =========================

const deleteLocalFiles = (files: VideoFiles) => {
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
};
