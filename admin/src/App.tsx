import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/auth/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;