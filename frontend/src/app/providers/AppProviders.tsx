import React from "react";

import ReduxProvider from "./ReduxProvider";
import QueryProvider from "./QueryProvider";
import SocketProvider from "./SocketProvider";
import ThemeProvider from "./ThemeProvider";

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <SocketProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SocketProvider>
      </QueryProvider>
    </ReduxProvider>
  );
};

export default AppProviders;