import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/app/store";
import { useAppSelector } from "@/app/hooks";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state: RootState) => state.auth
  );

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;