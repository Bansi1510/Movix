import { AuthResponse, LoginPayload, LoginResponse, SignUpPayload } from "@/types/auth.types";
import api from "./baseUrl";


export const getProfile = async () => {
  const { data } = await api.get("/api/user/profile");

  return data.data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post("/api/user/login", payload);
  console.log(data)
  return data;
};

export const registerUser = async (
  payload: SignUpPayload
): Promise<AuthResponse> => {
  const { data } = await api.post(
    "/api/user/register",
    payload
  );

  return data;
};