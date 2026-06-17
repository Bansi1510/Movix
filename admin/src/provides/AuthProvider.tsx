// providers/AuthProvider.tsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useCheckAuth } from "@/hooks/useCheckAuth";
import { logout, setCredentials } from "@/store/slices/auth.slice";

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();

  const { data, isSuccess, isError } = useCheckAuth(true);

  useEffect(() => {
    if (isSuccess && data?.data?.authenticated) {
      dispatch(setCredentials(data.data.admin));
    }

    if (isError) {
      dispatch(logout());
    }
  }, [data, isSuccess, isError, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;

