import { z } from "zod";

export const videoSchema = z.object({
  title: z.string(),
  description: z.string(),
  genre: z.string(),
  language: z.string(),
  tags: z.string(),
  type: z.enum(["FREE", "PREMIUM"]),
  price: z.string().regex(/^\d*$/, "Only numbers allowed"),
  hasAds: z.boolean(),
  downloadable: z.boolean(),
  isPublished: z.boolean(),
});

export type VideoFormValues = z.infer<typeof videoSchema>;