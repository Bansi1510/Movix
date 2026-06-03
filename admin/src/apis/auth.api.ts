import type { LoginPayload, LoginResponse } from "@/types/auth.types";
import api from "./axios.api";

export const loginApi = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post(
    "/api/admin/login",
    payload
  );

  return data;
};


export const checkAuthApi = async () => {
  const { data } = await api.get(
    "/api/admin/check-auth"
  );

  return data;
};

export const logoutApi = async () => {
  const { data } = await api.post(
    "/api/admin/logout"
  );

  return data;
};