import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// =========================
// EMBEDDING MODEL
// =========================
export const getEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
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

Return ONLY JSON:

{
  "interests": [],
  "adCategory": "",
  "contentType": "",
  "confidence": 0
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content || "{}");
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
Improve SEO for video platform:

Title: ${video.title}
Description: ${video.description}
Tags: ${video.tags.join(", ")}

Return ONLY JSON:
{
  "seoTitle": "",
  "seoTags": [],
  "category": ""
}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(res.choices[0].message.content || "{}");
};