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