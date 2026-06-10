import api from "./baseUrl";

export const getFeed = async () => {
  const { data } = await api.get("/videos/feed");
  return data.data;
};