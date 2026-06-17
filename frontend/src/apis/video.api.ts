import api from "./baseUrl";

export const getFeed = async () => {
  const { data } = await api.get("/api/video/feed");
  console.log(data)
  return data.data;
};


export const getVideo = async (videoId: string) => {
  const { data } = await api.get(
    `/api/video/${videoId}`
  );

  return data.data;
};

export const likeVideo = async (videoId: string) => {
  const { data } = await api.post(
    `/api/video/${videoId}/like`
  );
  return data;
};

export const commentOnVideo = async ({
  videoId,
  message,
}: {
  videoId: string;
  message: string;
}) => {
  const { data } = await api.post(
    `/api/video/${videoId}/comment`,
    { message }
  );

  return data;
};

export const getVideoComments = async (
  videoId: string
) => {
  const { data } = await api.get(
    `/api/video/${videoId}/comments`
  );

  return data.data;
};

export const incrementView = async (
  videoId: string
) => {
  const { data } = await api.patch(
    `/api/video/${videoId}/view`
  );

  return data;
};