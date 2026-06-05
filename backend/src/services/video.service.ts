import fs from "fs";
import cloudinary from "../config/cloudinary.config";
import { prisma } from "../config/db.config";
import { analyzeUserBehavior, getEmbedding } from "./ai.service";
import { cosineSimilarity } from "../utils/math";
import { optimizeSEO } from "./ai.service";


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
  const aiText = `
title: ${title}
description: ${description}
genre: ${genre}
tags: ${tags ? JSON.parse(tags).join(" ") : ""}
language: ${language || ""}
`;
  const embedding = await getEmbedding(aiText);

  // delete local files
  deleteLocalFiles(files);

  const seo = await optimizeSEO({
    title,
    description,
    tags: JSON.parse(tags),
  });
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
      embedding,
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

      videoPublicId: true,
      videoUrl: true,

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
// LIKE VIDEO Dislike 
// =========================

export const findExistingLikeService = async (
  userId: string,
  videoId: string
) => {
  return await prisma.like.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });
};
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




export const getPersonalizedFeed = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likes: true,
      comments: true,
    },
  });
  const insight = await prisma.userInsight.findUnique({
    where: {
      userId,
    },
  });
  const videos = await prisma.video.findMany({
    where: { isPublished: true },
    include: {
      likes: true,
      comments: true,
    },
  });

  // fallback for cold start
  if (!user?.embedding) {
    return videos.slice(0, 20);
  }

  const scored = videos.map((video) => {
    const similarity =
      user.embedding && video.embedding
        ? cosineSimilarity(user.embedding, video.embedding)
        : 0;

    const engagement =
      video.views * 0.3 +
      video.likes.length * 2 +
      video.comments.length * 3;

    let interestBoost = 0;

    if (
      insight?.interests?.some(
        (interest) =>
          interest.toLowerCase() === video.genre.toLowerCase()
      )
    ) {
      interestBoost = 20;
    }

    const score =
      similarity * 80 +
      engagement * 0.2 +
      interestBoost;

    return { ...video, score };
  });


};


export const smartSearchVideos = async (text: string) => {
  // 1. Convert query → AI vector
  const queryEmbedding = await getEmbedding(text);

  // 2. Vector search (REAL AI)
  const videos = await prisma.$queryRaw`
   SELECT *,
1 - (embedding <=> ${queryEmbedding}::vector) as similarity
FROM "Video"
WHERE "isPublished" = true
AND embedding IS NOT NULL
ORDER BY similarity DESC
LIMIT 20;
  `;

  return videos;
};