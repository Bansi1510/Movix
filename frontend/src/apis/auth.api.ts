import { LoginPayload, LoginResponse } from "@/types/auth.types";
import api from "./baseUrl";


export const getProfile = async () => {
  const { data } = await api.get("/api/user/profile");

  return data.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);
  console.log(data)
  return data;
};