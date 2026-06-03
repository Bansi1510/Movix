import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.settings.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
};

export default Layout;