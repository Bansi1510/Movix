import api from "./baseUrl";

export const checkVideoAccessApi = async (videoId: string) => {
  const { data } = await api.get(
    `/api/payment/access/${videoId}`
  );

  return data;
};

export const createOrder = async (
  videoId: string
) => {
  const { data } = await api.post(
    "/api/payment/create-order",
    {
      videoId,
    }
  );

  return data.data;
};