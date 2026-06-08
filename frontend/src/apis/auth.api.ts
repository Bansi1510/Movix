import api from "./baseUrl";


export const getProfile = async () => {
  const { data } = await api.get("/api/user/profile");

  return data.data;
};