
import api from "./axios.api";


export const createVideoAPI = async (formData: FormData) => {
  const { data } = await api.post(
    "/api/video/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const getAllVideos = async (params: {
  page: number;
  search?: string;
  genre?: string;
  language?: string;
  type?: string;
}) => {
  const { data } = await api.get("/api/video", {
    params,
  });

  return data.data;
};

export const deleteVideo = async (
  videoId: string
) => {
  const { data } = await api.delete(
    `/api/video/${videoId}`
  );

  return data;
};