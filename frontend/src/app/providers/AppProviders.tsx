import React from "react";

import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import SocketProvider from "./SocketProvider";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppProviders;