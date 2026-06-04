export interface SingleVideo {
  id: string;
  title: string;
  description: string;

  thumbnail: string;
  bannerImage: string;

  genre: string;
  language: string;

  tags: string[];

  duration: number;

  type: "FREE" | "PREMIUM";

  price: number;

  views: number;

  createdAt: string;

  uploadedBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface VideosResponse {
  videos: SingleVideo[];

  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}