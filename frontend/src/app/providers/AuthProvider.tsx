import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useProfile } from "@/hooks/useProfile";
import { loginSuccess, setInitialized } from "../slices/auth.slice";


interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const dispatch = useDispatch();

  const {
    data,
    isSuccess,
    isError,
  } = useProfile();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(loginSuccess(data.data.user));
      dispatch(setInitialized());
    }

    if (isError) {
      dispatch(setInitialized());
    }
  }, [isSuccess, isError, data, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;