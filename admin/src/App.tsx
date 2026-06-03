import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Videos from "./pages/Videos";
import AddVideo from "./pages/AddVideo";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
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
]);

const App: React.FC = () => {

  return <RouterProvider router={router} />;
};

export default App;