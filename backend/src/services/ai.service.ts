import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// =========================
// HELPER
// =========================
const parseAIJson = (text: string) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return {};
  }
};

// =========================
// EMBEDDING MODEL
// =========================
export const getEmbedding = async (
  text: string
): Promise<number[]> => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings?.[0]?.values ?? [];
};

// =========================
// USER BEHAVIOR ANALYSIS
// =========================
export const analyzeUserBehavior = async (data: {
  likes: number;
  comments: number;
  watchTime?: number;
  topGenres?: string[];
}) => {
  const prompt = `
Analyze this user.

Likes: ${data.likes}
Comments: ${data.comments}
Watch Time: ${data.watchTime || 0}
Top Genres: ${data.topGenres?.join(", ") || "unknown"}

Return ONLY valid JSON:

{
  "interests": [],
  "adCategory": "",
  "contentType": "",
  "confidence": 0
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return parseAIJson(response.text || "{}");
};

// =========================
// SEO OPTIMIZER
// =========================
export const optimizeSEO = async (video: {
  title: string;
  description: string;
  tags: string[];
}) => {
  const prompt = `
Improve SEO for a video streaming platform.

Title: ${video.title}

Description:
${video.description}

Tags:
${video.tags.join(", ")}

Return ONLY valid JSON:

{
  "seoTitle": "",
  "seoTags": [],
  "category": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return parseAIJson(response.text || "{}");
};