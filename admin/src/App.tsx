import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Videos from "./pages/Videos";
import AddVideo from "./pages/AddVideo";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import NotFound from "./components/layout/NotFound";
import AuthProvider from "./provides/AuthProvider";


const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { index: true, element: <Videos /> },
          {
            path: "videos",
            element: <Videos />
          },
          {
            path: "add-video",
            element: <AddVideo />
          }
        ]
      }
    ]
  },




  {
    path: "*",
    element: <NotFound />,
  },


]);

const App: React.FC = () => {

  return
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>

};

export default App;