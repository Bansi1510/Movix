export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  genre: string;
  tags: string[];
  duration: number;
  views: number;
  type: "FREE" | "PREMIUM";
  price: number;
}