import { prisma } from "../config/db.config";

// recompute user embedding based on interactions
export const updateUserEmbedding = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likes: { include: { video: true } },
      comments: { include: { video: true } },
    },
  });

  if (!user) return;

  const interactedVideos = [
    ...(user.likes.map(l => l.video) || []),
    ...(user.comments.map(c => c.video) || []),
  ];

  if (interactedVideos.length === 0) return;

  const validEmbeddings = interactedVideos
    .filter(v => v.embedding)
    .map(v => v.embedding as number[]);

  if (validEmbeddings.length === 0) return;

  // 🧠 average embedding (core AI learning)
  const dim = validEmbeddings[0].length;
  const avg = new Array(dim).fill(0);

  for (const emb of validEmbeddings) {
    for (let i = 0; i < dim; i++) {
      avg[i] += emb[i];
    }
  }

  for (let i = 0; i < dim; i++) {
    avg[i] /= validEmbeddings.length;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      embedding: avg,
    },
  });

  return avg;
};