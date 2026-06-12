export interface Video {
  id: string;

  title: string;
  description: string;

  thumbnail: string;
  bannerImage: string | null;

  videoUrl: string;

  genre: string;
  language: string | null;

  tags: string[];

  duration: number;

  type: "FREE" | "PREMIUM";
  price: number;

  views: number;

  downloadable: boolean;
  hasAds: boolean;

  createdAt: string;

  likes: unknown[];
  comments: unknown[];
}