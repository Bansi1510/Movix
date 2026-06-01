import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;