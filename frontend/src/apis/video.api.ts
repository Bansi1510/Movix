import api from "./baseUrl";

export const getFeed = async () => {
  const { data } = await api.get("/api/video/feed");
  console.log(data)
  return data.data;
};