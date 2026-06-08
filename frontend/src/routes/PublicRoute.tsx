import { Navigate, Outlet } from "react-router-dom";

import { useProfile } from "@/hooks/useProfile";

const PublicRoute = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;