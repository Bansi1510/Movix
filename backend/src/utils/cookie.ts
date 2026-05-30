export const getTokenFromCookie = (cookie?: string) => {
  if (!cookie) return null;

  const token = cookie
    .split(";")
    .find(c => c.trim().startsWith("token="))
    ?.split("=")[1];

  return token || null;
};