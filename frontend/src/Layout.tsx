import { useEffect } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const theme = useSelector(
    (state: RootState) => state.settings.theme
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return <>{children}</>;
};

export default Layout;