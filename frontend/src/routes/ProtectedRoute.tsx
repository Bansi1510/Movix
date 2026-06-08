import { Navigate, Outlet } from "react-router-dom";

import { useProfile } from "@/hooks/useProfile";

const ProtectedRoute = () => {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;