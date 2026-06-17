import { createBrowserRouter } from "react-router-dom";

import Login from "@/features/auth/Login";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Dashboard from "@/pages/Dashboard";
import SignUp from "@/features/auth/SignUp";
import WatchVideoPage from "@/pages/WatchVideoPage";
import PaymentPage from "@/pages/PaymentPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/watch/:videoId",
        element: <WatchVideoPage />
      },
      {
        path: "/payment/:videoId",
        element: <PaymentPage />
      }
    ],
  },
]);